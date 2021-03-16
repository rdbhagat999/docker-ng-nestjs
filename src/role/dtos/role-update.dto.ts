import {IsNotEmpty} from "class-validator";

export class RoleUpdateDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    permissionIds: number[]
}