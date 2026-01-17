import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "Twitter Card Validator - Test Your Twitter/X Link Previews",
  description:
    "Check how your links will appear when shared on Twitter/X. Test your Twitter cards, preview images, and metadata. Free Twitter card validator.",
  keywords: [
    "twitter card validator",
    "twitter preview checker",
    "twitter card preview",
    "x card validator",
    "twitter meta tags",
    "twitter:card",
  ],
  openGraph: {
    title: "Twitter Card Validator",
    description:
      "Check how your links will appear when shared on Twitter/X. Test your Twitter cards.",
    url: "https://sharepreview.com/twitter-preview",
  },
};

export default function TwitterPreviewPage() {
  return (
    <PlatformLandingPage
      platform="twitter"
      title="Twitter Card Validator"
      subtitle="Test how your links appear on Twitter/X"
      description="Validate your Twitter cards before tweeting. Check your summary card, large image card, and player cards. See exactly what your followers will see."
      features={[
        "Test summary and summary_large_image cards",
        "Verify twitter:card meta tag",
        "Check image size (1200x628 recommended)",
        "Preview title (70 characters max)",
        "Test twitter:site and twitter:creator tags",
      ]}
      faq={[
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
    />
  );
}
