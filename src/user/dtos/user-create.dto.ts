import {IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";

export  class UserCreateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}