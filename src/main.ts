import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    whitelist: true, // automatically remove non-whitelisted properties
  }));
  await app.listen(3000);
}
bootstrap();
