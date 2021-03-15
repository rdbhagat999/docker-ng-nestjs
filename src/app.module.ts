import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
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
  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

