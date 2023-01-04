import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from 'src/parameters/entities/parameter.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductParameter } from './entities/product-parameter.entity';

@Injectable()
export class ProductsParametersService {
  constructor(@InjectRepository(ProductParameter) private productsParametersRepository: Repository<ProductParameter>) {}

  async create(product: Product, parameter: Parameter, value: string): Promise<ProductParameter> {
    const productParameter = new ProductParameter();
    productParameter.value = value;
    productParameter.product = product;
    productParameter.parameter = parameter;
    return await this.productsParametersRepository.save(productParameter);
  }

  async delete(product: Product, parameter: Parameter): Promise<boolean> {
    const result = await this.productsParametersRepository.delete({ product, parameter });
    return !!result.affected;
  }

  async deleteByProduct(product: Product): Promise<boolean> {
    const result = await this.productsParametersRepository.delete({ product });
    return !!result.affected;
  }

  async findAll(): Promise<ProductParameter[]> {
    return await this.productsParametersRepository.find({ relations: { product: true, parameter: true } })
  }
}
