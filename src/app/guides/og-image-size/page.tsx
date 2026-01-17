import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "OG Image Size Guide 2024 - Perfect Dimensions for Every Platform",
  description:
    "The complete guide to Open Graph image sizes. Get the exact og:image dimensions for Facebook (1200x630), Twitter (1200x628), LinkedIn (1200x627), and more.",
  keywords: [
    "og image size",
    "open graph image size",
    "og:image dimensions",
    "social media image size",
    "facebook og image size",
    "twitter og image size",
    "linkedin image size",
  ],
  openGraph: {
    title: "OG Image Size Guide 2024 - Perfect Dimensions for Every Platform",
    description:
      "Get the exact og:image dimensions for Facebook, Twitter, LinkedIn, and Discord. Updated for 2024.",
    url: "https://sharepreview.com/guides/og-image-size",
  },
  alternates: {
    canonical: "https://sharepreview.com/guides/og-image-size",
  },
};

const platformSizes = [
  {
    platform: "Facebook",
    width: 1200,
    height: 630,
    ratio: "1.91:1",
    minWidth: 600,
    minHeight: 315,
    maxSize: "8 MB",
    formats: "JPG, PNG, GIF, WebP",
    notes: "Images smaller than 600x315 will display as a small thumbnail",
  },
  {
    platform: "Twitter / X",
    width: 1200,
    height: 628,
    ratio: "1.91:1",
    minWidth: 300,
    minHeight: 157,
    maxSize: "5 MB",
    formats: "JPG, PNG, GIF, WebP",
    notes: "For summary cards, use 1:1 ratio (144x144 to 4096x4096)",
  },
  {
    platform: "LinkedIn",
    width: 1200,
    height: 627,
    ratio: "1.91:1",
    minWidth: 1200,
    minHeight: 627,
    maxSize: "5 MB",
    formats: "JPG, PNG",
    notes: "LinkedIn requires exact minimum dimensions for best quality",
  },
  {
    platform: "Discord",
    width: 1200,
    height: 630,
    ratio: "1.91:1",
    minWidth: 300,
    minHeight: 157,
    maxSize: "8 MB",
    formats: "JPG, PNG, GIF, WebP",
    notes: "Small images appear as thumbnails on the right side",
  },
  {
    platform: "Slack",
    width: 1200,
    height: 630,
    ratio: "1.91:1",
    minWidth: 250,
    minHeight: 125,
    maxSize: "5 MB",
    formats: "JPG, PNG, GIF",
    notes: "Slack crops images that don't match the aspect ratio",
  },
];

const faqItems = [
  {
    question: "What is the best OG image size for all platforms?",
    answer:
      "The universal best size is 1200x630 pixels with a 1.91:1 aspect ratio. This works optimally on Facebook, Twitter, LinkedIn, Discord, and Slack without any cropping or quality loss.",
  },
  {
    question: "What happens if my OG image is too small?",
    answer:
      "If your image is below the minimum size (typically 600x315 for Facebook), platforms will either not display it at all, show a tiny thumbnail, or display a placeholder. This significantly reduces click-through rates.",
  },
  {
    question: "Should I use PNG or JPG for OG images?",
    answer:
      "Use JPG for photographs and images with many colors (smaller file size). Use PNG for graphics, logos, or images with text (sharper quality). Both work on all major platforms.",
  },
  {
    question: "How do I check if my OG image is working?",
    answer:
      "Use a link preview checker like SharePreview to see exactly how your image appears on each platform. This helps you catch size issues, cropping problems, and missing images before sharing.",
  },
  {
    question: "Why is my OG image not showing on Facebook?",
    answer:
      "Common reasons: the image URL is relative instead of absolute, the image is too small, the URL returns a 404, or Facebook has cached an old version. Use Facebook's Sharing Debugger to force a refresh.",
  },
];

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "OG Image Size Guide 2024 - Perfect Dimensions for Every Platform",
  description:
    "The complete guide to Open Graph image sizes for Facebook, Twitter, LinkedIn, Discord, and Slack.",
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

export default function OgImageSizeGuidePage() {
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
              OG Image Size Guide 2024
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The exact Open Graph image dimensions for Facebook, Twitter,
              LinkedIn, Discord, and Slack. Get it right the first time.
            </p>
            <div className="mt-8 rounded-xl border bg-primary/5 p-6">
              <p className="text-lg font-semibold">
                TL;DR: Use <span className="text-primary">1200 x 630 pixels</span>{" "}
                for all platforms
              </p>
              <p className="mt-2 text-muted-foreground">
                This size works perfectly on every major social platform without
                cropping.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">
              OG Image Sizes by Platform (2024)
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">Platform</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Recommended Size
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Aspect Ratio
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Max File Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platformSizes.map((platform) => (
                    <tr key={platform.platform} className="border-b">
                      <td className="px-4 py-3 font-medium">{platform.platform}</td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-muted px-2 py-1 text-sm">
                          {platform.width} x {platform.height}
                        </code>
                      </td>
                      <td className="px-4 py-3">{platform.ratio}</td>
                      <td className="px-4 py-3">{platform.maxSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Specs */}
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Detailed Specifications</h2>
            <div className="mt-8 grid gap-6">
              {platformSizes.map((platform) => (
                <div
                  key={platform.platform}
                  className="rounded-xl border bg-card p-6"
                >
                  <h3 className="text-xl font-semibold">{platform.platform}</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Recommended Size
                      </p>
                      <p className="font-medium">
                        {platform.width} x {platform.height} pixels
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Size</p>
                      <p className="font-medium">
                        {platform.minWidth} x {platform.minHeight} pixels
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Supported Formats
                      </p>
                      <p className="font-medium">{platform.formats}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Max File Size
                      </p>
                      <p className="font-medium">{platform.maxSize}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Note:</strong> {platform.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Set OG Image */}
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">How to Set Your OG Image</h2>
            <p className="mt-4 text-muted-foreground">
              Add these meta tags to your HTML{" "}
              <code className="rounded bg-muted px-1">&lt;head&gt;</code> section:
            </p>
            <div className="mt-6 overflow-x-auto rounded-lg border bg-zinc-950 p-4">
              <pre className="text-sm text-zinc-100">
                <code>{`<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:alt" content="Description of your image" />`}</code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Important:</strong> Always use an absolute URL (starting
              with https://) for the og:image value.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">
              Check Your OG Image Right Now
            </h2>
            <p className="mt-4 text-muted-foreground">
              Not sure if your OG image is set up correctly? Use SharePreview to
              see exactly how your link appears on every platform.
            </p>
            <div className="mt-8">
              <Link href="/">
                <Button size="lg">Check Your Link Preview</Button>
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
