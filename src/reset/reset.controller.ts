import {BadRequestException, Body, Controller, NotFoundException, Post} from '@nestjs/common';
import {ResetService} from "./reset.service";
import {MailerService} from "@nestjs-modules/mailer";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcryptjs";

@Controller()
export class ResetController {

    constructor(private readonly resetService: ResetService, private readonly mailerService: MailerService, private readonly userService: UserService, ) {
    }

    @Post('forgot')
    async forgot(@Body('email') email: string) {

        const token = Math.random().toString(30).substr(9, 21);

        const data = {
            email,
            token
        }

        await this.resetService.create(data);

        const url = `http://localhost:4200/reset/${token}`;

        const messageStatus = await this.mailerService.sendMail({
            to: email,
            subject: 'Reset password',
            html: `Click <a href="${url}">here</a> to reset your password!`
        });

        console.log('messageStatus');
        console.log(messageStatus);

        if ( !messageStatus ) {
            throw new BadRequestException('Email not sent!')
        }

            return {
            message: 'Please check your email.'
        }

    }

    @Post('reset')
    async reset(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {

        if(password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!')
        }

        const { email } = await this.resetService.findOne({ token });

        const user = await this.userService.findOne({ email });

        if( !user ) {
            throw new NotFoundException('User not found!')
        }

        const hashed = await bcrypt.hash(password, 12);

        await this.userService.update(user.id, {
            password: hashed
        });

        return {
            message: 'success'
        }
    }

}
