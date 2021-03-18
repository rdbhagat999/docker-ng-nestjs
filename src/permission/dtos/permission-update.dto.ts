import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class PermissionUpdateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}