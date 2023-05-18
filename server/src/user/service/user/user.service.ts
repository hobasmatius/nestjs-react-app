import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { Auth0Service } from 'src/thirdparty/service/auth0/auth0.service';
import { convertDateToUTC } from 'src/util/util';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly auth0Service: Auth0Service
    ) {}

    findAll() {
        return plainToClass(UserDto, this.userRepository.find());
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email: email });
        return plainToClass(UserDto, user);
    }

    async findLoginUser(loginDto: LoginDto) {
        const user = await this.userRepository.findOneBy({ email: loginDto.email });
        const isValid = user && user.password == loginDto.password;
        
        if (isValid) {
            user.loginCount += 1;
            user.lastSessionAt = convertDateToUTC(new Date());
            this.userRepository.save(user);
        }

        return isValid ? plainToClass(UserDto, user) : null;
    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.findUserByEmail(createUserDto.email);

        if (user) {
            return null;
        } else {
            const newUser = this.userRepository.create(createUserDto);
            return plainToClass(UserDto, this.userRepository.save(newUser));
        }
    }

    async update(updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ email: updateUserDto.email });
        if (user) {
            if (updateUserDto.name) {
                user.name = updateUserDto.name;
            }
            if (updateUserDto.isEmailVerified) {
                user.isEmailVerified = updateUserDto.isEmailVerified;
            }

            return plainToClass(UserDto, this.userRepository.save(user));
        }

        return null;
    }

    sendVerificationEmail(userId: string) {
        this.auth0Service.sendVerificationEmail(userId)
    }
}
