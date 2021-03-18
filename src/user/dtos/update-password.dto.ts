import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class UpdatePasswordDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password_confirm: string;
}