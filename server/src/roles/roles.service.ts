import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly rolesRepository: Repository<Role>) {}

  async findOne(id: string): Promise<Role> {
    return await this.rolesRepository.findOne({ where: { id }, relations: ['users'] });
  }

  async findOneByValue(value: string): Promise<Role> {
    return await this.rolesRepository.findOne({ where: { value }, relations: ['users'] });
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['users'] });
  }
}
