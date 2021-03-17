import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PermissionService} from "./permission.service";
import {Permission} from "./models/permission";
import {PermissionUpdateDto} from "./dtos/permission-update.dto";
import {PermissionCreateDto} from "./dtos/permission-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import {HasPermission} from "./decorators/has-permission";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {
    }

    @Get()
    async all(): Promise<Permission[]> {
        return await this.permissionService.all();
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Permission> {
        return await this.permissionService.findOne({id: id});
    }

    // @Post()
    // async create(@Body() body: PermissionCreateDto): Promise<Permission> {
    //     return await this.permissionService.create({
    //         name: body.name,
    //     });
    // }

    // @Put(':id')
    // async update(@Param('id') id: number, @Body() body: PermissionUpdateDto): Promise<Permission> {
    //     await this.permissionService.update(id, body);
    //     return await this.permissionService.findOne({id: id});
    // }

    // @Delete(':id')
    // async delete(@Param('id') id: number): Promise<any> {
    //     return await this.permissionService.delete(id);
    // }
}
