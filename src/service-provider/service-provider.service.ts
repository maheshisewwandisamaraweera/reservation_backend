import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceProvider } from './service-provider.entity';

@Injectable()
export class ServiceProviderService {
  constructor(
    @InjectRepository(ServiceProvider)
    private repo: Repository<ServiceProvider>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<ServiceProvider>) {
    return this.repo.save(this.repo.create(data));
  }
}
