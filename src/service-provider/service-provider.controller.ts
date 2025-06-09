import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProvider } from './service-provider.entity';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(private readonly service: ServiceProviderService) {}

  @Get()
  findAll(): Promise<ServiceProvider[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Partial<ServiceProvider>) {
    return this.service.create(data);
  }
}
