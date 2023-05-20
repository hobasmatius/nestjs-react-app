import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { TransformInterceptor } from 'src/transform.interceptor';
import { LoginDto } from 'src/dto/login.dto';
import { TypeOrmExceptionFilter } from 'src/exception/typeorm.exception';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { CreateUserDto } from 'src/dto/createuser.dto';

@Controller('api/v1/users')
@UseFilters(TypeOrmExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseInterceptors(TransformInterceptor)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':email')
    @UseInterceptors(TransformInterceptor)
    findUserByEmail(
        @Param('email') email: string
    ) {
        return this.userService.findByEmail(email);
    }

    @Post('login')
    @UseInterceptors(TransformInterceptor)
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.userService.findLoginUser(loginDto);
    }

    @Post('create')
    @UseInterceptors(TransformInterceptor)
    create(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.create(createUserDto);
    }

    @Patch('update')
    @UseInterceptors(TransformInterceptor)
    update(
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.userService.update(updateUserDto);
    }

    @Post('send-verification-email')
    sendVerificationEmail(
        @Query('ext-user-id') userId: string
    ) {
        this.userService.sendVerificationEmail(userId);
    }
}