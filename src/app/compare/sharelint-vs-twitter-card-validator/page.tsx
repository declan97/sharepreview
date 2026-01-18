import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, AlertTriangle } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ShareLint vs Twitter Card Validator - Free Alternative",
  description:
    "Twitter Card Validator was discontinued. ShareLint is the free alternative for testing Twitter/X cards. Compare features and start testing your Twitter cards instantly.",
  keywords: [
    "twitter card validator alternative",
    "twitter card validator replacement",
    "twitter card validator discontinued",
    "twitter card tester",
    "sharelint vs twitter",
    "x card validator alternative",
    "twitter preview tool",
  ],
  openGraph: {
    title: "ShareLint vs Twitter Card Validator",
    description:
      "Twitter Card Validator was discontinued. Compare with ShareLint, the free alternative.",
    url: "https://sharelint.com/compare/sharelint-vs-twitter-card-validator",
  },
  alternates: {
    canonical: "https://sharelint.com/compare/sharelint-vs-twitter-card-validator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happened to Twitter Card Validator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Twitter (now X) discontinued their official Card Validator tool. It is no longer available or maintained. ShareLint now serves as the primary free alternative for validating Twitter cards.",
      },
    },
    {
      "@type": "Question",
      name: "Is ShareLint a good replacement for Twitter Card Validator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ShareLint offers all the functionality of the original Twitter Card Validator plus additional features like multi-platform preview (Facebook, LinkedIn, Discord), issue detection, and meta tag recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "Is ShareLint free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ShareLint offers a free tier that allows you to check Twitter card previews with no signup required. Premium features are available for heavy users.",
      },
    },
    {
      "@type": "Question",
      name: "Can I test Twitter summary_large_image cards with ShareLint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ShareLint supports all Twitter card types including summary, summary_large_image, player, and app cards. You can see exactly how your card will appear on Twitter/X.",
      },
    },
  ],
};

export default function ComparisonPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            {/* Alert Banner */}
            <div className="mb-8 flex items-center justify-center gap-2 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">
                Twitter Card Validator has been discontinued by Twitter/X
              </span>
            </div>

            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              ShareLint vs Twitter Card Validator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-muted-foreground">
              Twitter removed their Card Validator. Here&apos;s how ShareLint compares
              as the free alternative.
            </p>

            {/* Quick Verdict */}
            <div className="mx-auto mt-8 max-w-2xl rounded-xl border bg-card p-6">
              <h2 className="font-semibold">Quick Verdict</h2>
              <p className="mt-2 text-muted-foreground">
                Since Twitter discontinued their Card Validator, ShareLint is now the
                go-to free tool for testing Twitter cards. It offers everything the
                original did, plus previews for Facebook, LinkedIn, Discord, and Slack.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-primary">
                      ShareLint
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-muted-foreground">
                      Twitter Card Validator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">Available</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <X className="mx-auto h-5 w-5 text-red-500" />
                      <span className="text-xs text-muted-foreground">Discontinued</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Twitter/X card preview</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-muted-foreground" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Multi-platform preview</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                      <span className="text-xs text-muted-foreground">
                        5 platforms
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Twitter only
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Issue detection</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs text-muted-foreground">Limited</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Meta tag recommendations</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">No login required</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Required Twitter login
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Free to use</td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Check className="mx-auto h-5 w-5 text-muted-foreground" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why ShareLint */}
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Why Use ShareLint Instead?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Multi-Platform Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preview your links on Twitter/X, Facebook, LinkedIn, Discord, and
                  Slack all at once. No need to use multiple tools.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">No Login Required</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Unlike Twitter&apos;s validator which required a Twitter account,
                  ShareLint works instantly with no signup.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Actionable Recommendations</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get specific suggestions for fixing issues with your meta tags,
                  including copy-paste code snippets.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Actively Maintained</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  ShareLint is actively developed and updated to match platform
                  changes. Twitter&apos;s tool was abandoned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">
                  What happened to Twitter Card Validator?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Twitter (now X) discontinued their official Card Validator tool as
                  part of broader changes to their developer tools. The tool is no
                  longer available or maintained.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Is ShareLint a good replacement for Twitter Card Validator?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes. ShareLint offers all the functionality of the original
                  Twitter Card Validator plus additional features like multi-platform
                  preview, detailed issue detection, and meta tag recommendations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Is ShareLint free to use?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, ShareLint offers a free tier that allows you to check Twitter
                  card previews with no signup required. Premium features are available
                  for teams and heavy users.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Can I test summary_large_image cards with ShareLint?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, ShareLint supports all Twitter card types including summary,
                  summary_large_image, player, and app cards. You&apos;ll see exactly
                  how your card will appear on Twitter/X.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Try ShareLint Free</h2>
            <p className="mt-4 text-muted-foreground">
              See for yourself why ShareLint is the best Twitter Card Validator
              alternative. Check your first link in seconds.
            </p>
            <Link
              href="/twitter-preview"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Check Your Twitter Card <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section className="border-t px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-lg font-semibold">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/twitter-preview"
                className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/50"
              >
                <span className="font-medium">Twitter Preview</span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Test Twitter cards
                </p>
              </Link>
              <Link
                href="/facebook-preview"
                className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/50"
              >
                <span className="font-medium">Facebook Preview</span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Check OG tags
                </p>
              </Link>
              <Link
                href="/fix/twitter-card-not-working"
                className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/50"
              >
                <span className="font-medium">Fix Twitter Cards</span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Troubleshooting guide
                </p>
              </Link>
              <Link
                href="/guides/twitter-card-size"
                className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/50"
              >
                <span className="font-medium">Card Size Guide</span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Image specifications
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
