import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import db from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const fulfillOrder = async (customerEmail: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: customerEmail,
      },
    });

    if (!user) {
      console.error("No user found");
      throw new Error("No user found");
    }

    // Update user data
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isPremium: true,
      },
    });
  } catch (error) {
    console.error("Error fulfilling order: " + error);
  }
};

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature") as string;

  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(
      `Webhook signature verification failed. ${{ error: (err as Error).message }}`
    );
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as any).id,
          {
            expand: ["line_items"],
          }
        );

        const lineItems = session?.line_items;

        if (!lineItems) {
          console.error("No line items found");
          throw new Error("No line items found");
        }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...

        await fulfillOrder((event.data.object as any).customer_details.email);

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }
      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error(
      "stripe error: " + (e as Error).message + " | EVENT TYPE: " + event.type
    );
  }

  return NextResponse.json({
    received: true,
  });
}
