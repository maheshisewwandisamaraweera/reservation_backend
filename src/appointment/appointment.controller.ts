import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get()
  getAll(): Promise<Appointment[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Partial<Appointment>) {
    return this.service.create(data);
  }
}
