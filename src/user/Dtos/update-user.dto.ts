import { IsEmail, IsStrongPassword, IsOptional } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsStrongPassword()
    @IsOptional()
    password: string;
}