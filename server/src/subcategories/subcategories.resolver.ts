import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

@Resolver()
export class SubcategoriesResolver {
  constructor(
    private subcategoriesService: SubcategoriesService,
    private categoriesService: CategoriesService
  ) {}

  @Mutation(() => Subcategory)
  async createSubcategory(@Args('createSubcategoryInput') createSubcategoryInput: CreateSubcategoryInput): Promise<Subcategory> {
    const category = await this.categoriesService.findOne(createSubcategoryInput.categoryId);
    return this.subcategoriesService.create(createSubcategoryInput.name, category);
  }

  @Query(() => [Subcategory], { name: 'subcategories' })
  findAll(): Promise<Subcategory[]> {
    return this.subcategoriesService.findAll();
  }

  @Query(() => Subcategory, { name: 'subcategory' })
  findOne(@Args('id') id: string): Promise<Subcategory> {
    return this.subcategoriesService.findOne(id);
  }
}
