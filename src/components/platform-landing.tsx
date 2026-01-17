"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { UrlInput } from "./url-input";
import { PreviewCard } from "./preview-card";
import { ProblemList } from "./problem-list";
import { getPlatformSpec, getAllPlatforms } from "@/lib/platform-specs";
import { type MetaData, type ValidationIssue } from "@/lib/validators";
import { Check, TrendingUp, ArrowRight } from "lucide-react";
import Script from "next/script";

interface CheckResult {
  success: boolean;
  data?: MetaData;
  issues?: ValidationIssue[];
  error?: string;
  fetchTime?: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface WhyMattersItem {
  stat: string;
  description: string;
}

interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

interface PlatformLandingPageProps {
  platform: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  faq: FaqItem[];
  whyMatters?: {
    headline: string;
    points: WhyMattersItem[];
  };
  relatedLinks?: RelatedLink[];
}

export function PlatformLandingPage({
  platform,
  title,
  subtitle,
  description,
  features,
  faq,
  whyMatters,
  relatedLinks,
}: PlatformLandingPageProps) {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const platformSpec = getPlatformSpec(platform);
  const allPlatforms = getAllPlatforms();

  // Generate combined schema for SEO (FAQPage + SoftwareApplication)
  const combinedSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: title,
          description: description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    }),
    [title, description, faq]
  );

  const handleCheck = async (url: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Failed to check URL. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Combined Schema for SEO (SoftwareApplication + FAQPage) */}
      <Script
        id="combined-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
            {subtitle}
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <UrlInput onCheck={handleCheck} isLoading={isLoading} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to use. No signup required.
          </p>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="border-b bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {result.success && result.data ? (
              <div className="space-y-8">
                <ProblemList issues={result.issues || []} meta={result.data} />

                {/* Primary Platform Preview */}
                {platformSpec && (
                  <div>
                    <h2 className="mb-6 text-xl font-semibold">
                      {platformSpec.name} Preview
                    </h2>
                    <div className="max-w-xl">
                      <PreviewCard
                        meta={result.data}
                        platform={platformSpec}
                        issues={result.issues || []}
                      />
                    </div>
                  </div>
                )}

                {/* Other Platform Previews */}
                <div>
                  <h2 className="mb-6 text-xl font-semibold">
                    Other Platforms
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allPlatforms
                      .filter((p) => p.id !== platform)
                      .map((p) => (
                        <PreviewCard
                          key={p.id}
                          meta={result.data!}
                          platform={p}
                          issues={result.issues || []}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-6 text-center">
                <p className="text-destructive">
                  {result.error || "Failed to fetch URL"}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why This Matters Section */}
      {!result && whyMatters && (
        <section className="border-b bg-amber-50 px-4 py-12 dark:bg-amber-950/20">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-xl font-bold">{whyMatters.headline}</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {whyMatters.points.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                    {point.stat}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold">About This Tool</h2>
                <p className="mt-4 text-muted-foreground">{description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="mt-4 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Specs */}
      {!result && platformSpec && (
        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              {platformSpec.name} Link Preview Specifications
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Image Size</h3>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {platformSpec.imageWidth}x{platformSpec.imageHeight}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  pixels ({platformSpec.imageRatio} ratio)
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Title Length</h3>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {platformSpec.titleMaxLength}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  characters maximum
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold">Description</h3>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {platformSpec.descriptionMaxLength}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  characters shown
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Resources Section */}
      {!result && relatedLinks && relatedLinks.length > 0 && (
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Related Resources
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <h3 className="font-semibold group-hover:text-primary">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {link.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Platforms Section */}
      {!result && (
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Check Other Platforms
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {allPlatforms
                .filter((p) => p.id !== platform)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/${p.id}-preview`}
                    className="group rounded-xl border bg-card p-4 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="font-medium group-hover:text-primary">
                      {p.name}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Preview Checker
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}
