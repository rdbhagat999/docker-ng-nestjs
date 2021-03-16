import {IsNotEmpty} from "class-validator";

export class ProductUpdateDto {

    title?: string;

    description?: string;

    image?: string;

    price?: string;

}