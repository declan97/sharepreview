import Stripe from "stripe";

// Only initialize Stripe if the secret key is provided
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : null;

export const PLANS = {
  FREE: {
    name: "Free",
    checksPerDay: 5,
    priceId: null,
  },
  PRO: {
    name: "Pro",
    checksPerDay: -1, // unlimited
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    price: 9,
  },
  BUSINESS: {
    name: "Business",
    checksPerDay: -1,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    price: 29,
  },
  API: {
    name: "API",
    checksPerDay: -1,
    priceId: process.env.STRIPE_API_PRICE_ID,
    price: 49,
  },
} as const;

export type PlanType = keyof typeof PLANS;

export function getPlanLimits(plan: string) {
  const planConfig = PLANS[plan as PlanType] || PLANS.FREE;
  return {
    checksPerDay: planConfig.checksPerDay,
    isUnlimited: planConfig.checksPerDay === -1,
  };
}

export function canUserCheck(plan: string, checksToday: number): boolean {
  const limits = getPlanLimits(plan);
  if (limits.isUnlimited) return true;
  return checksToday < limits.checksPerDay;
}
