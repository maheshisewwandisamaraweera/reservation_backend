import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { Service } from '../services/entities/service.entity'; // Import Service entity if needed

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Service])], // Register Appointment and Service repositories
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
