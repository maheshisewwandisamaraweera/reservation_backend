import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({
      relations: ['user'],
    });
  }

  findAllByUser(userId: string): Promise<Service[]> {
    return this.servicesRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ['user'],
    });
  }

  findOne(id: number): Promise<Service> {
    return this.servicesRepository.findOneBy({ id });
  }

  async create(service: Partial<Service>): Promise<Service> {
    const newService = this.servicesRepository.create(service);
    return this.servicesRepository.save(newService);
  }
}
