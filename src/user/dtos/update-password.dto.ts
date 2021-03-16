import {IsNotEmpty} from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string;
}