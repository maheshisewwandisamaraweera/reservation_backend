import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get(':userId')
  getAppointments(@Param('userId') userId: string) {
    return this.appointmentsService.findByUser(userId);
  }

  @Post()
  createAppointment(@Body() appointmentData: any) {
    return this.appointmentsService.create(appointmentData);
  }
}
