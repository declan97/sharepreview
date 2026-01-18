import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fix Facebook Link Preview Not Showing - Complete Troubleshooting Guide",
  description:
    "Facebook link preview not working? Learn how to fix missing images, wrong titles, and broken Open Graph tags. Step-by-step solutions that actually work.",
  keywords: [
    "facebook link preview not showing",
    "facebook preview not working",
    "fix facebook link preview",
    "facebook og image not showing",
    "facebook share preview problem",
    "facebook debugger",
  ],
  openGraph: {
    title: "Fix Facebook Link Preview Not Showing",
    description:
      "Complete troubleshooting guide for Facebook link preview problems. Fix missing images and broken previews.",
    type: "article",
  },
  alternates: {
    canonical: "https://sharepreview.vercel.app/blog/fix-facebook-preview",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Fix Facebook Link Preview Not Showing",
  description:
    "Step-by-step guide to fix Facebook link preview issues including missing images, wrong titles, and broken meta tags.",
  step: [
    {
      "@type": "HowToStep",
      name: "Check your Open Graph meta tags",
      text: "Verify that your page has the required og:title, og:description, og:image, and og:url meta tags in the head section.",
    },
    {
      "@type": "HowToStep",
      name: "Validate image requirements",
      text: "Ensure your og:image is at least 600x315 pixels, uses an absolute URL, and is publicly accessible.",
    },
    {
      "@type": "HowToStep",
      name: "Use Facebook Sharing Debugger",
      text: "Enter your URL in Facebook's Sharing Debugger tool and click 'Scrape Again' to clear the cache.",
    },
    {
      "@type": "HowToStep",
      name: "Test and verify",
      text: "Share your link in a test post or use a preview tool to confirm the fix worked.",
    },
  ],
};

