import {IsEmail, IsNotEmpty} from "class-validator";

export  class UserUpdateDto {
    firstName?: string;
    lastName?: string;

    @IsEmail()
    email?: string;

    roleId?: number;
}