import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the right plan for your link preview needs. Start free, upgrade when you need more.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for occasional use",
    features: [
      "5 checks per day",
      "All platform previews",
      "Basic issue detection",
      "5 OG image templates",
      "Copy meta tag code",
    ],
    cta: "Get Started",
    href: "/",
    popular: false,
    comingSoon: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For content creators & bloggers",
    badge: "Launch pricing",
    features: [
      "Unlimited checks",
      "All platform previews",
      "Advanced issue detection",
      "20+ OG image templates",
      "Custom branding on images",
      "Check history (30 days)",
      "Priority support",
    ],
    cta: "Join Waitlist",
    href: "#waitlist",
    popular: true,
    comingSoon: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    description: "For teams & agencies",
    features: [
      "Everything in Pro",
      "Bulk URL checking (50 at once)",
      "API access (1,000 checks/mo)",
      "Team collaboration (5 users)",
      "White-label reports",
      "Monitoring & alerts",
      "90-day history",
    ],
    cta: "Join Waitlist",
    href: "#waitlist",
    popular: false,
    comingSoon: true,
  },
  {
    name: "API",
    price: "$49",
    period: "/month",
    description: "For developers & SaaS",
    features: [
      "2,000 API checks/month",
      "$0.01 per additional check",
      "Full API access",
      "Webhook notifications",
      "Bulk operations",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Join Waitlist",
    href: "#waitlist",
    popular: false,
    comingSoon: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Start free and upgrade when you need more. All plans include a 14-day
            free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                {"badge" in plan && plan.badge && (
                  <div className="absolute -top-3 right-4">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {plan.comingSoon ? (
                    <a href={plan.href} className="mt-6 block">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  ) : (
                    <Link href={plan.href} className="mt-6">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <FaqItem
              question="Can I try before I buy?"
              answer="Yes! You can use the free tier forever with 5 checks per day. All paid plans also include a 14-day free trial with no credit card required."
            />
            <FaqItem
              question="What happens if I exceed my limits?"
              answer="On the free plan, you'll need to wait until the next day. On paid plans, we'll notify you when you're approaching your limits and you can upgrade anytime."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
            />
            <FaqItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe."
            />
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="border-t bg-primary/5 px-4 py-20">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold">Get Early Access to Pro</h2>
          <p className="mt-4 text-muted-foreground">
            Join the waitlist and get 20% off when we launch paid plans. Be the first to unlock unlimited checks, advanced templates, and more.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/waitlist" method="POST">
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              className="flex-1 rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit">Join Waitlist</Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start checking your link previews today—completely free.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/">
              <Button size="lg">Try Free Now</Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Upgrade anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{question}</h3>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </div>
  );
}
