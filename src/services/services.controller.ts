import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { UserRole } from 'src/user/dto/create-user.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('service')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  getAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT,UserRole.SUPER_ADMIN)
  getByUser(@Param('userId') userId: string): Promise<Service[]> {
    return this.servicesService.findAllByUser(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT,UserRole.SUPER_ADMIN)
  getOne(@Param('id') id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT,UserRole.SUPER_ADMIN)
  create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }
}
