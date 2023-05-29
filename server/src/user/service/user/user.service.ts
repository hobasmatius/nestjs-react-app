import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { Auth0Service } from 'src/thirdparty/service/auth0/auth0.service';
import { convertDateToUTC } from 'src/util/util';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/dto/user.dto';
import { BusinessException } from 'src/exception/business.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly auth0Service: Auth0Service
    ) {}

    async findAll() {
        return plainToClass(UserDto, this.userRepository.find());
    }

    async findByEmail(email: string) {
        return plainToClass(UserDto, this.userRepository.findOneBy({ email: email }));
    }

    updateSession(email: string) {
        this.findByEmail(email).then((user) => {
            if (user) {
                user.loginCount += 1;
                user.lastSessionAt = convertDateToUTC(new Date());
                this.userRepository.save(user);
            }
        });
    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);
        
        if (user !== null) {
            throw new BusinessException('User already registered', HttpStatus.OK);
        } else {
            const newUser = this.userRepository.create(createUserDto);
            return plainToClass(UserDto, this.userRepository.save(newUser));
        }
    }

    async update(email: string, updateUserDto: UpdateUserDto) {
        const user = await this.findByEmail(email);
        
        if (user !== null) {
            if (updateUserDto.name) {
                user.name = updateUserDto.name;
            }
            if (updateUserDto.isEmailVerified !== undefined) {
                user.isEmailVerified = updateUserDto.isEmailVerified;
            }

            return plainToClass(UserDto, this.userRepository.save(user));
        } else {
            throw new BusinessException('Failed to update, the user could not be found', HttpStatus.NOT_FOUND);
        }
    }

    sendVerificationEmail(userId: string) {
        this.auth0Service.sendVerificationEmail(userId)
    }
}
