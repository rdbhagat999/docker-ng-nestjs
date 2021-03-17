import { Injectable } from '@nestjs/common';
import {AbstractService} from "../common/abstract/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./models/order";
import {PaginatedResult} from "../common/paginated-result.interface";

@Injectable()
export class OrderService extends AbstractService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }

    async paginate(page = 1, take = 15, relations = []): Promise<PaginatedResult> {
        if(! page) {
            page = 1;
        }

        if(! take) {
            take = 15;
        }

        const skip = (page - 1) * take;

        const [rows, total] = await this.orderRepository.findAndCount({
            take,
            skip,
            relations
        });

        const orders = rows.map((order) => ({
            id: order.id,
            name: order.name,
            email: order.email,
            createdAt: order.createdAt,
            orderItems: order.orderItems,
            total: order.total,
        }));

        return {
            data: orders,
            meta: {
                total,
                page,
                take,
                skip,
                last_page: (page == 1 && total <= take) ? 1 : Math.ceil(total / take)
            }
        }
    }
}
