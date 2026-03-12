import { createClient } from "@/lib/supabase/server";

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "unpaid" | "incomplete" | "none";

export interface UserSubscription {
  status: SubscriptionStatus;
  stripCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

/**
 * Check if the current user has an active Pro subscription.
 */
export async function getUserSubscription(): Promise<UserSubscription> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { status: "none", stripCustomerId: null, stripeSubscriptionId: null, currentPeriodEnd: null, cancelAtPeriodEnd: false };
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) {
    return { status: "none", stripCustomerId: null, stripeSubscriptionId: null, currentPeriodEnd: null, cancelAtPeriodEnd: false };
  }

  return {
    status: data.status as SubscriptionStatus,
    stripCustomerId: data.stripe_customer_id,
    stripeSubscriptionId: data.stripe_subscription_id,
    currentPeriodEnd: data.current_period_end,
    cancelAtPeriodEnd: data.cancel_at_period_end ?? false,
  };
}

/**
 * Returns true if the user has an active or trialing Pro subscription.
 */
export async function isProUser(): Promise<boolean> {
  const sub = await getUserSubscription();
  return sub.status === "active" || sub.status === "trialing";
}
