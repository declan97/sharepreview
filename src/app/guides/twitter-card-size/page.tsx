import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Twitter Card Size Guide 2024 - Image Dimensions for X Cards",
  description:
    "Get the exact Twitter card image sizes. Summary card: 144x144 (1:1). Summary large image: 1200x628 (1.91:1). Complete guide with examples.",
  keywords: [
    "twitter card size",
    "twitter card image size",
    "twitter card dimensions",
    "x card size",
    "summary_large_image size",
    "twitter:image size",
    "twitter card image dimensions",
  ],
  openGraph: {
    title: "Twitter Card Size Guide 2024 - Image Dimensions for X Cards",
    description:
      "Get the exact Twitter/X card image sizes for summary and large image cards. Updated for 2024.",
    url: "https://sharepreview.com/guides/twitter-card-size",
  },
  alternates: {
    canonical: "https://sharepreview.com/guides/twitter-card-size",
  },
};

const cardTypes = [
  {
    type: "summary_large_image",
    name: "Summary Card with Large Image",
    description: "Large rectangular image above the title. Most common type.",
    width: 1200,
    height: 628,
    ratio: "1.91:1",
    minWidth: 300,
    minHeight: 157,
    maxSize: "5 MB",
    best: true,
  },
  {
    type: "summary",
    name: "Summary Card",
    description: "Small square thumbnail next to the title and description.",
    width: 144,
    height: 144,
    ratio: "1:1",
    minWidth: 144,
    minHeight: 144,
    maxSize: "5 MB",
    best: false,
  },
  {
    type: "player",
    name: "Player Card",
    description: "For video/audio content. Requires Twitter approval.",
    width: 1200,
    height: 628,
    ratio: "1.91:1",
    minWidth: 262,
    minHeight: 262,
    maxSize: "5 MB",
    best: false,
  },
  {
    type: "app",
    name: "App Card",
    description: "For mobile app downloads. Shows app icon and install button.",
    width: 800,
    height: 418,
    ratio: "1.91:1",
    minWidth: 800,
    minHeight: 418,
    maxSize: "1 MB",
    best: false,
  },
];

const faqItems = [
  {
    question: "What is the best Twitter card size?",
    answer:
      "For summary_large_image cards (most common), use 1200x628 pixels. For summary cards with a square thumbnail, use at least 144x144 pixels, though 400x400+ is recommended for retina displays.",
  },
  {
    question: "What is the difference between summary and summary_large_image?",
    answer:
      "summary shows a small square thumbnail (1:1 ratio) next to your title. summary_large_image shows a large rectangular image (1.91:1 ratio) above the title. Most websites use summary_large_image for better visibility.",
  },
  {
    question: "Why is my Twitter card image not showing?",
    answer:
      "Common causes: missing twitter:card meta tag, image URL is relative instead of absolute, image is too small, or the image URL returns a 404. Use a Twitter card validator to diagnose the issue.",
  },
  {
    question: "How long does Twitter cache card images?",
    answer:
      "Twitter caches card data for approximately 7 days. To refresh, you can try adding a query parameter to your URL (e.g., ?v=2) or wait for the cache to expire naturally.",
  },
  {
    question: "Can I use the same image for Twitter and Facebook?",
    answer:
      "Yes! Both platforms support the 1.91:1 aspect ratio. Use 1200x630 pixels and it will work great on both Twitter (cropped slightly) and Facebook.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Twitter Card Size Guide 2024 - Image Dimensions for X Cards",
  description:
    "The complete guide to Twitter/X card image sizes for all card types.",
  author: {
    "@type": "Organization",
    name: "SharePreview",
  },
  publisher: {
    "@type": "Organization",
    name: "SharePreview",
    url: "https://sharepreview.com",
  },
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
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

export default function TwitterCardSizeGuidePage() {
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
        <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Twitter Card Size Guide 2024
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The exact image dimensions for Twitter/X cards. Get perfect
              previews for summary, large image, player, and app cards.
            </p>
            <div className="mt-8 rounded-xl border bg-primary/5 p-6">
              <p className="text-lg font-semibold">
                Most popular:{" "}
                <span className="text-primary">1200 x 628 pixels</span> for
                summary_large_image
              </p>
              <p className="mt-2 text-muted-foreground">
                This is the recommended size for the large image card type that
                most websites use.
              </p>
            </div>
          </div>
        </section>

        {/* Card Types */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Twitter Card Types & Sizes</h2>
            <div className="mt-8 grid gap-6">
              {cardTypes.map((card) => (
                <div
                  key={card.type}
                  className={`rounded-xl border p-6 ${
                    card.best ? "border-primary bg-primary/5" : "bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{card.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-2 py-0.5">
                          twitter:card=&quot;{card.type}&quot;
                        </code>
                      </p>
                    </div>
                    {card.best && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-muted-foreground">{card.description}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Recommended Size
                      </p>
                      <p className="font-semibold">
                        {card.width} x {card.height}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aspect Ratio</p>
                      <p className="font-semibold">{card.ratio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Size</p>
                      <p className="font-semibold">
                        {card.minWidth} x {card.minHeight}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max File Size</p>
                      <p className="font-semibold">{card.maxSize}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meta Tags */}
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Required Twitter Card Meta Tags</h2>
            <p className="mt-4 text-muted-foreground">
              Add these tags to your HTML{" "}
              <code className="rounded bg-muted px-1">&lt;head&gt;</code> for a
              large image card:
            </p>
            <div className="mt-6 overflow-x-auto rounded-lg border bg-zinc-950 p-4">
              <pre className="text-sm text-zinc-100">
                <code>{`<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your page description" />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />
<meta name="twitter:site" content="@yourusername" />`}</code>
              </pre>
            </div>

            <h3 className="mt-8 text-xl font-semibold">
              Twitter Falls Back to Open Graph
            </h3>
            <p className="mt-2 text-muted-foreground">
              If Twitter-specific tags aren&apos;t present, Twitter will use your
              Open Graph (og:) tags instead. However, for best results, always
              include both.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">
              Test Your Twitter Card Now
            </h2>
            <p className="mt-4 text-muted-foreground">
              See exactly how your link will appear when shared on Twitter/X.
              Catch size issues before your followers see them.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/twitter-preview">
                <Button size="lg">Check Twitter Card</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Check All Platforms
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free. No signup required. Results in 2 seconds.
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
