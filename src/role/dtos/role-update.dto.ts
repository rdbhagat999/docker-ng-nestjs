import {IsNotEmpty} from "class-validator";

export  class RoleUpdateDto {
    @IsNotEmpty()
    firstName: string;
}