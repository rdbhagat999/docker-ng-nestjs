import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {CommonModule} from "../common/common.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [ CommonModule, AuthModule, TypeOrmModule.forFeature([User]) ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
