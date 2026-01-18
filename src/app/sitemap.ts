import { MetadataRoute } from "next";
import { getAllFixSlugs } from "@/content/fix/data";
import { getAllGuideSlugs } from "@/content/guides/data";
import { getAllComparisonSlugs } from "@/content/comparisons/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app";

  // Static fix page slugs (have their own static pages)
  const staticFixSlugs = ["facebook-preview-not-showing", "twitter-card-not-working"];

  // Static guide slugs (have their own static pages)
  const staticGuideSlugs = ["og-image-size", "twitter-card-size"];

  // Static comparison slugs (have their own static pages)
  const staticComparisonSlugs = ["sharelint-vs-twitter-card-validator"];

  // Generate dynamic fix page entries
  const dynamicFixPages = getAllFixSlugs()
    .filter((slug) => !staticFixSlugs.includes(slug))
    .map((slug) => ({
      url: `${baseUrl}/fix/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  // Generate dynamic guide page entries
  const dynamicGuidePages = getAllGuideSlugs()
    .filter((slug) => !staticGuideSlugs.includes(slug))
    .map((slug) => ({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  // Generate dynamic comparison page entries
  const dynamicComparisonPages = getAllComparisonSlugs()
    .filter((slug) => !staticComparisonSlugs.includes(slug))
    .map((slug) => ({
      url: `${baseUrl}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Platform preview pages (high priority - main tool pages)
    {
      url: `${baseUrl}/facebook-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/twitter-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/linkedin-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/discord-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/slack-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Static guide pages
    {
      url: `${baseUrl}/guides/og-image-size`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/twitter-card-size`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Dynamic guide pages
    ...dynamicGuidePages,

    // Static comparison pages
    {
      url: `${baseUrl}/compare/sharelint-vs-twitter-card-validator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Dynamic comparison pages
    ...dynamicComparisonPages,

    // Static fix/troubleshooting pages
    {
      url: `${baseUrl}/fix/facebook-preview-not-showing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fix/twitter-card-not-working`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Dynamic fix pages
    ...dynamicFixPages,

    // Blog posts (SEO content)
    {
      url: `${baseUrl}/blog/og-image-size-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/fix-facebook-preview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/twitter-card-tutorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // User pages (noindex in production, but included for completeness)
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
