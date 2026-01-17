import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { type FixPageContent } from "@/content/fix/data";
import { SEO } from "@/lib/constants";

interface FixPageTemplateProps {
  content: FixPageContent;
}

export function FixPageTemplate({ content }: FixPageTemplateProps) {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Troubleshooting", url: "/fix" },
    { name: content.title, url: `/fix/${content.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Fix: ${content.title}`,
    description: content.metaDescription,
    step: content.problems.map((problem, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Fix: ${problem.problem}`,
      text: problem.solution,
    })),
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

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
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
              {content.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {content.heroSubtitle}
            </p>
            <div className="mt-8">
              <Link href={content.ctaHref}>
                <Button size="lg">{content.ctaButtonText}</Button>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Free instant diagnosis - see exactly what&apos;s wrong
              </p>
            </div>
          </div>
        </section>

        {/* Quick Fix */}
        <section className="border-b bg-primary/5 px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">Quick Fix</h2>
              <p className="mt-2 text-muted-foreground">{content.quickFix}</p>
            </div>
          </div>
        </section>

        {/* Problems & Solutions */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold">Common Problems & Solutions</h2>
            <div className="mt-8 space-y-8">
              {content.problems.map((item) => (
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

        {/* CTA */}
        <section className="border-t bg-primary/5 px-4 py-16">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">{content.ctaTitle}</h2>
            <p className="mt-4 text-muted-foreground">{content.ctaDescription}</p>
            <div className="mt-8">
              <Link href={content.ctaHref}>
                <Button size="lg">{content.ctaButtonText}</Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free. No signup required. Instant results.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {content.faq.map((item) => (
                <div key={item.question} className="rounded-lg border p-6">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        {content.relatedLinks.length > 0 && (
          <section className="border-t bg-muted/30 px-4 py-12">
            <div className="container mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-lg font-semibold">
                Related Resources
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
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
