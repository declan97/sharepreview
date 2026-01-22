import Link from "next/link";
import { Check, X, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { type ComparisonPageContent } from "@/content/comparisons/data";
import { SEO } from "@/lib/constants";

interface ComparisonPageTemplateProps {
  content: ComparisonPageContent;
}

export function ComparisonPageTemplate({ content }: ComparisonPageTemplateProps) {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: content.title, url: `/compare/${content.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    author: {
      "@type": "Organization",
      name: SEO.siteName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      url: SEO.baseUrl,
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-green-500" />
      ) : (
        <X className="mx-auto h-5 w-5 text-red-500" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            {/* Status Banner */}
            {content.status === "discontinued" && content.statusMessage && (
              <div className="mb-8 flex items-center justify-center gap-2 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">{content.statusMessage}</span>
              </div>
            )}

            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-muted-foreground">
              Compare {SEO.siteName} with {content.competitorName} to find the
              best tool for your needs.
            </p>

            {/* Quick Verdict */}
            <div className="mx-auto mt-8 max-w-2xl rounded-xl border bg-card p-6">
              <h2 className="font-semibold">Quick Verdict</h2>
              <p className="mt-2 text-muted-foreground">{content.quickVerdict}</p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-primary">
                      {SEO.siteName}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-muted-foreground">
                      {content.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.features.map((feature) => (
                    <tr key={feature.name} className="border-b">
                      <td className="px-4 py-3">{feature.name}</td>
                      <td className="px-4 py-3 text-center">
                        {renderFeatureValue(feature.shareLint)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {renderFeatureValue(feature.competitor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why ShareLint */}
        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Why Use {SEO.siteName}?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {content.advantages.map((advantage) => (
                <div key={advantage.title} className="rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">{advantage.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {content.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">{content.ctaTitle}</h2>
            <p className="mt-4 text-muted-foreground">{content.ctaDescription}</p>
            <Link
              href={content.ctaHref}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {content.ctaButtonText} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Related Links */}
        {content.relatedLinks.length > 0 && (
          <section className="border-t px-4 py-12">
            <div className="container mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-lg font-semibold">
                Related Tools
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/50"
                  >
                    <span className="font-medium">{link.title}</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {link.description}
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
