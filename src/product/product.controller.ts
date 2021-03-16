import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create.dtos';
import { ProductUpdateDto } from './dtos/product-update.dtos';
import { Product } from './models/product';
import { ProductService } from './product.service';
import {AuthGuard} from "../auth/auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    async paginate(@Query('page') page: number = 1) {
        return await this.productService.paginate(page, 15,);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Product> {
        return await this.productService.findOne({id: id},);
    }

    @Post()
    async create(@Body() body: ProductCreateDto): Promise<Product> {
        return await this.productService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: ProductUpdateDto): Promise<Product> {
        await this.productService.update(id, body);
        return await this.productService.findOne({id: id},);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.productService.delete(id);
    }
}