export default function FixFacebookPreviewPage() {
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
            <p className="text-sm font-medium text-primary">Troubleshooting</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Fix Facebook Link Preview Not Showing
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Your Facebook link preview is broken. Here&apos;s exactly how to fix it
              in 5 minutes or less.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="border-b bg-primary/5 px-4 py-8">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">Quick Fix</h2>
              <p className="mt-2 text-muted-foreground">
                Most Facebook preview issues are caused by{" "}
                <strong className="text-foreground">
                  missing or incorrect Open Graph meta tags
                </strong>
                . Add <code>og:title</code>, <code>og:description</code>,{" "}
                <code>og:image</code>, and <code>og:url</code> to your page&apos;s
                head section, then use Facebook&apos;s Sharing Debugger to refresh
                the cache.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground max-w-none">
              <h2>Why Is My Facebook Preview Not Working?</h2>
              <p>
                When you share a link on Facebook, the platform looks for Open
                Graph (OG) meta tags in your page&apos;s HTML. If these tags are
                missing, incorrect, or inaccessible, Facebook can&apos;t generate a
                proper preview.
              </p>
              <p>Here are the most common causes:</p>
              <ol>
                <li>Missing Open Graph meta tags</li>
                <li>Image URL is relative instead of absolute</li>
                <li>Image is too small (under 600x315 pixels)</li>
                <li>Image is behind authentication or blocked</li>
                <li>Facebook has cached an old/broken version</li>
                <li>SSL certificate issues on your site</li>
              </ol>

              <h2>Step 1: Add Required Open Graph Tags</h2>
              <p>
                Add these meta tags inside the <code>&lt;head&gt;</code> section
                of your HTML:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<head>
  <!-- Required OG Tags -->
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="A brief description of your page" />
  <meta property="og:image" content="https://yoursite.com/image.png" />
  <meta property="og:url" content="https://yoursite.com/page" />
  <meta property="og:type" content="website" />

  <!-- Recommended -->
  <meta property="og:site_name" content="Your Site Name" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</head>`}</code>
              </pre>

              <h2>Step 2: Fix Your OG Image</h2>
              <p>Your og:image must meet these requirements:</p>
              <ul>
                <li>
                  <strong>Absolute URL:</strong> Must start with{" "}
                  <code>https://</code> (not <code>/images/...</code>)
                </li>
                <li>
                  <strong>Minimum size:</strong> 600 x 315 pixels
                </li>
                <li>
                  <strong>Recommended size:</strong> 1200 x 630 pixels
                </li>
                <li>
                  <strong>Publicly accessible:</strong> No login required
                </li>
                <li>
                  <strong>File size:</strong> Under 8MB
                </li>
                <li>
                  <strong>Format:</strong> JPG, PNG, or GIF
                </li>
              </ul>

              <h3>Common Image Mistakes</h3>
              <div className="not-prose my-6 space-y-4">
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <p className="font-mono text-sm text-red-400">
                    ❌ Wrong: /images/og-image.png
                  </p>
                </div>
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                  <p className="font-mono text-sm text-green-400">
                    ✓ Correct: https://yoursite.com/images/og-image.png
                  </p>
                </div>
              </div>

              <h2>Step 3: Clear Facebook&apos;s Cache</h2>
              <p>
                Facebook caches link previews aggressively. Even after fixing
                your tags, the old preview may still show. Here&apos;s how to force
                a refresh:
              </p>
              <ol>
                <li>
                  Go to{" "}
                  <a
                    href="https://developers.facebook.com/tools/debug/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Facebook Sharing Debugger
                  </a>
                </li>
                <li>Enter your URL and click &quot;Debug&quot;</li>
                <li>
                  Click <strong>&quot;Scrape Again&quot;</strong> to fetch fresh data
                </li>
                <li>Check the preview shown—it should now be correct</li>
              </ol>

              <h2>Step 4: Verify the Fix</h2>
              <p>After clearing the cache, verify your changes:</p>
              <ul>
                <li>Share the link in a Facebook post (you can set it to &quot;Only Me&quot;)</li>
                <li>Check that the image, title, and description appear correctly</li>
                <li>Test on both desktop and mobile</li>
              </ul>

              <h2>Troubleshooting Specific Issues</h2>

              <h3>Preview shows but image is missing</h3>
              <ul>
                <li>Verify the image URL is accessible (paste it in a new browser tab)</li>
                <li>Check that your server isn&apos;t blocking Facebook&apos;s crawler</li>
                <li>Ensure the image is larger than 200x200 pixels</li>
                <li>Check your robots.txt isn&apos;t blocking the image</li>
              </ul>

              <h3>Wrong image is showing</h3>
              <ul>
                <li>Make sure og:image is the first image tag Facebook finds</li>
                <li>Use the Sharing Debugger to see which image Facebook detected</li>
                <li>Clear Facebook&apos;s cache with &quot;Scrape Again&quot;</li>
              </ul>

              <h3>Title or description is wrong</h3>
              <ul>
                <li>Check that og:title and og:description are set correctly</li>
                <li>Ensure tags are in the &lt;head&gt;, not &lt;body&gt;</li>
                <li>Verify no JavaScript is needed to render the tags</li>
              </ul>

              <h3>Preview works in Debugger but not when sharing</h3>
              <ul>
                <li>Wait a few minutes for Facebook&apos;s cache to propagate</li>
                <li>Try sharing in a private/incognito window</li>
                <li>Check if your page has redirect issues</li>
              </ul>

              <h2>Platform-Specific Meta Tags</h2>
              <p>
                For best results across all platforms, include both Open Graph
                and Twitter Card tags:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<!-- Open Graph (Facebook, LinkedIn, Discord) -->
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/image.png" />
<meta property="og:url" content="https://yoursite.com/page" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/image.png" />`}</code>
              </pre>
            </div>

            <div className="mt-12 rounded-xl border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold">
                Test Your Facebook Preview
              </h3>
              <p className="mt-2 text-muted-foreground">
                Check if your link preview is working correctly on Facebook and
                other platforms—all in one place.
              </p>
              <Link href="/facebook-preview" className="mt-6 inline-block">
                <Button size="lg">Check Facebook Preview</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FaqItem
                question="How long does it take for Facebook to update a link preview?"
                answer="After using the Sharing Debugger's 'Scrape Again' button, changes should appear immediately. However, previously shared posts will keep their old preview—only new shares will show the updated version."
              />
              <FaqItem
                question="Why does my preview work on other sites but not Facebook?"
                answer="Facebook has strict requirements for OG images (minimum 600x315 pixels) and may cache aggressively. Other platforms may be more lenient or have fresher caches."
              />
              <FaqItem
                question="Can I have different previews for different platforms?"
                answer="Yes! Use og: tags for Facebook/LinkedIn and twitter: tags for Twitter. Each platform will use its respective tags, allowing customized previews."
              />
              <FaqItem
                question="My image is the right size but still doesn't show. Why?"
                answer="Check if your server is blocking Facebook's crawler (User-Agent: facebookexternalhit). Also verify the image loads over HTTPS without certificate errors."
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
