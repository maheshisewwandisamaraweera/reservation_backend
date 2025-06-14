// src/reviews/reviews.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateReviewDto) {
    const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });

    if (!service) {
      throw new Error('Service not found');
    }

    const review = this.repo.create({
      name: dto.name, 
      rating: dto.rating,
      comment: dto.comment,
      service: service,
    });

    return this.repo.save(review);
  }

  findAll() {
    return this.repo.find({ relations: ['service'] });
  }

  findByService(serviceId: number) {
    return this.repo.find({
      where: { service: { id: serviceId } },
      relations: ['service'],
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
