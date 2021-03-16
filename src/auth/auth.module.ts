import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
      CommonModule,
    UserModule ],
  controllers: [AuthController],
     exports: []
})
export class AuthModule {}
