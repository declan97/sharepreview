import { Metadata } from "next";
import { SEO, ROUTES } from "./constants";

// =============================================================================
// Types
// =============================================================================

interface BaseMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// =============================================================================
// Canonical URL Helper
// =============================================================================

/**
 * Generates a canonical URL for a given path
 */
export function generateCanonical(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO.baseUrl}${cleanPath}`;
}

// =============================================================================
// Base Metadata Generator
// =============================================================================

/**
 * Generates consistent metadata for all pages
 */
export function generateBaseMetadata({
  title,
  description,
  path,
  ogImage = SEO.defaultOgImage,
  noIndex = false,
  keywords = [],
}: BaseMetadataOptions): Metadata {
  const canonical = generateCanonical(path);
  const fullTitle = title === SEO.siteName ? title : `${title} | ${SEO.siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO.siteName,
      type: "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SEO.baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SEO.baseUrl}${ogImage}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// =============================================================================
// Structured Data Generators
// =============================================================================

/**
 * Generates BreadcrumbList schema for hierarchical pages
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SEO.baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generates FAQPage schema for FAQ sections
 */
export function generateFAQSchema(items: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generates Organization schema for the homepage
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: SEO.baseUrl,
    logo: `${SEO.baseUrl}/logo.png`,
    sameAs: [
      `https://twitter.com/${SEO.twitterHandle.replace("@", "")}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SEO.baseUrl}/support`,
    },
  };
}

/**
 * Generates WebApplication schema
 */
export function generateWebApplicationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SEO.siteName,
    url: SEO.baseUrl,
    description: SEO.defaultDescription,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Preview links on Facebook, Twitter, LinkedIn, and Discord",
      "Validate Open Graph meta tags",
      "Check Twitter Card implementation",
      "Get actionable fix recommendations",
    ],
  };
}

/**
 * Generates HowTo schema for guide pages
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string; image?: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

/**
 * Generates Article schema for blog posts
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  publishedTime: string,
  modifiedTime: string,
  authorName: string = SEO.siteName,
  image?: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO.baseUrl}/logo.png`,
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${SEO.baseUrl}${image}`,
      },
    }),
  };
}

/**
 * Generates SoftwareApplication comparison schema
 */
export function generateComparisonSchema(
  appName: string,
  competitorName: string,
  appFeatures: string[],
  competitorFeatures: string[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${appName} vs ${competitorName}`,
    description: `Compare ${appName} and ${competitorName} features, pricing, and capabilities.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: appName,
          applicationCategory: "DeveloperApplication",
          featureList: appFeatures,
        },
        {
          "@type": "SoftwareApplication",
          name: competitorName,
          applicationCategory: "DeveloperApplication",
          featureList: competitorFeatures,
        },
      ],
    },
  };
}
