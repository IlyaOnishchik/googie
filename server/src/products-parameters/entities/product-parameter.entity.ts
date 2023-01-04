import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Parameter } from "src/parameters/entities/parameter.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_parameters')
@ObjectType()
export class ProductParameter {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => Parameter, (parameter) => parameter.productsParameters)
  @Field(() => Parameter)
  parameter: Parameter;

  @ManyToOne(() => Product, (product) => product.parameters)
  @Field(() => Product)
  product: Product;

  @Column()
  @Field()
  value: string;
}