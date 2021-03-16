import {IsNotEmpty} from "class-validator";

export class ProductUpdateDto {
    
    @IsNotEmpty()
    title: string;

    // @IsNotEmpty()
    description?: string;

    // @IsNotEmpty()
    image?: string;

    @IsNotEmpty()
    price: string;

}