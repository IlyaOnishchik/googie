import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterInput } from './dto/create-parameter.input';
import { Parameter } from './entities/parameter.entity';

@Injectable()
export class ParametersService {
  constructor(@InjectRepository(Parameter) private parametersRepository: Repository<Parameter>) {}

  async create(createParameterInput: CreateParameterInput): Promise<Parameter> {
    return await this.parametersRepository.save(createParameterInput);
  }

  async findAll(): Promise<Parameter[]> { return await this.parametersRepository.find(); }
  async findOne(id: string): Promise<Parameter> { return await this.parametersRepository.findOne({ where: { id } }); }
  async findOneByName(name: string): Promise<Parameter> { return await this.parametersRepository.findOne({ where: { name } }); }
}
