import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderItem} from "./order-item";
import {Exclude, Expose} from "class-transformer";

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @Column()
    firstName: string;

    @Exclude()
    @Column()
    lastName: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: string;

    @OneToMany(() => OrderItem, OrderItem => OrderItem.order)
    orderItems: OrderItem[]

    @Expose()
    get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @Expose()
    get total(): number {
        return this.orderItems.reduce((sum, item, index) => {
            return sum + (item.quantity * item.price);
        }, 0);
    }

}
