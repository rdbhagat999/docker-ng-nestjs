import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Permission} from "./permission";

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly roleRepository: Repository<Permission>) {
    }
}
