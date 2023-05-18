import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { TransformInterceptor } from 'src/transform.interceptor';
import { LoginDto } from 'src/dto/login.dto';
import { LoginException } from 'src/exception/login.exception';
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
    async findUserByEmail(
        @Param('email') email: string
    ) {
        const user = await this.userService.findUserByEmail(email);
        if (user) {
            return user;
        } else {
            return { message: 'User not found' };
        }
    }

    @Post('login')
    @UseInterceptors(TransformInterceptor)
    async login(
        @Body() loginDto: LoginDto
    ) {
        const user = await this.userService.findLoginUser(loginDto);
        if (user) {
            return user;
        } else {
            throw new LoginException;
        }
    }

    @Put('create')
    @UseInterceptors(TransformInterceptor)
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        const user = await this.userService.create(createUserDto);
        if (user) {
            return user;
        } else {
            return { message: 'User already registered' };
        }
    }

    @Patch('update')
    @UseInterceptors(TransformInterceptor)
    async update(
        @Body() updateUserDto: UpdateUserDto
    ) {
        const updatedUser = await this.userService.update(updateUserDto);
        if (updatedUser) {
            return updatedUser;
        } else {
            return { message: 'User not found' };
        }
    }

    @Post('send-verification-email')
    sendVerificationEmail(
        @Query('ext-user-id') userId: string
    ) {
        this.userService.sendVerificationEmail(userId);
    }
}