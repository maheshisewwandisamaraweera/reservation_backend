import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':serviceName')
  getReviews(@Param('serviceName') serviceName: string) {
    return this.reviewsService.findByService(serviceName);
  }

  @Post()
  addReview(@Body() reviewData: any) {
    return this.reviewsService.create(reviewData);
  }
}
