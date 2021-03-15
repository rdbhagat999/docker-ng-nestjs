import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from "./constants";

@Module({
  imports: [
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
    UserModule ],
  controllers: [AuthController],
     exports: [JwtModule]
})
export class AuthModule {}
