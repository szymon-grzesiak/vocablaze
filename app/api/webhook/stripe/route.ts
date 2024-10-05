import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/lib/db';
import stripe from '@/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session?.metadata?.userEmail;

    if (customerEmail) {
      // Fulfill the order
      await fulfillOrder(customerEmail);
    }
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(customerEmail: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: customerEmail,
      },
    });

    if (!user) {
      throw new Error('No user found');
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: 'PRO',
      },
    });
  } catch (error) {
    console.error('Error fulfilling order:', error);
  }
}
