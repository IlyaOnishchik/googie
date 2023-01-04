import { Args, Query, Resolver } from '@nestjs/graphql';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Resolver()
export class RolesResolver {
  constructor(
    private rolesService: RolesService
  ) {}

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
}
