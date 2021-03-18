import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class RoleCreateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    permissionIds: number[]
}