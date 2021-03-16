import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.cookies['token'];
      const data = this.jwtService.verify(token);
      return data;
    } catch (e) {
      return false;
    }
  }
}
