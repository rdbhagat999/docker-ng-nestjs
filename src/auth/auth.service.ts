import {Injectable, NotFoundException, Req} from '@nestjs/common';
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    async userId(request: Request): Promise<number> {
        const token = request.cookies['token'];
        const data = await this.jwtService.verifyAsync(token);

        if(! data) {
            throw new NotFoundException('User not found!');
        }
        return data['id'];
    }

}
