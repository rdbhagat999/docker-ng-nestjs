import {IsDefined, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class ProductCreateDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Min(30)
    @Max(1000)
    price: number;

}