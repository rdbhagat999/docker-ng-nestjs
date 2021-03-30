import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create.dtos';
import { ProductUpdateDto } from './dtos/product-update.dtos';
import { Product } from './models/product';
import { ProductService } from './product.service';
import {AuthGuard} from "../auth/auth.guard";
import {HasPermissionDecorator} from "../utils/has-permission.decorator";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @HasPermissionDecorator('products')
    async paginate(@Query('page') page: number = 1, @Query('take') take: number = 15) {
        return await this.productService.paginate(page, take,);
    }

    @Get(':id')
    @HasPermissionDecorator('products')
    async get(@Param('id') id: number): Promise<Product> {
        return await this.productService.findOne({id: id},);
    }

    @Post()
    @HasPermissionDecorator('products')
    async create(@Body() body: ProductCreateDto): Promise<Product> {
        const { id } = await this.productService.create(body);
        return await this.productService.findOne({id: id},);
    }

    @Put(':id')
    @HasPermissionDecorator('products')
    async update(@Param('id') id: number, @Body() body: ProductUpdateDto): Promise<Product> {
        await this.productService.update(id, body);
        return await this.productService.findOne({id: id},);
    }

    @Delete(':id')
    @HasPermissionDecorator('products')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.productService.delete(id);
    }
}
