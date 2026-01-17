import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonPageTemplate } from "@/components/templates/comparison-page-template";
import {
  getComparisonPageBySlug,
  getAllComparisonSlugs,
  comparisonPages,
} from "@/content/comparisons/data";
import { generateCanonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getComparisonPageBySlug(slug);

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
      url: generateCanonical(`/compare/${slug}`),
    },
    alternates: {
      canonical: generateCanonical(`/compare/${slug}`),
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getComparisonPageBySlug(slug);

  if (!content) {
    notFound();
  }

  return <ComparisonPageTemplate content={content} />;
}
