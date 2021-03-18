import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import {CommonModule} from "../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permission} from "./models/permission";

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
