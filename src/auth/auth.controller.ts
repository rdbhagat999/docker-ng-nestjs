import {BadRequestException, Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {

    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<User> {
        if(body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashed
        });
    }


    @Post('login')
    async login(@Body() body) {
        return body;
    }
}
