import { Field, ObjectType } from "@nestjs/graphql";
import { ProductParameter } from "src/products-parameters/entities/product-parameter.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('parameters')
@ObjectType()
export class Parameter {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ default: 'check' })
  @Field()
  type: string

  @OneToMany(() => ProductParameter, (productsParameters) => productsParameters.parameter)
  @Field(() => [ProductParameter], { nullable: true })
  productsParameters: ProductParameter[];
}