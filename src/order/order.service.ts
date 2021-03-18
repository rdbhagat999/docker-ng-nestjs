import { Injectable } from '@nestjs/common';
import {AbstractService} from "../common/abstract/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./models/order";

@Injectable()
export class OrderService extends AbstractService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }
}
