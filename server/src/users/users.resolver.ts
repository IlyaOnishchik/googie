import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService
  ) {}

  @Query(() => User, { name: 'user' })
  findOneByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}
