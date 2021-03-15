import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async all(): Promise<User[]> {
        return await this.userRepository.find();
    }


    create(data): Promise<User> {
        return this.userRepository.save(data);
    }
}
