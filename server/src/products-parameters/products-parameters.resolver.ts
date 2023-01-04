import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParametersService } from 'src/parameters/parameters.service';
import { ProductsService } from 'src/products/products.service';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { CreateProductParameterInput } from './dto/create-product-parameter.input';
import { ProductParameter } from './entities/product-parameter.entity';
import { ProductsParametersService } from './products-parameters.service';

@Resolver()
export class ProductsParametersResolver {
  constructor(
    private productsParametersService: ProductsParametersService,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private parametersService: ParametersService,
  ) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => ProductParameter)
  async createProductParameter(@Args('createProductParameterInput') createProductParameterInput: CreateProductParameterInput): Promise<ProductParameter> {
    const product = await this.productsService.findOne(createProductParameterInput.productId);
    const parameter = await this.parametersService.findOne(createProductParameterInput.parameterId);
    return this.productsParametersService.create(product, parameter, createProductParameterInput.value);
  }

  @Query(() => [ProductParameter], { name: 'productsParameters' })
  findAll(): Promise<ProductParameter[]> {
    return this.productsParametersService.findAll();
  }
}
