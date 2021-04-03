import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get, Param,
    Post, Put, Query, Req, UnauthorizedException, UseGuards,
} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from "./user.service";
import {User} from "./models/user";
import * as bcrypt from 'bcryptjs';
import {UserCreateDto} from "./dtos/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import { UserUpdateDto } from './dtos/user-update.dto';
import {AuthService} from "../auth/auth.service";
import {UpdatePasswordDto} from "./dtos/update-password.dto";
import {HasPermissionDecorator} from "../utils/has-permission.decorator";
import {UserUpdateByIdDto} from "./dtos/user-update-by-id.dto";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService,) {}

    @Get()
    @HasPermissionDecorator('users')
    async all(@Query('page') page: number = 1, @Query('take') take: number = 15) {
        try {
            return this.userService.paginate(page, take, ['role']);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    @HasPermissionDecorator('users')
    async create(@Body() body: UserCreateDto): Promise<User> {

        const hashed = await bcrypt.hash('123456', 12);

        const { id } = await this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashed,
            role: {id: body.roleId}
        });

        return await this.userService.findOne({id}, ['role']);
    }

    @Get(':id')
    @HasPermissionDecorator('users')
    async get(@Param('id') id: number): Promise<User> {
        try {
            return await this.userService.findOne({id: id}, ['role']);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Put('info')
    async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto): Promise<User> {
        try {
            const id = await this.authService.userId(request);
            await this.userService.update(id, body);
            return await this.userService.findOne({id}, ['role']);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Put('password')
    async updatePassword(@Req() request: Request, @Body() body: UpdatePasswordDto): Promise<User> {

        if(body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }
        const hashed = await bcrypt.hash(body.password, 12);

        try {
            const id = await this.authService.userId(request);
            await this.userService.update(id, {password: hashed});
            return await this.userService.findOne({id}, ['role']);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Put(':id')
    @HasPermissionDecorator('users')
    async update(@Param('id') id: number, @Body() body: UserUpdateByIdDto): Promise<User> {
        const {roleId, ...data} = body;
        try {
            await this.userService.update(id, {
                ...data,
                role: {id: roleId}
            });
            return await this.userService.findOne({id: id}, ['role']);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    @HasPermissionDecorator('users')
    async delete(@Param('id') id: number): Promise<any> {
        try {
            return await this.userService.delete(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
