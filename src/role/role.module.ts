import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import {CommonModule} from "../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./role";

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
