import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(@InjectRepository(Subcategory) private subcategoriesRepository: Repository<Subcategory>) {}

  async create(name: string, category: Category): Promise<Subcategory> {
    const subcategory = new Subcategory();
    subcategory.name = name;
    subcategory.category = category;
    return await this.subcategoriesRepository.save(subcategory)
  }

  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoriesRepository.find({ 
      relations: {
        category: true,
        products: true
      }
    });
  }

  async findOne(id: string): Promise<Subcategory> {
    return await this.subcategoriesRepository.findOne({
      where: { id },
      relations: {
        category: true,
        products: {
          parameters: {
            parameter: true
          }
        }
      }
    });
  }
}
