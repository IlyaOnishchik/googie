import { Field, ObjectType } from "@nestjs/graphql";
import { Cart } from "src/carts/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  passwordHash: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'users_roles', joinColumn: { name: 'userId' }, inverseJoinColumn: { name: 'roleId' } })
  @Field(() => [Role])
  roles: Role[];

  @OneToOne(() => Cart, cart => cart.user)
  @Field(() => Cart)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order])
  orders: Order[];
}