import {Injectable, NotFoundException, Req, UnauthorizedException} from '@nestjs/common';
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    async userId(request: Request): Promise<number> {
        try {
            const token = request.cookies['token'];
            const data = await this.jwtService.verifyAsync(token);

            if(! data) {
                throw new NotFoundException('User not found!');
            }
            return data['id'];
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

}
