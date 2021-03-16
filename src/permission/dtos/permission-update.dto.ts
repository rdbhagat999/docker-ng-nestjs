import {IsNotEmpty} from "class-validator";

export class PermissionUpdateDto {
    @IsNotEmpty()
    name: string;
}