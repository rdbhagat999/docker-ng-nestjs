import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';
import {loginDto} from "./dtos/login.dto";
import {JwtService} from "@nestjs/jwt";
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

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
            password: hashed,
            role: {id: 2} // default role id
        });
    }


    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() body: loginDto, @Res({ passthrough: true }) response: Response ) {
        const user = await this.userService.findOne({email: body.email});

        if(! user) {
            throw new NotFoundException('User not found!');
        }

        const match = await bcrypt.compare(body.password, user.password);

        if(! match) {
            throw new BadRequestException('Wrong username or password');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('token', jwt, { httpOnly: true, sameSite: "strict", });
        response.setHeader('token', jwt);

        return user;

    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request ) {
        const token = request.cookies['token'];
        const data = await this.jwtService.verifyAsync(token);
        const user = await this.userService.findOne({id: data['id']});
        if(! user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }


    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response ) {
        response.clearCookie('token');
        return { message: 'success' };
    }
}
