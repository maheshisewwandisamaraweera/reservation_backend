import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/dto/create-user.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) { }

  @Post(':serviceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  create(@Body() dto: CreateReviewDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get(':serviceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  findByService(@Param('serviceId') serviceId: string) {
    return this.service.findByService(+serviceId); // Convert to number
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SERVICE_PROVIDER_ADMIN, UserRole.SERVICE_PROVIDER_STAFF, UserRole.CLIENT, UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
