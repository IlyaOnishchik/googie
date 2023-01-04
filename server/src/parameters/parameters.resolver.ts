import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { CreateParameterInput } from './dto/create-parameter.input';
import { Parameter } from './entities/parameter.entity';
import { ParametersService } from './parameters.service';

@Resolver(() => Parameter)
export class ParametersResolver {
  constructor(
    private parametersService: ParametersService
  ) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Parameter)
  createParameter(@Args('createParameterInput') createParameterInput: CreateParameterInput): Promise<Parameter> {
    return this.parametersService.create(createParameterInput);
  }

  @Query(() => [Parameter], { name: 'parameters' })
  findAll(): Promise<Parameter[]> {
    return this.parametersService.findAll();
  }
}
