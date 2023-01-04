import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Cart } from "src/carts/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";
import { ProductParameter } from "src/products-parameters/entities/product-parameter.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field(type => Int)
  price: number;

  @Column()
  @Field()
  imageName: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @Field(() => Subcategory)
  subcategory: Subcategory;

  @OneToMany(() => ProductParameter, (parameters) => parameters.product)
  @Field(() => [ProductParameter], { nullable: true })
  parameters: ProductParameter[];

  @ManyToMany(() => Cart, (cart) => cart.products)
  @Field(() => [Cart])
  carts: Cart[];

  @ManyToMany(() => Order, (order) => order.products)
  @Field(() => [Order])
  orders: Order[];
}