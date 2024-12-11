import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto, NOTIFiCATIONS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';

import Stripe from 'stripe';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payment-craete-chatge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFiCATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  async createCharge({ amount, email }: PaymentCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,

      confirm: true,

      currency: 'usd',

      payment_method: 'pm_card_visa',

      automatic_payment_methods: {
        allow_redirects: 'never',

        enabled: true,
      },
    });

    this.notificationService.emit('notify_email', { email });

    return paymentIntent;
  }
}
