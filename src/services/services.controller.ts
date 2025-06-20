import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';

@Controller('service')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: string): Promise<Service[]> {
    return this.servicesService.findAllByUser(userId);
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
