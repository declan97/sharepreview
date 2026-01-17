import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Twitter Card Tutorial - Complete Guide to Twitter/X Link Previews",
  description:
    "Learn how to set up Twitter Cards for perfect link previews. Step-by-step guide covering summary cards, large image cards, and troubleshooting common issues.",
  keywords: [
    "twitter card",
    "twitter card validator",
    "twitter preview",
    "twitter meta tags",
    "twitter:card",
    "summary_large_image",
    "x card preview",
  ],
  openGraph: {
    title: "Twitter Card Tutorial - Complete Guide",
    description:
      "Learn how to set up Twitter Cards for perfect link previews on Twitter/X.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Set Up Twitter Cards",
  description:
    "Complete tutorial on implementing Twitter Cards for better link previews on Twitter/X.",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose your card type",
      text: "Select between summary, summary_large_image, app, or player card types based on your content.",
    },
    {
      "@type": "HowToStep",
      name: "Add Twitter meta tags",
      text: "Add the required twitter:card, twitter:title, twitter:description, and twitter:image meta tags to your page.",
    },
    {
      "@type": "HowToStep",
      name: "Validate your card",
      text: "Use Twitter's Card Validator or a preview tool to verify your card displays correctly.",
    },
  ],
};

export default function TwitterCardTutorialPage() {
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
            <p className="text-sm font-medium text-primary">Tutorial</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Twitter Card Tutorial
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The complete guide to setting up Twitter Cards (now X Cards) for
              beautiful link previews that drive clicks.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="border-b bg-primary/5 px-4 py-8">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">Quick Setup</h2>
              <p className="mt-2 text-muted-foreground">
                For most websites, add these 4 meta tags to get a large image
                card on Twitter/X:
              </p>
              <pre className="mt-4 rounded bg-muted p-3 text-sm overflow-x-auto">
                <code>{`<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="https://yoursite.com/image.png" />`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground max-w-none">
              <h2>What Are Twitter Cards?</h2>
              <p>
                Twitter Cards are rich media attachments that appear when you
                share a link on Twitter (now X). Instead of just showing a plain
                URL, Twitter displays an image, title, and description—making
                your links much more clickable.
              </p>
              <p>
                Twitter Cards use special meta tags that you add to your
                website&apos;s HTML. When someone shares your link, Twitter reads
                these tags and generates the preview automatically.
              </p>

              <h2>Twitter Card Types</h2>
              <p>There are four types of Twitter Cards:</p>

              <h3>1. Summary Card</h3>
              <p>
                A compact card with a small square image (144x144 minimum),
                title, and description. Best for articles and blog posts where
                the image isn&apos;t the main focus.
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<meta name="twitter:card" content="summary" />`}</code>
              </pre>

              <h3>2. Summary Large Image Card (Recommended)</h3>
              <p>
                A card with a large, prominent image above the title and
                description. This is the most popular choice and gets the best
                engagement.
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<meta name="twitter:card" content="summary_large_image" />`}</code>
              </pre>

              <h3>3. App Card</h3>
              <p>
                Specifically for mobile apps. Shows app icon, name, and
                install/open buttons. Requires app ID configuration.
              </p>

              <h3>4. Player Card</h3>
              <p>
                For video and audio content. Allows inline playback within
                Twitter. Requires approval from Twitter.
              </p>

              <h2>Complete Twitter Card Setup</h2>
              <p>
                Here&apos;s the complete set of meta tags for a summary_large_image
                card:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<head>
  <!-- Required Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Page Title (70 chars max)" />
  <meta name="twitter:description" content="Your description (200 chars max)" />
  <meta name="twitter:image" content="https://yoursite.com/image.png" />

  <!-- Optional but Recommended -->
  <meta name="twitter:site" content="@YourTwitterHandle" />
  <meta name="twitter:creator" content="@AuthorHandle" />
  <meta name="twitter:image:alt" content="Image description for accessibility" />
</head>`}</code>
              </pre>

              <h2>Image Requirements</h2>
              <p>Twitter has specific requirements for card images:</p>

              <h3>Summary Large Image Card</h3>
              <ul>
                <li>
                  <strong>Minimum:</strong> 300 x 157 pixels
                </li>
                <li>
                  <strong>Recommended:</strong> 1200 x 628 pixels
                </li>
                <li>
                  <strong>Maximum file size:</strong> 5MB
                </li>
                <li>
                  <strong>Aspect ratio:</strong> 1.91:1
                </li>
                <li>
                  <strong>Formats:</strong> JPG, PNG, WEBP, GIF
                </li>
              </ul>

              <h3>Summary Card (Small Image)</h3>
              <ul>
                <li>
                  <strong>Minimum:</strong> 144 x 144 pixels
                </li>
                <li>
                  <strong>Recommended:</strong> 400 x 400 pixels
                </li>
                <li>
                  <strong>Aspect ratio:</strong> 1:1
                </li>
              </ul>

              <h2>Twitter Cards + Open Graph</h2>
              <p>
                Good news: Twitter will fall back to Open Graph tags if Twitter-specific
                tags are missing. You can use both for maximum compatibility:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/image.png" />
<meta property="og:url" content="https://yoursite.com/page" />

<!-- Twitter-specific (overrides OG if present) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@YourHandle" />

<!-- Twitter will use og:title, og:description, og:image if
     twitter:title, twitter:description, twitter:image are not set -->`}</code>
              </pre>

              <h2>How to Test Your Twitter Card</h2>
              <p>
                Twitter&apos;s official Card Validator has been deprecated, but you
                can still test your cards:
              </p>
              <ol>
                <li>
                  <strong>Use a preview tool:</strong> Our tool shows exactly
                  how your link will appear on Twitter before you post.
                </li>
                <li>
                  <strong>Tweet to yourself:</strong> Post a link (can be in a
                  private account or deleted after testing).
                </li>
                <li>
                  <strong>Check the meta tags:</strong> View your page source
                  and verify the twitter: tags are present.
                </li>
              </ol>

              <h2>Troubleshooting Common Issues</h2>

              <h3>Card not showing at all</h3>
              <ul>
                <li>
                  Verify <code>twitter:card</code> meta tag is present
                </li>
                <li>Check that meta tags are in the &lt;head&gt;, not &lt;body&gt;</li>
                <li>Ensure your page is publicly accessible (no auth required)</li>
                <li>Check robots.txt isn&apos;t blocking Twitterbot</li>
              </ul>

              <h3>Image not appearing</h3>
              <ul>
                <li>Use an absolute URL (starting with https://)</li>
                <li>Verify the image is larger than the minimum size</li>
                <li>Check that the image URL is accessible without login</li>
                <li>Ensure the image loads over HTTPS</li>
              </ul>

              <h3>Wrong image showing</h3>
              <ul>
                <li>Twitter caches cards—it may take time to update</li>
                <li>Make sure twitter:image points to the correct URL</li>
                <li>Try adding a query parameter to force a refresh: ?v=2</li>
              </ul>

              <h3>Title or description truncated</h3>
              <ul>
                <li>Keep titles under 70 characters</li>
                <li>Keep descriptions under 200 characters</li>
                <li>Put the most important info at the beginning</li>
              </ul>

              <h2>Best Practices for Twitter Cards</h2>
              <ol>
                <li>
                  <strong>Use summary_large_image</strong> — Large images get
                  significantly more engagement than small ones.
                </li>
                <li>
                  <strong>Design for the crop</strong> — Twitter may crop your
                  image differently on mobile vs desktop. Keep important content
                  centered.
                </li>
                <li>
                  <strong>Write compelling titles</strong> — You have 70
                  characters. Make them count. Front-load the important info.
                </li>
                <li>
                  <strong>Add your @handle</strong> — Include twitter:site to
                  get attribution and build followers.
                </li>
                <li>
                  <strong>Test before sharing</strong> — Always preview your
                  cards before important posts.
                </li>
              </ol>

              <h2>Framework-Specific Implementation</h2>

              <h3>Next.js</h3>
              <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// app/page.tsx or pages/index.tsx
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Your Title',
    description: 'Your description',
    images: ['https://yoursite.com/image.png'],
    site: '@YourHandle',
  },
};`}</code>
              </pre>

              <h3>WordPress</h3>
              <p>
                Use a plugin like Yoast SEO or RankMath, which automatically
                generates Twitter Card tags from your post content.
              </p>

              <h3>Plain HTML</h3>
              <p>
                Add the meta tags directly to your HTML &lt;head&gt; section as
                shown in the examples above.
              </p>
            </div>

            <div className="mt-12 rounded-xl border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold">Test Your Twitter Card</h3>
              <p className="mt-2 text-muted-foreground">
                See exactly how your link will appear on Twitter/X before you
                post. Check all platforms at once.
              </p>
              <Link href="/twitter-preview" className="mt-6 inline-block">
                <Button size="lg">Check Twitter Preview</Button>
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
                question="Is the Twitter Card Validator still working?"
                answer="Twitter's official Card Validator has limited functionality now. The best way to test cards is to use a third-party preview tool or post a test tweet. Our tool shows accurate Twitter card previews instantly."
              />
              <FaqItem
                question="How long does Twitter cache cards?"
                answer="Twitter caches card data for about 7 days. To force an update, you can try adding a query parameter to your URL (like ?v=2) or wait for the cache to expire. Previously shared tweets will keep their old card."
              />
              <FaqItem
                question="Do I need both OG tags and Twitter tags?"
                answer="Not necessarily. Twitter falls back to OG tags if Twitter-specific tags aren't present. However, using both gives you more control—you can have different titles or images for Twitter vs Facebook."
              />
              <FaqItem
                question="Why does my card look different on mobile vs desktop?"
                answer="Twitter renders cards differently based on device and context (timeline vs expanded view). Large image cards may be cropped to different aspect ratios. Always test on both platforms and keep important content in the center."
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
