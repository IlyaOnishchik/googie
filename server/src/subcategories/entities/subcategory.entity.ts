import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('subcategories')
@ObjectType()
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @Field(() => Category)
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  @Field(() => [Product], { nullable: true })
  products: Product[];
}