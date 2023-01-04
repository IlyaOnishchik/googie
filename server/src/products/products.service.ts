import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { ILike, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

  async create(name: string, price: number, imageName: string, subcategory: Subcategory): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.imageName = imageName;
    product.subcategory = subcategory;
    return await this.productsRepository.save(product);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productsRepository.delete(id);
    return !!result.affected;
  }
  
  async update(id: string, name?: string, price?: number, imageName?: string): Promise<boolean> {
    const result = await this.productsRepository.update(id, { name, price, imageName });
    return !!result.affected;
  }

  async findAll(
    subcategory: Subcategory,
    limit: number, offset: number,
    sortBy: string, order: 'ASC' | 'DESC',
    filters: string[], values: string[],
    query: string
  ): Promise<Product[]> {
    const ids = await this.findIdsWithFilters(filters, values);
    const result = await this.productsRepository.findAndCount({
      relations: {
        subcategory: true,
        parameters: {
          parameter: true
        }
      },
      where: {
        id: ids ? In(ids) : null,
        subcategory: subcategory ? subcategory : null,
        name: query ? ILike(`%${query}%`) : null
      },
      take: limit,
      skip: offset,
      order: sortBy && sortBy !== 'default' ? { [sortBy]: order } : null,

    });
    return result[0]
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOne({
      relations: {
        subcategory: true,
        parameters: {
          parameter: true
        }
      },
      where: { id },
    });
  }

  async getCount(subcategory: Subcategory, filters: string[], values: string[]): Promise<number> {
    const ids = await this.findIdsWithFilters(filters, values);
    const result = await this.productsRepository.findAndCount({
      where: {
        id: ids ? In(ids) : null,
        subcategory: subcategory ? subcategory : null,
      },
    });
    return result[1];
  }

  
  private async findIdsWithFilters(filters: string[], values: string[]): Promise<string[]> {
    if (filters && values && filters.length > 0 && values.length > 0) {
      const response = await this.productsRepository.query(
        `SELECT "productId", name, value FROM products_parameters, parameters
        WHERE products_parameters."parameterId" = parameters.id
        AND name IN('${filters.join("', '")}')
        AND value IN('${values.join("', '")}')`
      )
      const responseIds = response.map(item => item.productId).sort()
      const countIds = responseIds.reduce((acc, item) => {
        acc[item] = acc[item] ? acc[item] + 1 : 1
        return acc
      }, {})
      return Object.keys(countIds).filter((item) => countIds[item] === filters.length)
    } else return null
  }
}