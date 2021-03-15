import { Controller, Get } from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }
}
