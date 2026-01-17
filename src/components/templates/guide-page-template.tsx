import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { type GuidePageContent } from "@/content/guides/data";
import { SEO } from "@/lib/constants";

interface GuidePageTemplateProps {
  content: GuidePageContent;
}

export function GuidePageTemplate({ content }: GuidePageTemplateProps) {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: content.title, url: `/guides/${content.slug}` },
  ];

  const jsonLd = {
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
    datePublished: new Date().toISOString().split("T")[0],
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

      <article className="flex flex-col">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-medium text-primary">Guide</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {content.subtitle}
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="border-b bg-primary/5 px-4 py-8">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">{content.quickAnswer.title}</h2>
              <p className="mt-2 text-muted-foreground">
                {content.quickAnswer.content}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground max-w-none">
              {content.sections.map((section) => (
                <div key={section.heading} className="mb-8">
                  <h2>{section.heading}</h2>
                  <p>{section.content}</p>
                  {section.code && (
                    <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                      <code>{section.code}</code>
                    </pre>
                  )}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-12 rounded-xl border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold">{content.ctaTitle}</h3>
              <p className="mt-2 text-muted-foreground">{content.ctaDescription}</p>
              <Link href={content.ctaHref} className="mt-6 inline-block">
                <Button size="lg">{content.ctaButtonText}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {content.faq.map((item) => (
                <div key={item.question} className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        {content.relatedLinks.length > 0 && (
          <section className="border-t px-4 py-12">
            <div className="container mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-lg font-semibold">
                Related Resources
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </article>
    </>
  );
}
