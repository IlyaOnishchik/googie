import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    UsersModule,
    CartsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '7d' }
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
