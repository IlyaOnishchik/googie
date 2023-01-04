import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from './carts.service';
import { AddProductInput } from './dto/add-product.input';
import { RemoveProductInput } from './dto/remove-product.input';
import { Cart } from './entities/cart.entity';

@Resolver()
export class CartsResolver {
  constructor(
    private cartsService: CartsService,
    private productsService: ProductsService
  ) {}

  @Mutation(() => Cart, { name: 'addProductToCart' })
  async addProduct(@Args('addProductInput') addProductInput: AddProductInput): Promise<Cart> {
    const { cartId, productId } = addProductInput;
    const product = await this.productsService.findOne(productId);
    return this.cartsService.addProduct(cartId, product);
  }

  @Mutation(() => Cart, { name: 'removeProductFromCart' })
  async removeProduct(@Args('removeProductInput') removeProductInput: RemoveProductInput): Promise<Cart> {
    const { cartId, productId } = removeProductInput;
    return this.cartsService.removeProduct(cartId, productId);
  }
}
