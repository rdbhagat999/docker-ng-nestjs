import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param,
    Post, Put, Query, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user";
import * as bcrypt from 'bcryptjs';
import {RegisterDto} from "../auth/dtos/register.dto";
import {UserCreateDto} from "./dtos/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import { UserUpdateDto } from './dtos/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async all(@Query('page') page: number = 1): Promise<User[]> {
        return this.userService.paginate(page);
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
        return this.userService.findOne({id: id});
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
