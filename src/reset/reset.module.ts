import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import {CommonModule} from "../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ResetEntity} from "./models/reset.entity";
import {MailerModule} from "@nestjs-modules/mailer";
import {UserModule} from "../user/user.module";

@Module({
  imports: [ CommonModule, UserModule, TypeOrmModule.forFeature([ResetEntity]),
  MailerModule.forRoot({
    preview: true,
    transport: {
      /*
      * Problem is the localhost - each container has own namespace,
      * so each container has own localhost, which is independent from other container localhosts.
      * */
      host: 'fake_smtp', // use service_name or container_name when using docker
      port: 1025,
      ignoreTLS: true,
      secure: false,
      // auth: {
      //   user: process.env.MAILDEV_INCOMING_USER,
      //   pass: process.env.MAILDEV_INCOMING_PASS,
      // },
    },
    defaults: {
      from: 'no-reply@localhost.com'
    }
  })],
  controllers: [ResetController],
  providers: [ResetService],
  exports: [ResetService],
})
export class ResetModule {}
