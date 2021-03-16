import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import { AbstractService } from './abstract/abstract.service';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [],
    exports: [JwtModule],
})
export class CommonModule {}
