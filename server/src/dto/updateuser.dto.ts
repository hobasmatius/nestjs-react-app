import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    name?: string;

    @IsBoolean()
    isEmailVerified?: boolean;
}