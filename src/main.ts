import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    whitelist: true, // automatically remove non-whitelisted properties
  }));
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
