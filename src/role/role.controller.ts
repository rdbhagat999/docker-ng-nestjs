import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./role";
import {UserCreateDto} from "../user/dtos/user-create.dto";
import {User} from "../user/user";
import * as bcrypt from "bcryptjs";
import {UserUpdateDto} from "../user/dtos/user-update.dto";
import {RoleCreateDto} from "./dtos/role-create.dto";
import {RoleUpdateDto} from "./dtos/role-update.dto";

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Get()
    async all(): Promise<Role[]> {
        return this.roleService.all();
    }

    @Post()
    async create(@Body() body: RoleCreateDto): Promise<Role> {
        return this.roleService.create({
            name: body.name,
        });
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Role> {
        return this.roleService.findOne({id: id});
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: RoleUpdateDto): Promise<Role> {
        await this.roleService.update(id, body);
        return this.roleService.findOne({id: id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return this.roleService.delete(id);
    }
}
