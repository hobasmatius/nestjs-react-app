import { IsBoolean, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name?: string;

    @IsBoolean()
    isEmailVerified?: boolean;
}