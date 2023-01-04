import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SubcategoriesModule } from 'src/subcategories/subcategories.module';
import { ProductsParametersModule } from 'src/products-parameters/products-parameters.module';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SubcategoriesModule, ProductsParametersModule, ParametersModule],
  providers: [ProductsService, ProductsResolver],
  exports: [ProductsService]
})
export class ProductsModule {}
