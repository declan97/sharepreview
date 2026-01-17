import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FixPageTemplate } from "@/components/templates/fix-page-template";
import { getFixPageBySlug, getAllFixSlugs, fixPages } from "@/content/fix/data";
import { generateCanonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFixSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getFixPageBySlug(slug);

  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: generateCanonical(`/fix/${slug}`),
    },
    alternates: {
      canonical: generateCanonical(`/fix/${slug}`),
    },
  };
}

export default async function FixPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getFixPageBySlug(slug);

  if (!content) {
    notFound();
  }

  return <FixPageTemplate content={content} />;
}
