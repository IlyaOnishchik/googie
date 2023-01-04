import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
  providers: [CartsResolver, CartsService],
  exports: [CartsService]
})
export class CartsModule {}
