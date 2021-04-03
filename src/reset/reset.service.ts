import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ResetEntity} from "./models/reset.entity";
import {Reset} from "./models/reset";

@Injectable()
export class ResetService {
    constructor(@InjectRepository(ResetEntity) private readonly resetRepository: Repository<ResetEntity>) {}

    async create(data: Reset): Promise<Reset> {
        return await this.resetRepository.save(data);
    }

    async findOne(condition, relations = []): Promise<Reset> {
        return await this.resetRepository.findOne(condition, {relations});
    }
}
