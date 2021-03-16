import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param,
    Post, Put, Query, Req, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from "./user.service";
import {User} from "./user";
import * as bcrypt from 'bcryptjs';
import {UserCreateDto} from "./dtos/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import { UserUpdateDto } from './dtos/user-update.dto';
import {AuthService} from "../auth/auth.service";
import {UpdatePasswordDto} from "./dtos/update-password.dto";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService,) {}

    @Get()
    async all(@Query('page') page: number = 1) {
        return this.userService.paginate(page, 15, ['role']);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {

        const hashed = await bcrypt.hash('123456', 12);

        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashed,
            role: {id: body.roleId}
        });
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<User> {
        return this.userService.findOne({id: id}, ['role']);
    }

    @Put('info')
    async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto): Promise<User> {
        const id = await this.authService.userId(request);
        await this.userService.update(id, body);
        return await this.userService.findOne({id}, ['role']);
    }

    @Put('password')
    async updatePassword(@Req() request: Request, @Body() body: UpdatePasswordDto): Promise<User> {

        if(body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }
        const hashed = await bcrypt.hash(body.password, 12);

        const id = await this.authService.userId(request);

        await this.userService.update(id, {password: hashed});
        return await this.userService.findOne({id}, ['role']);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UserUpdateDto): Promise<User> {
        const {roleId, ...data} = body;
        await this.userService.update(id, {
            ...data,
            role: {id: roleId}
        });
        return this.userService.findOne({id: id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return this.userService.delete(id);
    }
}
