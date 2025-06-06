import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Post()
  create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }
}
