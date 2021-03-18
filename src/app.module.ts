import {Module, ValidationPipe} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import {PermissionGuard} from "./permission/permission.guard";
import {DataInterceptor} from "./utils/data.interceptor";
import {DataPipe} from "./utils/data.pipe";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'ngnestjs',
    // entities: [],
    autoLoadEntities: true, // don't use in production mode because it will always migrate database
    synchronize: true,
  }), 
  UserModule, AuthModule, CommonModule, RoleModule, PermissionModule, ProductModule, OrderModule,],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_PIPE,
      useClass: DataPipe
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    },
    AppService,
  ],
})
export class AppModule {}

