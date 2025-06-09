import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create(dto);
    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find();
  }

  findByUser(userId: number) {
    return this.repo.find({ where: { userId } });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
