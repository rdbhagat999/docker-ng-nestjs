import {
    ClassSerializerInterceptor,
    Controller,
    Get, Param,
    Post,
    Query,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {OrderService} from "./order.service";
import {AuthGuard} from "../auth/auth.guard";
import {Response} from 'express';
import {parse} from "json2csv";
import {Order} from "./models/order";
import {OrderItem} from "./models/order-item";
import {HasPermission} from "../permission/decorators/has-permission";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @HasPermission('orders')
    async all(@Query('page') page = 1) {
        return this.orderService.paginate(page, 15, ['orderItems']);
    }

    @Get(':id')
    @HasPermission('orders')
    async get(@Param('id') id: string, @Query('page') page = 1) {
        return this.orderService.findOne({id}, ['orderItems']);
    }

    @Post('export-csv')
    @HasPermission('orders')
    async export_csv(@Res() response: Response) {

        const json = [];

        const orders = await this.orderService.all(['orderItems']);

        orders.forEach((order: Order, index) => {
            json.push({
                Id: order?.id,
                Name: order?.name,
                Email: order?.email,
                Product: '',
                Price: '',
                Quantity: '',
            });

            order.orderItems.forEach((item: OrderItem) => {
                json.push({
                    Id: '',
                    Name: '',
                    Email: '',
                    Product: item?.productTitle,
                    Price: item?.price,
                    Quantity: item?.quantity,
                });
            });
        });

        const fields = ['Id', 'Name', 'Email', 'Product', 'Price', 'Quantity'];
        let csv = '';

        try {
            csv = parse(json, {fields});
            console.log(csv);
        } catch (err) {
            console.error(err);
        }

        response.header('Content-Type', 'text/csv');
        response.attachment('orders.csv');

        return response.send(csv);

    }
}
