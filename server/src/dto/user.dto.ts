import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@Exclude()
export class UserDto {
    @Expose()
    id: number;

    @Expose()
    password: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    isEmailVerified: boolean;

    @Expose()
    name?: string;

    @Expose()
    signUpAt: Date;

    @Expose()
    loginCount: number;

    @Expose()
    lastSessionAt: Date;
}