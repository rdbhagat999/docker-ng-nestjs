import {ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors} from '@nestjs/common';
import {OrderService} from "./order.service";
import {AuthGuard} from "../auth/auth.guard";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async all(@Query('page') page = 1) {
        return this.orderService.paginate(page, 15, ['orderItems'])
    }
}
