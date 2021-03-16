import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Permission} from "./permission";
import {AbstractService} from "../common/abstract/abstract.service";

@Injectable()
export class PermissionService extends AbstractService {
    constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) {
        super(permissionRepository);
    }
}
