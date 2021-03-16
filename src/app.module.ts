import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

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
  UserModule, AuthModule, CommonModule, RoleModule, PermissionModule,],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
    AppService],
})
export class AppModule {}

