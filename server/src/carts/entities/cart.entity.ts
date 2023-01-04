import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  user: User;

  @ManyToMany(() => Product, product => product.carts)
  @JoinTable({ name: 'carts_products', joinColumn: { name: 'cartId' }, inverseJoinColumn: { name: 'productId' } })
  @Field(() => [Product], { nullable: true })
  products: Product[];
}