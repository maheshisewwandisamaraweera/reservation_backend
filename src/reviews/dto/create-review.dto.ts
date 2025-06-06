// src/reviews/dto/create-review.dto.ts

export class CreateReviewDto {
  userName: string;      // ✅ match the actual property name
  rating: number;
  comment: string;
  serviceId: number;     // ✅ required to link review to a service
}
