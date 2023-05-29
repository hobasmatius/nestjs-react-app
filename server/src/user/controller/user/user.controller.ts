import { Body, Controller, Get, Param, Put, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { TransformInterceptor } from 'src/transform.interceptor';
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

    @Put(':email/session')
    @UseInterceptors(TransformInterceptor)
    updateSession(
        @Param('email') email: string
    ) {
        this.userService.updateSession(email);
    }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        return await this.userService.create(createUserDto);
    }

    @Put(':email')
    @UseInterceptors(TransformInterceptor)
    async update(
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.update(email, updateUserDto);
    }

    @Post('send-verification-email')
    sendVerificationEmail(
        @Query('ext-user-id') userId: string
    ) {
        this.userService.sendVerificationEmail(userId);
    }
}