// src/reviews/reviews.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { Service } from '../services/entities/service.entity'; // 👈 Import Service entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Service]), // 👈 Register both Review & Service repositories
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
