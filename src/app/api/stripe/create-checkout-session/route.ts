import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, STRIPE_PRICES, type PlanInterval } from "@/lib/stripe/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Trebuie sa fii autentificat" }, { status: 401 });
  }

  const body = await request.json();
  const interval = body.interval as PlanInterval;

  if (!interval || !STRIPE_PRICES[interval]) {
    return NextResponse.json({ error: "Interval invalid" }, { status: 400 });
  }

  // Check if user already has a Stripe customer ID
  const { data: existingSub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  let customerId = existingSub?.stripe_customer_id;

  // Create a Stripe customer if needed
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Store the customer ID
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      stripe_customer_id: customerId,
      status: "none",
    });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://prevo.ro";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: STRIPE_PRICES[interval], quantity: 1 }],
    mode: "subscription",
    success_url: `${origin}/panou?upgraded=true`,
    cancel_url: `${origin}/panou`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
  });

  return NextResponse.json({ url: session.url });
}
