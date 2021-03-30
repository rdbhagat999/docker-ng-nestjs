import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UseGuards,
} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./models/role";
import {RoleCreateDto} from "./dtos/role-create.dto";
import {RoleUpdateDto} from "./dtos/role-update.dto";
import {AuthGuard} from "../auth/auth.guard";
import {HasPermissionDecorator} from "../utils/has-permission.decorator";

@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Get()
    @HasPermissionDecorator('roles')
    async all(@Query('page') page: number = 1, @Query('take') take: number = 15) {
        return await this.roleService.paginate(page, take,['permissions']);
    }

    @Post()
    @HasPermissionDecorator('roles')
    async create(@Body() body: RoleCreateDto): Promise<Role> {
        const { id } = await this.roleService.create({
            name: body.name,
            permissions: body.permissionIds.map(id => ({id}))
        });
        return await this.roleService.findOne({id: id},  ['permissions']);
    }

    @Get(':id')
    @HasPermissionDecorator('roles')
    async get(@Param('id') id: number): Promise<Role> {
        return await this.roleService.findOne({id: id},  ['permissions']);
    }

    @Put(':id')
    @HasPermissionDecorator('roles')
    async update(@Param('id') id: number, @Body() body: RoleUpdateDto): Promise<Role> {
        const {permissionIds, name} = body;
        const permissions = permissionIds.map(id => ({id}));

        await this.roleService.update(id, {name});
        const role = await this.roleService.findOne({id: id});

        await this.roleService.create({
            ...role,
            permissions
        });
        return await this.roleService.findOne({id: id},  ['permissions']);
    }

    @Delete(':id')
    @HasPermissionDecorator('roles')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.roleService.delete(id);
    }
}
