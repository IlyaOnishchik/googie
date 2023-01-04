import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver(() => String)
export class AuthResolver {
    constructor(
      private authService: AuthService,
      private usersService: UsersService,
    ) {}
  
    @Mutation(() => String)
    async login(@Args('credentials') credentials: AuthCredentialsInput): Promise<string> {
      return this.authService.login(credentials);
    }
  
    @Mutation(() => String)
    async register(@Args('credentials') credentials: AuthCredentialsInput): Promise<string> {
      return this.authService.register(credentials);
    }

    @Query(() => User, { name: 'currentUser' })
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@CurrentUser() user: User) {
      return this.usersService.findOne(user.id)
    }
}