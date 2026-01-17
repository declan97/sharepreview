import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "OG Image Size Guide 2026 - Optimal Dimensions for Every Platform",
  description:
    "The complete guide to Open Graph image sizes for Facebook, Twitter, LinkedIn, Discord, and Slack. Get the exact dimensions for perfect social media previews.",
  keywords: [
    "og image size",
    "open graph image size",
    "og image dimensions",
    "social media image size",
    "facebook image size",
    "twitter card image size",
    "linkedin image size",
  ],
  openGraph: {
    title: "OG Image Size Guide 2026 - Optimal Dimensions for Every Platform",
    description:
      "The complete guide to Open Graph image sizes for Facebook, Twitter, LinkedIn, Discord, and Slack.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "OG Image Size Guide 2026 - Optimal Dimensions for Every Platform",
  description:
    "The complete guide to Open Graph image sizes for Facebook, Twitter, LinkedIn, Discord, and Slack.",
  author: {
    "@type": "Organization",
    name: "SharePreview",
  },
  publisher: {
    "@type": "Organization",
    name: "SharePreview",
  },
  datePublished: "2026-01-01",
  dateModified: "2026-01-01",
};

export default function OgImageSizeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="flex flex-col">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-medium text-primary">Guide</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              OG Image Size Guide 2026
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The exact Open Graph image dimensions for every social platform—so
              your links always look perfect when shared.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="border-b bg-primary/5 px-4 py-8">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">Quick Answer</h2>
              <p className="mt-2 text-muted-foreground">
                The universal recommended OG image size is{" "}
                <strong className="text-foreground">1200 x 630 pixels</strong>{" "}
                (1.91:1 aspect ratio). This works well on Facebook, Twitter,
                LinkedIn, Discord, and Slack.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground max-w-none">
              <h2>Platform-by-Platform OG Image Sizes</h2>

              <h3>Facebook</h3>
              <ul>
                <li>
                  <strong>Recommended:</strong> 1200 x 630 pixels
                </li>
                <li>
                  <strong>Minimum:</strong> 600 x 315 pixels
                </li>
                <li>
                  <strong>Aspect Ratio:</strong> 1.91:1
                </li>
                <li>
                  <strong>Max File Size:</strong> 8MB
                </li>
              </ul>
              <p>
                Facebook displays link previews prominently in feeds. Images
                smaller than the minimum may appear blurry or be cropped
                unexpectedly.
              </p>

              <h3>Twitter / X</h3>
              <ul>
                <li>
                  <strong>Summary Card:</strong> 144 x 144 pixels (minimum)
                </li>
                <li>
                  <strong>Summary Large Image:</strong> 1200 x 628 pixels
                </li>
                <li>
                  <strong>Aspect Ratio:</strong> 1.91:1 (large) or 1:1 (summary)
                </li>
                <li>
                  <strong>Max File Size:</strong> 5MB
                </li>
              </ul>
              <p>
                Use <code>twitter:card</code> set to{" "}
                <code>summary_large_image</code> for the best visual impact.
              </p>

              <h3>LinkedIn</h3>
              <ul>
                <li>
                  <strong>Recommended:</strong> 1200 x 627 pixels
                </li>
                <li>
                  <strong>Minimum:</strong> 200 x 200 pixels
                </li>
                <li>
                  <strong>Aspect Ratio:</strong> 1.91:1
                </li>
              </ul>
              <p>
                LinkedIn uses Open Graph tags but may cache images aggressively.
                Use LinkedIn&apos;s Post Inspector to refresh cached previews.
              </p>

              <h3>Discord</h3>
              <ul>
                <li>
                  <strong>Recommended:</strong> 1200 x 630 pixels
                </li>
                <li>
                  <strong>Large Embeds:</strong> Displayed up to 400px wide
                </li>
                <li>
                  <strong>Aspect Ratio:</strong> 1.91:1 preferred
                </li>
              </ul>
              <p>
                Discord embeds are shown in a colored sidebar based on the
                theme color meta tag. High-resolution images scale down nicely.
              </p>

              <h3>Slack</h3>
              <ul>
                <li>
                  <strong>Recommended:</strong> 1200 x 630 pixels
                </li>
                <li>
                  <strong>Minimum for display:</strong> 250 x 250 pixels
                </li>
                <li>
                  <strong>Aspect Ratio:</strong> 1.91:1 for rich unfurls
                </li>
              </ul>
              <p>
                Slack unfurls can vary in size based on workspace settings. The
                1200x630 standard ensures good display across all scenarios.
              </p>

              <h2>Universal OG Image Best Practices</h2>
              <ol>
                <li>
                  <strong>Use 1200 x 630 pixels</strong> — This size works
                  across all major platforms.
                </li>
                <li>
                  <strong>Keep important content centered</strong> — Platforms
                  may crop edges. Keep text and logos in the safe center zone.
                </li>
                <li>
                  <strong>Use readable text</strong> — If your image includes
                  text, ensure it&apos;s large enough to read on mobile devices.
                </li>
                <li>
                  <strong>Optimize file size</strong> — Keep images under 1MB
                  for fast loading. Use JPEG for photos, PNG for graphics.
                </li>
                <li>
                  <strong>Test on all platforms</strong> — Use a preview tool to
                  verify your image displays correctly everywhere.
                </li>
              </ol>

              <h2>Required Meta Tags</h2>
              <p>
                Add these meta tags to your page&apos;s <code>&lt;head&gt;</code>{" "}
                section:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<meta property="og:image" content="https://yoursite.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Description of your image" />

