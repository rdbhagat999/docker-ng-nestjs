import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {RoleService} from "../role/role.service";
import {PermissionService} from "./permission.service";
import {User} from "../user/models/user";
import {Role} from "../role/models/role";
import {Permission} from "./models/permission";

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private readonly reflector: Reflector,
              private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly permissionService: PermissionService,
              private readonly roleService: RoleService,) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const access = this.reflector.get<string>('access', context.getHandler());
    // console.log(access);
    return await this.checkPermissions(access, context);

  }

  private async checkPermissions(access: string, context: ExecutionContext): Promise<boolean> {
    if( ! access ) {
      // because it is a global function
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = await this.authService.userId(request);
    const user: User = await this.userService.findOne({id: userId}, ['role']);
    const userRole: Role = await this.roleService.findOne({id: user.role.id}, ['permissions']);
    // console.log(userRole);

    if(request.method === 'GET') {
      return userRole.permissions.some((p: Permission) => (p.name === `view_${access}`) || (p.name === `edit_${access}`));
    }

    return userRole.permissions.some((p: Permission) => (p.name === `edit_${access}`));
  }

}
