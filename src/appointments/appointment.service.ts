import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Service } from '../services/entities/service.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,

    @InjectRepository(User) // Inject User repository
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    console.log('Creating appointment with data:', dto);
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });
    if (!service) {
      console.error('Service not found for ID:', dto.serviceId);
      throw new Error('Service not found');
    }
    console.log('Creating appointment for user:', user.id, 'on', dto.date, 'at', dto.time, 'for service:', service.id);
    const appointment = this.repo.create({
      date: dto.date,
      time: dto.time,
      user: user, 
      service: service
    });
    return this.repo.save(appointment);
  }

  async findAllAppointments() {
    return this.repo.find({ relations: ['user', 'service'] });
  }

  findAll(userId: string) {
    return this.repo.find({where: { user: { id: Number(userId) } }, relations: ['service'] });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateAppointmentDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async confirmAppointment(id: string, confirmed: boolean) {
    const appointment = await this.repo.findOneBy({ id: Number(id) });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    appointment.confirmed = confirmed;
    return this.repo.save(appointment);
  }
}
