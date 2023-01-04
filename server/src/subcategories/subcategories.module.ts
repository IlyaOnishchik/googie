import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesResolver } from './subcategories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory]), CategoriesModule],
  providers: [SubcategoriesService, SubcategoriesResolver],
  exports: [SubcategoriesService]
})
export class SubcategoriesModule {}
