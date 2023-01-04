import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParametersService } from 'src/parameters/parameters.service';
import { ProductsParametersService } from 'src/products-parameters/products-parameters.service';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    private subcategoriesService: SubcategoriesService,
    private parametersService: ParametersService,
    private productsParametersService: ProductsParametersService
  ) {}
  
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product, { name: 'createProduct' })
  async create(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    const { name, price, imageName, subcategoryId, parameters } = createProductInput;
    const subcategory = await this.subcategoriesService.findOne(subcategoryId);
    const product = await this.productsService.create(name, price, imageName, subcategory);
    parameters.forEach(async (item) => {
      const parameter = await this.parametersService.findOneByName(item.name)
      await this.productsParametersService.create(product, parameter, item.value)
    });
    return product;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean, { name: 'deleteProduct' })
  async delete(@Args('id') id: string): Promise<boolean> {
    const product = await this.productsService.findOne(id);
    await this.productsParametersService.deleteByProduct(product);
    return this.productsService.delete(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean, { name: 'updateProduct' })
  async update(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<boolean> {
    const { id, name, price, imageName} = updateProductInput;
    return this.productsService.update(id, name, price, imageName);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(
    @Args('subcategoryId', { nullable: true }) subcategoryId: string,
    @Args('limit', { nullable: true, type: () => Int }) limit: number,
    @Args('offset', { nullable: true, type: () => Int }) offset: number,
    @Args('sortBy', { nullable: true }) sortBy: string,
    @Args('order', { nullable: true }) order: 'ASC' | 'DESC',
    @Args('filters', { nullable: true, type: () => [String] }) filters: string[],
    @Args('values', { nullable: true, type: () => [String] }) values: string[],
    @Args('query', { nullable: true }) query: string,
  ): Promise<Product[]> {
    let subcategory = null;
    if(subcategoryId) subcategory = await this.subcategoriesService.findOne(subcategoryId);
    return this.productsService.findAll(subcategory, limit, offset, sortBy, order, filters, values, query);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query(() => Int, { name: 'productsCount' })
  async getCount(
    @Args('subcategoryId', { nullable: true }) subcategoryId: string,
    @Args('filters', { nullable: true, type: () => [String] }) filters: string[],
    @Args('values', { nullable: true, type: () => [String] }) values: string[],
  ): Promise<number> {
    let subcategory = null;
    if(subcategoryId) subcategory = await this.subcategoriesService.findOne(subcategoryId);
    return this.productsService.getCount(subcategory, filters, values);
  }
}
