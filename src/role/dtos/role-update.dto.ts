import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class RoleUpdateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    permissionIds: number[]
}