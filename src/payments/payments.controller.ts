import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/create-payment-intent')
  createPaymentIntent(@Body() paymentData: any) {
    return this.paymentsService.createIntent(paymentData);
  }
}
