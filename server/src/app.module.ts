import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth0Service } from './thirdparty/service/auth0/auth0.service';
import entities from './entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: entities,
      synchronize: true,
    }),
    UserModule,
    HttpModule
  ],
  controllers: [],
  providers: [Auth0Service],
})
export class AppModule {}
