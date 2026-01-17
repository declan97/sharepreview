import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, type PlanType } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Payments are not configured yet. Coming soon!" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { plan, email } = body as { plan: PlanType; email?: string };

    if (!plan || !PLANS[plan] || plan === "FREE") {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plan];
    if (!planConfig.priceId) {
      return NextResponse.json(
        { error: "Plan not available yet" },
        { status: 400 }
      );
    }

    // Create checkout session without requiring user account
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        plan,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
