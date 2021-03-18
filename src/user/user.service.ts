import {Get, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user";
import {Repository} from "typeorm";
import {AbstractService} from "../common/abstract/abstract.service";
import {PaginatedResult} from "../common/paginated-result.interface";
import {classToPlain} from "class-transformer";

@Injectable()
export class UserService extends AbstractService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository);
    }

    // async paginate(page = 1, take = 15, relations= []): Promise<any> {
    //
    //     const {data, meta} = await super.paginate(page, take, relations);
    //
    //     return {
    //         data,
    //         meta
    //     }
    // }
    //
    // async create(data): Promise<any> {
    //     const user = await super.create(data);;
    //     return user;
    // }
}
