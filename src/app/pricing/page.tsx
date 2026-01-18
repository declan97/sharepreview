"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";

const features = {
  free: [
    "10 checks per day",
    "All 4 platform previews",
    "Basic issue detection",
    "5 OG image templates",
    "Copy-paste meta tags",
  ],
  pro: [
    "Unlimited checks",
    "All 4 platform previews",
    "Advanced issue detection",
    "All OG image templates",
    "Custom branding on images",
    "90-day check history",
    "Monitor up to 25 URLs",
    "Daily automated checks",
    "Email alerts",
    "API access (1,000 calls/mo)",
    "Priority support",
  ],
  team: [
    "Everything in Pro",
    "Monitor up to 100 URLs",
    "Hourly check frequency",
    "Slack & Discord alerts",
    "5 team members",
    "1-year check history",
    "API access (10,000 calls/mo)",
    "Dedicated support",
  ],
};

const comparisonFeatures = [
  { name: "Daily checks", free: "10", pro: "Unlimited", team: "Unlimited" },
  { name: "Platform previews", free: "All 4", pro: "All 4", team: "All 4" },
  { name: "Issue detection", free: "Basic", pro: "Advanced", team: "Advanced" },
  { name: "OG image templates", free: "5", pro: "All 20+", team: "All 20+" },
  { name: "Custom branding", free: false, pro: true, team: true },
  { name: "Check history", free: false, pro: "90 days", team: "1 year" },
  { name: "URL monitoring", free: false, pro: "25 URLs", team: "100 URLs" },
  { name: "Check frequency", free: "—", pro: "Daily", team: "Hourly" },
  { name: "Email alerts", free: false, pro: true, team: true },
  { name: "Slack/Discord alerts", free: false, pro: false, team: true },
  { name: "Team members", free: "—", pro: "1", team: "5" },
  { name: "API access", free: false, pro: "1,000/mo", team: "10,000/mo" },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const proMonthlyPrice = 12;
  const proAnnualPrice = 8; // per month when paid annually
  const proAnnualTotal = proAnnualPrice * 12;

  const teamMonthlyPrice = 29;
  const teamAnnualPrice = 24; // per month when paid annually
  const teamAnnualTotal = teamAnnualPrice * 12;

  const savings = Math.round(((proMonthlyPrice - proAnnualPrice) / proMonthlyPrice) * 100);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b gradient-hero px-4 py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Start free, upgrade when you need unlimited checks.
            No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative h-8 w-16 rounded-full transition-colors ${
                isAnnual ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              aria-label="Toggle billing period"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-200"
                style={{
                  transform: isAnnual ? "translateX(32px)" : "translateX(0)",
                }}
              />
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Annual
            </button>
            {isAnnual && (
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                Save {savings}%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Free</h3>
                  <p className="text-sm text-muted-foreground">For casual use</p>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <p className="mt-4 text-muted-foreground">
                Perfect for checking the occasional link before sharing.
              </p>

              <Link href="/" className="mt-8 block">
                <Button variant="outline" className="w-full" size="lg">
                  Get Started Free
                </Button>
              </Link>

              <ul className="mt-8 space-y-4">
                {features.free.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Most Popular
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <p className="text-sm text-muted-foreground">For creators & marketers</p>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-5xl font-bold">
                  ${isAnnual ? proAnnualPrice : proMonthlyPrice}
                </span>
                <span className="text-muted-foreground">/month</span>
                {isAnnual && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    billed annually (${proAnnualTotal}/year)
                  </span>
                )}
              </div>

              <p className="mt-4 text-muted-foreground">
                Unlimited checks + monitoring for your key URLs.
              </p>

              <Link href="/dashboard" className="mt-8 block">
                <Button className="w-full" size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                14-day free trial • No credit card required
              </p>

              <ul className="mt-8 space-y-4">
                {features.pro.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Plan */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Team</h3>
                  <p className="text-sm text-muted-foreground">For growing teams</p>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-5xl font-bold">
                  ${isAnnual ? teamAnnualPrice : teamMonthlyPrice}
                </span>
                <span className="text-muted-foreground">/month</span>
                {isAnnual && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    billed annually (${teamAnnualTotal}/year)
                  </span>
                )}
              </div>

              <p className="mt-4 text-muted-foreground">
                Advanced monitoring with hourly checks and team collaboration.
              </p>

              <Link href="/dashboard" className="mt-8 block">
                <Button variant="outline" className="w-full" size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                14-day free trial • No credit card required
              </p>

              <ul className="mt-8 space-y-4">
                {features.team.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enterprise callout */}
          <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
            <h3 className="text-lg font-semibold">Need more?</h3>
            <p className="mt-2 text-muted-foreground">
              Looking for custom integrations, white-label reports, or higher limits?
            </p>
            <a
              href="mailto:hello@sharepreview.com"
              className="mt-4 inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              Contact us for Enterprise pricing
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="border-t bg-muted/20 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Compare plans</h2>
          <p className="mt-4 text-center text-muted-foreground">
            See exactly what you get with each plan.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    <span className="text-primary">Pro</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    <span className="text-primary">Team</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={index !== comparisonFeatures.length - 1 ? "border-b" : ""}
                  >
                    <td className="px-6 py-4 text-sm">{feature.name}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="mx-auto h-5 w-5 text-success" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        feature.free
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        <span className="font-medium">{feature.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof feature.team === "boolean" ? (
                        feature.team ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        <span className="font-medium text-primary">{feature.team}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who should upgrade */}
      <section className="border-t px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">
            Which plan is right for you?
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-5 w-5 text-muted-foreground" />
                Free is perfect if you...
              </h3>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  Share links a few times per week
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  Only check links occasionally before posting
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  Don&apos;t need to track what you&apos;ve checked
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  Are fine with basic OG image templates
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-primary bg-card p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Sparkles className="h-5 w-5 text-primary" />
                Upgrade to Pro if you...
              </h3>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Publish content daily or multiple times per week
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Want to verify every link before sharing
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Need history to track what you&apos;ve checked
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Want branded images with your logo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/20 px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-12 space-y-8">
            <FaqItem
              question="Can I try Pro before paying?"
              answer="Yes! Every Pro plan starts with a 14-day free trial. No credit card required. If you decide it's not for you, just don't upgrade and you'll stay on the free plan."
            />
            <FaqItem
              question="What counts as a 'check'?"
              answer="A check is when you submit a URL and we fetch its metadata. Each unique URL you check counts as one check. Re-checking the same URL within 24 hours doesn't count against your limit."
            />
            <FaqItem
              question="Can I switch between monthly and annual?"
              answer="Absolutely. You can switch from monthly to annual billing at any time and we'll prorate the difference. Switching to annual saves you 33%."
            />
            <FaqItem
              question="What happens if I cancel?"
              answer="You can cancel anytime. You'll keep Pro access until the end of your current billing period, then you'll be moved to the free plan. Your check history will be preserved for 30 days."
            />
            <FaqItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee. If you're not satisfied with Pro, contact us within 30 days of purchase for a full refund."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express) through Stripe. We also support Apple Pay and Google Pay."
            />
            <FaqItem
              question="Is my data secure?"
              answer="Yes. We don't store the content of the pages you check—only the metadata. All data is encrypted in transit and at rest. We never share or sell your data."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t px-4 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Ready to stop sharing broken links?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start checking your previews today. Free forever, upgrade anytime.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button size="lg">
                Try Free Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 10 free checks per day
          </p>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-3 text-muted-foreground">{answer}</p>
    </div>
  );
}
