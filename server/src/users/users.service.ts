import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ 
      where: { id },
      relations: {
        roles: true,
        cart: {
          products: true
        }
      }
    })
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email }, 
      relations: {
        roles: true
      }
    });
  }

  async create(user: User): Promise<User> {
    const role = await this.rolesService.findOneByValue('user');
    user.roles = [role];
    return await this.usersRepository.save(user);
  }
}