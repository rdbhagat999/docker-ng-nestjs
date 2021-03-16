import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create.dtos';
import { ProductUpdateDto } from './dtos/product-update.dtos';
import { Product } from './models/product';
import { ProductService } from './product.service';

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
        return await this.productService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.productService.delete(id);
    }
}
