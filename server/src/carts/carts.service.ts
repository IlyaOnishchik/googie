import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(Cart) private cartsRepository: Repository<Cart>) {}

  async create(user: User): Promise<Cart> {
    const cart = new Cart();
    cart.user = user;
    return await this.cartsRepository.save(cart);
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartsRepository.findOne({ where: { id }, relations: { products: true } });
  }

  async addProduct(cartId: string, product: Product): Promise<Cart> {
    const cart = await this.findOne(cartId);
    cart.products.push(product);
    return await this.cartsRepository.save(cart);
  }

  async removeProduct(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.findOne(cartId);
    cart.products = cart.products.filter(item => item.id !== productId);
    return await this.cartsRepository.save(cart);
  }
}
