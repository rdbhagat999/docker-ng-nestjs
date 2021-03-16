import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get, Param,
    Post, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user";
import * as bcrypt from 'bcryptjs';
import {RegisterDto} from "../auth/dtos/register.dto";
import {UserCreateDto} from "./dtos/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {

        const hashed = await bcrypt.hash('123456', 12);

        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashed
        });
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<User> {
        return this.userService.findOne({id: id});
    }
}
