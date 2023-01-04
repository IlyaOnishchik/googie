import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return await this.categoriesRepository.save(createCategoryInput);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: { 
        subcategories: {
          products: {
            parameters: {
              parameter: true
            }
          }
        }
      } 
    });
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoriesRepository.findOne({ 
      where: { id }, 
      relations: { subcategories: true } 
    });
  }
}