<!-- For Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yoursite.com/og-image.png" />`}</code>
              </pre>

              <h2>Common Mistakes to Avoid</h2>
              <ul>
                <li>
                  <strong>Using relative URLs</strong> — Always use absolute
                  URLs (starting with https://)
                </li>
                <li>
                  <strong>Images behind authentication</strong> — Social
                  platforms can&apos;t fetch images that require login
                </li>
                <li>
                  <strong>Wrong aspect ratio</strong> — Images will be cropped
                  unpredictably if not 1.91:1
                </li>
                <li>
                  <strong>Missing og:image:width/height</strong> — These help
                  platforms render faster
                </li>
              </ul>

              <h2>Test Your OG Images</h2>
              <p>
                Before sharing your links, always test how they&apos;ll appear.
                Our free tool shows you previews on all major platforms
                instantly.
              </p>
            </div>

            <div className="mt-12 rounded-xl border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold">Check Your OG Image Now</h3>
              <p className="mt-2 text-muted-foreground">
                Enter any URL and see exactly how it will look on Facebook,
                Twitter, LinkedIn, Discord, and Slack.
              </p>
              <Link href="/" className="mt-6 inline-block">
                <Button size="lg">Check Your URL Free</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Schema Section */}
        <section className="border-t bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FaqItem
                question="What is the best OG image size for all platforms?"
                answer="1200 x 630 pixels with a 1.91:1 aspect ratio is the universal standard that works well on Facebook, Twitter, LinkedIn, Discord, and Slack."
              />
              <FaqItem
                question="Does OG image size affect SEO?"
                answer="While OG images don't directly affect search rankings, they significantly impact click-through rates from social media. Well-optimized images lead to more engagement and traffic."
              />
              <FaqItem
                question="What file format should I use for OG images?"
                answer="JPEG works best for photographs (smaller file size). PNG is better for graphics, logos, or images with text (sharper quality). WebP is also supported by most platforms."
              />
              <FaqItem
                question="How do I fix a cached OG image?"
                answer="Each platform has its own cache. Use Facebook's Sharing Debugger, Twitter's Card Validator, or LinkedIn's Post Inspector to force a refresh of cached images."
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </div>
  );
}
