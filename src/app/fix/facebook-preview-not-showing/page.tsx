import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Facebook Preview Not Showing? Here's How to Fix It (2024)",
  description:
    "Fix your Facebook link preview in minutes. Learn why your image, title, or description isn't showing and get step-by-step solutions that work.",
  keywords: [
    "facebook preview not showing",
    "facebook link preview not working",
    "fix facebook preview",
    "facebook og image not showing",
    "facebook share image not working",
    "facebook debugger",
    "facebook preview missing",
  ],
  openGraph: {
    title: "Facebook Preview Not Showing? Here's How to Fix It",
    description:
      "Fix your Facebook link preview in minutes. Step-by-step solutions for missing images, titles, and descriptions.",
    url: "https://sharepreview.vercel.app/fix/facebook-preview-not-showing",
  },
  alternates: {
    canonical: "https://sharepreview.vercel.app/fix/facebook-preview-not-showing",
  },
};

const commonProblems = [
  {
    problem: "Image not showing",
    causes: [
      "Missing og:image meta tag",
      "Image URL is relative, not absolute",
      "Image is too small (min 600x315)",
      "Image URL returns 404 or is blocked",
      "HTTPS/HTTP mismatch",
    ],
    solution: `Add the og:image tag with an absolute URL:
<meta property="og:image" content="https://yoursite.com/image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`,
  },
  {
    problem: "Wrong image showing",
    causes: [
      "Facebook cached the old image",
      "Multiple og:image tags (using wrong one)",
      "Image changed but URL stayed the same",
    ],
    solution: `Use Facebook's Sharing Debugger to force a refresh:
1. Go to developers.facebook.com/tools/debug
2. Enter your URL
3. Click "Scrape Again"`,
  },
  {
    problem: "Title or description missing",
    causes: [
      "Missing og:title or og:description tags",
      "Tags are in the wrong place (must be in <head>)",
      "JavaScript-rendered content (Facebook can't see it)",
    ],
    solution: `Add these meta tags inside your <head>:
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your description here" />`,
  },
  {
    problem: "Preview shows but looks wrong",
    causes: [
      "Image aspect ratio is wrong (should be 1.91:1)",
      "Title is too long (truncated at ~60 chars)",
      "Description is too long (truncated at ~65 chars)",
    ],
    solution:
      "Use 1200x630 pixel images and keep titles under 60 characters, descriptions under 65 characters.",
  },
];

const faqItems = [
  {
    question: "Why isn't my Facebook link preview showing an image?",
    answer:
      "The most common cause is a missing or incorrect og:image meta tag. Facebook requires an absolute URL (starting with https://), and the image must be at least 600x315 pixels. Use our tool to check if your og:image tag is set correctly.",
  },
  {
    question: "How do I clear Facebook's link preview cache?",
    answer:
      "Use Facebook's Sharing Debugger at developers.facebook.com/tools/debug. Enter your URL and click 'Scrape Again'. This forces Facebook to fetch fresh data from your page. You may need to click it twice.",
  },
  {
    question: "Why is Facebook showing an old image?",
    answer:
      "Facebook caches link previews aggressively. Even after updating your og:image, the old image may show. Use the Sharing Debugger to force a refresh, or add a cache-busting query parameter to your image URL (e.g., ?v=2).",
  },
  {
    question: "Do I need both og:image and twitter:image?",
    answer:
      "For Facebook, you only need og:image. However, adding twitter:image ensures your previews look good on Twitter too. Many sites use both for cross-platform compatibility.",
  },
  {
    question: "Why does my preview work locally but not on Facebook?",
    answer:
      "Facebook's crawlers need to access your page from the public internet. If your site is on localhost or behind authentication, Facebook can't fetch the meta tags. Deploy to a public URL first.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Fix Facebook Link Preview Not Showing",
  description:
    "Step-by-step guide to fix Facebook link preview issues including missing images, wrong images, and missing titles.",
  step: [
    {
      "@type": "HowToStep",
      name: "Check your meta tags",
      text: "Verify that og:image, og:title, and og:description tags exist in your page's <head> section",
    },
    {
      "@type": "HowToStep",
      name: "Verify image URL",
      text: "Ensure your og:image uses an absolute URL starting with https:// and the image is at least 600x315 pixels",
    },
    {
      "@type": "HowToStep",
      name: "Clear Facebook cache",
      text: "Use Facebook's Sharing Debugger to force Facebook to fetch fresh data from your page",
    },
    {
      "@type": "HowToStep",
      name: "Test your preview",
      text: "Use a link preview checker to verify your changes before sharing",
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

export default function FixFacebookPreviewPage() {
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
              Facebook Preview Not Showing?
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Fix your Facebook link preview in the next 5 minutes. We&apos;ll
              diagnose the problem and show you exactly how to fix it.
            </p>
            <div className="mt-8">
              <Link href="/facebook-preview">
                <Button size="lg">
                  Check Your Link Now
                </Button>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Free instant diagnosis - see exactly what&apos;s wrong
              </p>
            </div>
          </div>
        </section>

        {/* Quick Checklist */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Quick Diagnostic Checklist</h2>
            <p className="mt-2 text-muted-foreground">
              Check these common issues first:
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Do you have an og:image meta tag?",
                "Is the image URL absolute (starts with https://)?",
                "Is the image at least 600x315 pixels?",
                "Can you access the image URL directly in a browser?",
                "Is the meta tag inside the <head> section?",
                "Have you cleared Facebook's cache?",
              ].map((item, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <input type="checkbox" className="h-5 w-5 rounded" />
                  <span>{item}</span>
                </label>
              ))}
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

        {/* Facebook Debugger */}
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">
              Using Facebook&apos;s Sharing Debugger
            </h2>
            <p className="mt-4 text-muted-foreground">
              Facebook&apos;s official tool can help clear cached previews:
            </p>
            <ol className="mt-6 list-inside list-decimal space-y-4 text-muted-foreground">
              <li>
                Go to{" "}
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  developers.facebook.com/tools/debug
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Enter your URL and click &quot;Debug&quot;</li>
              <li>
                Review any warnings or errors shown (they&apos;ll tell you
                what&apos;s wrong)
              </li>
              <li>
                Click &quot;Scrape Again&quot; to force Facebook to fetch fresh
                data
              </li>
              <li>
                If the preview still looks wrong, click &quot;Scrape Again&quot;
                one more time
              </li>
            </ol>
            <div className="mt-8 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
              <p className="text-sm">
                <strong>Pro tip:</strong> After making changes to your meta
                tags, always use the debugger to clear Facebook&apos;s cache.
                Otherwise, the old preview may continue to show for up to 7
                days.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">
              Still Having Issues?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Use ShareLint to get a detailed diagnosis of your link preview.
              We&apos;ll show you exactly what Facebook sees and highlight any
              issues.
            </p>
            <div className="mt-8">
              <Link href="/facebook-preview">
                <Button size="lg">Check Your Facebook Preview</Button>
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
