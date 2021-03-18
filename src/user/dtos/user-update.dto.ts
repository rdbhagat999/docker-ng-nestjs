import {IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";

export  class UserUpdateDto {
    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    @IsEmail()
    email?: string;

    @IsNumber()
    roleId?: number;
}