import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '@app/common';
import { ConfigService } from '@nestjs/config';

import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  // async createCharge({ card, amount }: CreateChargeDto) {
  //   const paymentMethod = await this.stripe.paymentMethods.create({
  //     type: 'card',
  //     card,
  //   });

  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     payment_method: paymentMethod.id,
  //     amount: amount * 100,
  //     confirm: true,
  //     payment_method_types: ['card'],
  //     currency: 'usd',
  //   });

  //   return paymentIntent;
  // }
  async createCharge({ amount }: CreateChargeDto) {
    return await this.stripe.paymentIntents.create({
      amount: amount * 100,

      confirm: true,

      currency: 'usd',

      payment_method: 'pm_card_visa',

      automatic_payment_methods: {
        allow_redirects: 'never',

        enabled: true,
      },
    });
  }
}
