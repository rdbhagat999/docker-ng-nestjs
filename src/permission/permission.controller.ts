import { Controller } from '@nestjs/common';

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionController: PermissionController) {
    }
}
