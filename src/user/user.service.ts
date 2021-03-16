import {Get, Injectable} from '@nestjs/common';
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

    async paginate(page = 1, take = 15): Promise<any> {
        if(! page) {
            page = 1;
        }

        if(! take) {
            take = 15;
        }

        const skip = (page - 1) * take;

        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip
        });

        const usersExcludePasswprd = users.map(user => {
            const {password, ...data} = user;
            return data;
        });

        return {
            data: usersExcludePasswprd,
            meta: {
                total,
                page,
                take,
                skip,
                last_page: Math.ceil(total / take)
            }
        }
    }

    async findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async create(data): Promise<User> {
        const {password, ...user} = await this.userRepository.save(data);
        return user;
    }

    async update(id: number, data): Promise<any> {
        return await this.userRepository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return await this.userRepository.delete(id);
    }
}
