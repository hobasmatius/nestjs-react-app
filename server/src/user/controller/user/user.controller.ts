import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { TransformInterceptor } from 'src/transform.interceptor';
import { TypeOrmExceptionFilter } from 'src/exception/typeorm.exception';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { LoginDto } from 'src/dto/login.dto';

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
    handlePostLogin(
        @Body() loginDto: LoginDto
    ) {
        this.userService.captureSuccessfulLoginActivity(loginDto.email);
    }

    @Post('create')
    @UseInterceptors(TransformInterceptor)
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        return await this.userService.create(createUserDto);
    }

    @Patch('update')
    @UseInterceptors(TransformInterceptor)
    async update(
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.update(updateUserDto);
    }

    @Post('send-verification-email')
    sendVerificationEmail(
        @Query('ext-user-id') userId: string
    ) {
        this.userService.sendVerificationEmail(userId);
    }
}