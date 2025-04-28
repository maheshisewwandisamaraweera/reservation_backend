import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async createIntent(paymentData: any) {
    // Normally call Stripe API
    return {
      clientSecret: 'fake-client-secret',
      amount: paymentData.amount,
    };
  }
}
