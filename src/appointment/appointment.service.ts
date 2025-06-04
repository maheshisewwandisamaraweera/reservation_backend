import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Appointment>) {
    const appointment = this.repo.create(data);
    return this.repo.save(appointment);
  }
}
