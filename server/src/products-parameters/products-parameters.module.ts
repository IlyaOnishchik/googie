import { forwardRef, Module } from '@nestjs/common';
import { ProductsParametersService } from './products-parameters.service';
import { ProductsParametersResolver } from './products-parameters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductParameter } from './entities/product-parameter.entity';
import { ProductsModule } from 'src/products/products.module';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductParameter]), forwardRef(() => ProductsModule), ParametersModule],
  providers: [ProductsParametersService, ProductsParametersResolver],
  exports: [ProductsParametersService]
})
export class ProductsParametersModule {}
