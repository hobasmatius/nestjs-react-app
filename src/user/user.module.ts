import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Auth0Service } from 'src/thirdparty/service/auth0/auth0.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [UserController],
  providers: [UserService, Auth0Service]
})
export class UserModule {}
