import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }
}
