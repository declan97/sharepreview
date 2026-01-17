import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "Twitter Card Validator - Free Twitter/X Preview Checker | SharePreview",
  description:
    "Free Twitter card validator since Twitter removed theirs. Check how your links appear on Twitter/X. Test Twitter cards, preview images, and meta tags instantly.",
  keywords: [
    "twitter card validator",
    "twitter card validator alternative",
    "twitter preview checker",
    "twitter card preview",
    "x card validator",
    "twitter card tester",
    "twitter meta tags",
    "twitter:card",
  ],
  openGraph: {
    title: "Twitter Card Validator - Free Alternative",
    description:
      "Free Twitter card validator since Twitter removed theirs. Check how your links appear on Twitter/X instantly.",
    url: "https://sharepreview.com/twitter-preview",
  },
  alternates: {
    canonical: "https://sharepreview.com/twitter-preview",
  },
};

export default function TwitterPreviewPage() {
  return (
    <PlatformLandingPage
      platform="twitter"
      title="Twitter Card Validator"
      subtitle="Free Twitter/X card validator since Twitter removed theirs"
      description="Twitter removed their Card Validator tool. SharePreview is now the go-to replacement for validating your Twitter cards. Check your summary card, large image card, and see exactly what your followers will see before tweeting."
      features={[
        "Free alternative to Twitter's removed Card Validator",
        "Test summary and summary_large_image cards",
        "Verify twitter:card meta tag",
        "Check image size (1200x628 recommended)",
        "Preview title (70 characters max)",
      ]}
      whyMatters={{
        headline: "Why Twitter card previews matter",
        points: [
          {
            stat: "150%",
            description:
              "Tweets with rich cards get 150% more retweets than text-only",
          },
          {
            stat: "40%",
            description: "higher click-through rate with optimized card images",
          },
          {
            stat: "7 days",
            description:
              "Twitter caches cards for up to 7 days - get it right the first time",
          },
        ],
      }}
      faq={[
        {
          question: "What happened to Twitter's Card Validator?",
          answer:
            "Twitter (now X) discontinued their official Card Validator tool. SharePreview now serves as the primary free alternative for testing how your links will appear when shared on Twitter/X.",
        },
        {
          question: "What Twitter card types are there?",
          answer:
            "Twitter supports summary (small square image), summary_large_image (large rectangular image), player (video/audio), and app (mobile app) card types. Most websites use summary_large_image.",
        },
        {
          question: "Why isn't my Twitter card showing?",
          answer:
            "Make sure you have the twitter:card meta tag set to a valid type. Also check that twitter:title and twitter:image are set. Twitter will fall back to Open Graph tags if Twitter-specific tags aren't present.",
        },
        {
          question: "What size should Twitter card images be?",
          answer:
            "For summary_large_image cards, use 1200x628 pixels (1.91:1 ratio). For summary cards, use 144x144 to 4096x4096 pixels (1:1 ratio). Images must be less than 5MB.",
        },
        {
          question: "How do I refresh my Twitter card cache?",
          answer:
            "Twitter caches cards for about 7 days. You can try sharing the URL with a query parameter (e.g., ?v=2) to force a refresh, or wait for the cache to expire.",
        },
      ]}
      relatedLinks={[
        {
          href: "/fix/twitter-card-not-working",
          title: "Fix Twitter Card Issues",
          description: "Troubleshoot why your Twitter card isn't displaying correctly.",
        },
        {
          href: "/guides/twitter-card-size",
          title: "Twitter Card Size Guide",
          description: "Complete guide to Twitter card image sizes and formats.",
        },
      ]}
    />
  );
}
