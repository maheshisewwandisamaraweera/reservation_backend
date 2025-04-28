import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private reviews = [];

  findByService(serviceName: string) {
    return this.reviews.filter(r => r.serviceName === serviceName);
  }

  create(reviewData: any) {
    this.reviews.push(reviewData);
    return { message: 'Review submitted' };
  }
}
