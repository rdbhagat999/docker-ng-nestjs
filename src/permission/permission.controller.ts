import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PermissionService} from "./permission.service";
import {Permission} from "./models/permission";
import {AuthGuard} from "../auth/auth.guard";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {
    }

    @Get()
    async all(@Query('page') page: number = 1, @Query('take') take: number = 15) {
        return await this.permissionService.paginate(page, take,);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Permission> {
        return await this.permissionService.findOne({id: id});
    }
}
