import { HttpException, HttpStatus } from "@nestjs/common";

export class LoginException extends HttpException {
    constructor() {
        super('Wrong email or password', HttpStatus.FORBIDDEN);
    }
}