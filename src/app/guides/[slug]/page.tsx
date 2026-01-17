import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/components/templates/guide-page-template";
import { getGuidePageBySlug, getAllGuideSlugs, guidePages } from "@/content/guides/data";
import { generateCanonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getGuidePageBySlug(slug);

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
      url: generateCanonical(`/guides/${slug}`),
      type: "article",
    },
    alternates: {
      canonical: generateCanonical(`/guides/${slug}`),
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getGuidePageBySlug(slug);

  if (!content) {
    notFound();
  }

  return <GuidePageTemplate content={content} />;
}
