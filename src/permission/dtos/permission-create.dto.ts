import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export  class PermissionCreateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}