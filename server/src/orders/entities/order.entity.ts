import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field(type => Int)
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable({ name: 'orders_products', joinColumn: { name: 'orderId' }, inverseJoinColumn: { name: 'productId' } })
  @Field(() => [Product], { nullable: true })
  products: Product[];
}