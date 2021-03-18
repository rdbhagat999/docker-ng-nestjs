import {IsNumber, IsString, Max, Min} from "class-validator";

export class ProductUpdateDto {

    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsString()
    image?: string;

    @IsNumber()
    @Min(30)
    @Max(1000)
    price?: string;

}