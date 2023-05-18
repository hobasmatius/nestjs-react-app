import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

class Auth0AccessToken {
    access_token: string;
    token_type: string;
    expire_at: number;
}

var activeToken: Auth0AccessToken | null = null;
const TOKEN_LIFETIME_IN_HOURS = 23;

@Injectable()
export class Auth0Service {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    getAccessToken(): Promise<Auth0AccessToken> {
        if (activeToken && activeToken.expire_at > new Date().getTime()) {
            return Promise.resolve(activeToken);
        }

        const auth0BaseUrl = this.configService.get('AUTH0_BASE_URL');
        const requestHeaders = {
            'content-type': 'application/json'
        }
        const requestBody = {
            'client_id': this.configService.get('AUTH0_M2M_CLIENT_ID'),
            'client_secret': this.configService.get('AUTH0_M2M_CLIENT_SECRET'),
            'audience': auth0BaseUrl + "/api/v2/",
            'grant_type': 'client_credentials'
        }
        const url = auth0BaseUrl + "/oauth/token";

        return firstValueFrom(
            this.httpService.post(url, requestBody, { headers: requestHeaders }).pipe(map((response) => {
                const now = new Date();

                response.data.expire_at = now.setHours(now.getHours() + TOKEN_LIFETIME_IN_HOURS);
                
                activeToken = response.data;
                return response.data;
            }))
        );
    }

    sendVerificationEmail(userId: string) {
        this.getAccessToken().then((accessToken) => {
            const requestHeaders = {
                'content-type': 'application/json',
                'Authorization': `${accessToken.token_type} ${accessToken.access_token}`
            }
            const url = this.configService.get('AUTH0_BASE_URL') + "/api/v2/jobs/verification-email";
            
            firstValueFrom(
                this.httpService.post(url, { user_id: userId }, { headers: requestHeaders }).pipe(map((response) => response))
            ).then((response) => {
                Logger.debug('sendVerificationEmail > user: ' + userId + ' > response ' + response.status + ': ' + response.statusText);
            }).catch((err) => {
                Logger.error('Error on sendVerificationEmail > user: ' + userId + ' > response ' + err);
            });
        }).catch((err) => {
            Logger.error('Error on getting access token > response ' + err);
        });
    }
}
