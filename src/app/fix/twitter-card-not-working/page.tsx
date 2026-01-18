import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Twitter Card Not Working? Fix It in 5 Minutes (2024 Guide)",
  description:
    "Fix your Twitter card preview issues fast. Learn why your Twitter card image, title, or description isn't showing and get working solutions.",
  keywords: [
    "twitter card not working",
    "twitter card not showing",
    "fix twitter card",
    "twitter card validator",
    "twitter preview not working",
    "twitter:image not showing",
    "x card not working",
  ],
  openGraph: {
    title: "Twitter Card Not Working? Fix It in 5 Minutes",
    description:
      "Fix your Twitter/X card preview issues fast. Step-by-step solutions that actually work.",
    url: "https://sharelint.com/fix/twitter-card-not-working",
  },
  alternates: {
    canonical: "https://sharelint.com/fix/twitter-card-not-working",
  },
};

const commonProblems = [
  {
    problem: "Card not showing at all",
    causes: [
      "Missing twitter:card meta tag",
      "Invalid card type specified",
      "Page is blocked by robots.txt",
      "SSL/HTTPS issues",
    ],
    solution: `Add the required Twitter card meta tags:
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />`,
  },
  {
    problem: "Image not displaying",
    causes: [
      "Missing twitter:image tag",
      "Image URL is relative (needs absolute URL)",
      "Image is too small (min 300x157 for large cards)",
      "Image file is larger than 5MB",
      "Wrong image format",
    ],
    solution: `Ensure your image meets Twitter's requirements:
- Use absolute URL: https://yoursite.com/image.jpg
- Size: at least 300x157px (1200x628 recommended)
- Max file size: 5MB
- Formats: JPG, PNG, GIF, or WebP`,
  },
  {
    problem: "Wrong card type showing",
    causes: [
      "Incorrect twitter:card value",
      'Using "summary" when you want "summary_large_image"',
      "Twitter falling back to Open Graph",
    ],
    solution: `Set the correct card type:
<!-- For large image cards (most common) -->
<meta name="twitter:card" content="summary_large_image" />

<!-- For small square thumbnail -->
<meta name="twitter:card" content="summary" />`,
  },
  {
    problem: "Old preview still showing",
    causes: [
      "Twitter cached the old card (up to 7 days)",
      "CDN caching your page",
      "Browser cache showing stale preview",
    ],
    solution: `Force Twitter to refresh:
1. Add a query parameter: yoursite.com/page?v=2
2. Share the new URL
3. Or wait up to 7 days for cache to expire`,
  },
];

const faqItems = [
  {
    question: "Why is my Twitter card not showing an image?",
    answer:
      "The most common cause is a missing or incorrect twitter:image meta tag. Ensure you're using an absolute URL (starting with https://), the image is at least 300x157 pixels for summary_large_image cards, and the file is under 5MB.",
  },
  {
    question: "Does Twitter use Open Graph tags?",
    answer:
      "Yes, Twitter will fall back to Open Graph (og:) tags if Twitter-specific tags aren't present. However, for best results, include both twitter: and og: meta tags on your pages.",
  },
  {
    question: "How do I validate my Twitter card?",
    answer:
      "Twitter removed their public Card Validator tool in 2022. Use ShareLint to check your Twitter card preview - it shows exactly how your link will appear when shared on Twitter/X.",
  },
  {
    question: "Why does my card work on Facebook but not Twitter?",
    answer:
      "Twitter has different requirements than Facebook. Make sure you have the twitter:card meta tag (which Facebook doesn't need), and verify your image meets Twitter's size requirements (minimum 300x157 for large cards).",
  },
  {
    question: "How long does Twitter cache cards?",
    answer:
      "Twitter caches card data for approximately 7 days. To force a refresh, you can share a URL with a query parameter (e.g., ?v=2) which Twitter treats as a new URL.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Fix Twitter Card Not Working",
  description:
    "Step-by-step guide to fix Twitter/X card preview issues including missing images, wrong card types, and caching problems.",
  step: [
    {
      "@type": "HowToStep",
      name: "Add twitter:card meta tag",
      text: "Add <meta name='twitter:card' content='summary_large_image' /> to your page's <head> section",
    },
    {
      "@type": "HowToStep",
      name: "Add required meta tags",
      text: "Include twitter:title, twitter:description, and twitter:image meta tags",
    },
    {
      "@type": "HowToStep",
      name: "Verify image requirements",
      text: "Ensure image is at least 300x157 pixels, under 5MB, and accessible via absolute URL",
    },
    {
      "@type": "HowToStep",
      name: "Test your card",
      text: "Use a card validator tool to verify your Twitter card appears correctly",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FixTwitterCardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-red-500/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Troubleshooting Guide</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Twitter Card Not Working?
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Fix your Twitter/X card in the next 5 minutes. We&apos;ll show you
              exactly what&apos;s wrong and how to fix it.
            </p>
            <div className="mt-8">
              <Link href="/twitter-preview">
                <Button size="lg">
                  Check Your Twitter Card Now
                </Button>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Free instant diagnosis - no Twitter account needed
              </p>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="border-b bg-amber-500/10 px-4 py-6">
          <div className="container mx-auto max-w-4xl">
            <p className="text-sm">
              <strong>Note:</strong> Twitter removed their public Card Validator
              tool in 2022. Use ShareLint as an alternative to check your
              Twitter cards before sharing.
            </p>
          </div>
        </section>

        {/* Required Meta Tags */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Required Twitter Card Meta Tags</h2>
            <p className="mt-4 text-muted-foreground">
              Every Twitter card needs these meta tags in your{" "}
              <code className="rounded bg-muted px-1">&lt;head&gt;</code>:
            </p>
            <div className="mt-6 overflow-x-auto rounded-lg border bg-zinc-950 p-4">
              <pre className="text-sm text-zinc-100">
                <code>{`<!-- Required -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your page description" />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />

<!-- Optional but recommended -->
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorusername" />`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Common Problems */}
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Common Problems & Solutions</h2>
            <div className="mt-8 space-y-8">
              {commonProblems.map((item) => (
                <div key={item.problem} className="rounded-xl border bg-card p-6">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    {item.problem}
                  </h3>
                  <div className="mt-4">
                    <p className="font-medium text-muted-foreground">
                      Common causes:
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {item.causes.map((cause) => (
                        <li key={cause}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="flex items-center gap-2 font-medium text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Solution:
                    </p>
                    <div className="mt-2 overflow-x-auto rounded-lg bg-zinc-950 p-4">
                      <pre className="whitespace-pre-wrap text-sm text-zinc-100">
                        {item.solution}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Card Types */}
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Twitter Card Types</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary bg-primary/5 p-6">
                <h3 className="font-semibold">summary_large_image</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Large rectangular image above the title. Most popular choice
                  for articles, blog posts, and landing pages.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Image size: 1200 x 628 pixels (1.91:1 ratio)
                </p>
              </div>
              <div className="rounded-xl border p-6">
                <h3 className="font-semibold">summary</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Small square thumbnail next to title and description. Good for
                  apps, profiles, or when you want a compact look.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Image size: 144 x 144 pixels minimum (1:1 ratio)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">
              Test Your Twitter Card
            </h2>
            <p className="mt-4 text-muted-foreground">
              ShareLint shows you exactly how your link will appear on
              Twitter/X. Catch issues before your followers see them.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/twitter-preview">
                <Button size="lg">Check Twitter Card</Button>
              </Link>
              <Link href="/guides/twitter-card-size">
                <Button size="lg" variant="outline">
                  View Size Guide
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free. No signup required. Instant results.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-lg border p-6">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
