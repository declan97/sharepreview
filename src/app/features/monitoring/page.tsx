import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Shield,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Eye,
  AlertTriangle,
  BarChart3,
  Globe,
  Mail,
  Slack,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Preview Monitoring - Never Share a Broken Link Again",
  description:
    "Get alerted when your link previews break. Monitor your key URLs 24/7 and fix issues before your audience sees them.",
  openGraph: {
    title: "Preview Monitoring - Never Share a Broken Link Again",
    description:
      "Get alerted when your link previews break. Monitor your key URLs 24/7 and fix issues before your audience sees them.",
  },
};

const features = [
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get notified the moment something breaks. Email, Slack, or Discord—your choice.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "We check your URLs daily (or hourly on Team plan) so you don't have to.",
  },
  {
    icon: Eye,
    title: "All Platforms",
    description:
      "Monitor how your links appear on Facebook, Twitter, LinkedIn, and Discord.",
  },
  {
    icon: BarChart3,
    title: "Change History",
    description:
      "See what changed, when it changed, and compare before/after snapshots.",
  },
];

const useCases = [
  {
    title: "Product Launches",
    description:
      "Your Product Hunt or launch page preview breaks at 3am. We catch it. You fix it before anyone notices.",
    stat: "47%",
    statLabel: "of launches have preview issues in the first hour",
  },
  {
    title: "Content Marketing",
    description:
      "Blog post images get moved or deleted during a CMS update. We alert you before your next social share.",
    stat: "2x",
    statLabel: "more clicks with working previews",
  },
  {
    title: "E-commerce",
    description:
      "Product pages change constantly. Make sure your bestsellers always look perfect when shared.",
    stat: "89%",
    statLabel: "of shoppers check social before buying",
  },
];

const comparisonData = [
  { feature: "Monitored URLs", free: "—", pro: "25", team: "100" },
  { feature: "Check frequency", free: "—", pro: "Daily", team: "Hourly available" },
  { feature: "Alert channels", free: "—", pro: "Email", team: "Email, Slack, Discord" },
  { feature: "History retention", free: "—", pro: "90 days", team: "1 year" },
  { feature: "Team members", free: "—", pro: "1", team: "5" },
  { feature: "Change detection", free: "—", pro: true, team: true },
  { feature: "Before/after snapshots", free: "—", pro: true, team: true },
];

export default function MonitoringPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b gradient-hero px-4 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="container relative mx-auto max-w-5xl">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Pro Feature</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The last time you&apos;ll share
            <br />
            <span className="text-gradient">a broken link</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground lg:text-xl">
            Get alerted when your link previews break—before your audience sees them.
            Monitor your key URLs 24/7 with automatic checks and instant alerts.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pricing">
              <Button size="lg" className="min-w-[200px]">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Try Free Check First
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            14-day free trial • No credit card required
          </p>

          {/* Visual Demo */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="rounded-2xl border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Preview Monitor</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  3 URLs monitored
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Broken */}
                <div className="flex items-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">yoursite.com/launch</p>
                    <p className="text-sm text-destructive">
                      Image returned 404 • Detected 2 hours ago
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Fix Now
                  </Button>
                </div>

                {/* Warning */}
                <div className="flex items-center gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">yoursite.com/blog/guide</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-500">
                      Title truncated on Twitter • Detected 6 hours ago
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>

                {/* Healthy */}
                <div className="flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">yoursite.com</p>
                    <p className="text-sm text-muted-foreground">
                      All platforms healthy • Checked 1 hour ago
                    </p>
                  </div>
                  <span className="text-sm text-success">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-b bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Previews break silently. You find out publicly.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A deploy moves your OG image. A CMS update clears your meta tags.
            A CDN expires your cached image. You don&apos;t know until someone
            screenshots your broken tweet and sends it to you.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>47% of product launches have preview issues in the first hour</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Check once. Monitor forever.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Set up monitoring in seconds. We&apos;ll watch your URLs around the clock
              and alert you the moment something breaks.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/20 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Three steps to peace of mind.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-6 text-lg font-semibold">Add your URLs</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Paste your important URLs or import from your sitemap. Name them
                for easy identification.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-6 text-lg font-semibold">We monitor 24/7</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our system checks your URLs daily (or hourly) and compares against
                the last known good state.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-6 text-lg font-semibold">Get alerted instantly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                When something breaks, you&apos;ll know within minutes via email, Slack,
                or Discord.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for moments that matter
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              When the stakes are high, monitoring pays for itself.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-2xl border bg-card p-8 shadow-sm"
              >
                <div className="text-4xl font-bold text-gradient">{useCase.stat}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {useCase.statLabel}
                </p>
                <h3 className="mt-6 text-lg font-semibold">{useCase.title}</h3>
                <p className="mt-2 text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Channels */}
      <section className="border-t bg-muted/20 px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Alerts where you already are
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Get notified through the channels you already use.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 rounded-xl border bg-card px-6 py-4 shadow-sm">
              <Mail className="h-6 w-6 text-muted-foreground" />
              <span className="font-medium">Email</span>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                All plans
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border bg-card px-6 py-4 shadow-sm">
              <Slack className="h-6 w-6 text-muted-foreground" />
              <span className="font-medium">Slack</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Team
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border bg-card px-6 py-4 shadow-sm">
              <Globe className="h-6 w-6 text-muted-foreground" />
              <span className="font-medium">Discord</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose your coverage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Monitoring is included in Pro and Team plans.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    <span className="text-primary">Pro</span>
                    <span className="ml-1 text-xs text-muted-foreground">$12/mo</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    <span className="text-primary">Team</span>
                    <span className="ml-1 text-xs text-muted-foreground">$29/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index !== comparisonData.length - 1 ? "border-b" : ""}
                  >
                    <td className="px-6 py-4 text-sm">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                      {row.free === "—" ? (
                        <span className="text-muted-foreground/50">—</span>
                      ) : typeof row.free === "boolean" ? (
                        row.free ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-success" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        <span className="font-medium">{row.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.team === "boolean" ? (
                        row.team ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        <span className="font-medium text-primary">{row.team}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg">
                View All Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t px-4 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">
            Stop finding out from your audience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Set up monitoring in 2 minutes. We&apos;ll handle the rest.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pricing">
              <Button size="lg">
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
