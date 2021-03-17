import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productTitle: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, Order => Order.orderItems)
    @JoinColumn({ name: 'orderId' })
    order: Order;
}
