import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Post(':serviceId')
  create(@Body() dto: CreateReviewDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':serviceId')
  findByService(@Param('serviceId') serviceId: string) {
    return this.service.findByService(+serviceId); // Convert to number
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
