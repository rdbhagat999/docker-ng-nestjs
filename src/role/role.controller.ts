import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./models/role";
import {UserCreateDto} from "../user/dtos/user-create.dto";
import {User} from "../user/models/user";
import * as bcrypt from "bcryptjs";
import {UserUpdateDto} from "../user/dtos/user-update.dto";
import {RoleCreateDto} from "./dtos/role-create.dto";
import {RoleUpdateDto} from "./dtos/role-update.dto";
import {AuthGuard} from "../auth/auth.guard";
import {HasPermission} from "../permission/decorators/has-permission";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Get()
    @HasPermission('roles')
    async all(): Promise<Role[]> {
        return await this.roleService.all(['permissions']);
    }

    @Post()
    @HasPermission('roles')
    async create(@Body() body: RoleCreateDto): Promise<Role> {
        return await this.roleService.create({
            name: body.name,
            permissions: body.permissionIds.map(id => ({id}))
        });
    }

    @Get(':id')
    @HasPermission('roles')
    async get(@Param('id') id: number): Promise<Role> {
        return await this.roleService.findOne({id: id},  ['permissions']);
    }

    @Put(':id')
    @HasPermission('roles')
    async update(@Param('id') id: number, @Body() body: RoleUpdateDto): Promise<Role> {
        const {permissionIds, name} = body;
        const permissions = permissionIds.map(id => ({id}));

        await this.roleService.update(id, {name});
        const role = await this.roleService.findOne({id: id});

        return await this.roleService.create({
            ...role,
            permissions
        });
    }

    @Delete(':id')
    @HasPermission('roles')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.roleService.delete(id);
    }
}
