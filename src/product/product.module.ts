import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {CommonModule} from "../common/common.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [CommonModule, AuthModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
