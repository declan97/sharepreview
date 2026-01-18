import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "Facebook Link Preview Checker - Test How Your Links Look",
  description:
    "Check how your links will appear when shared on Facebook. See the preview image, title, and description. Fix issues before you post.",
  keywords: [
    "facebook link preview",
    "facebook preview checker",
    "facebook debugger",
    "og image checker",
    "facebook share preview",
    "test facebook link",
  ],
  openGraph: {
    title: "Facebook Link Preview Checker",
    description:
      "Check how your links will appear when shared on Facebook. See the preview before you post.",
    url: "https://sharepreview.vercel.app/facebook-preview",
  },
  alternates: {
    canonical: "https://sharepreview.vercel.app/facebook-preview",
  },
};

export default function FacebookPreviewPage() {
  return (
    <PlatformLandingPage
      platform="facebook"
      title="Facebook Link Preview Checker"
      subtitle="See exactly how your links will appear when shared on Facebook"
      description="Test your Facebook link previews before posting. Check your Open Graph image, title, and description. Get instant feedback and fix issues with one click."
      features={[
        "See your exact Facebook preview card",
        "Check image dimensions (1200x630 recommended)",
        "Verify title length (60 characters max)",
        "Test description preview (65 characters shown)",
        "Get copy-paste meta tag fixes",
      ]}
      whyMatters={{
        headline: "Why Facebook previews matter",
        points: [
          {
            stat: "2x",
            description: "Posts with optimized previews get 2x more engagement",
          },
          {
            stat: "85%",
            description: "of users scroll past posts with missing images",
          },
          {
            stat: "#1",
            description:
              "The preview is often the ONLY thing people see before clicking",
          },
        ],
      }}
      faq={[
        {
          question: "Why isn't my Facebook preview showing an image?",
          answer:
            "Facebook requires an og:image meta tag with an absolute URL. The image should be at least 600x315 pixels, but 1200x630 is recommended for high-resolution displays.",
        },
        {
          question: "How do I fix my Facebook link preview?",
          answer:
            "Add the correct Open Graph meta tags to your page's <head> section. You need og:title, og:description, og:image, and og:url at minimum. Use our tool to generate the correct tags.",
        },
        {
          question: "How do I clear Facebook's link preview cache?",
          answer:
            "Use Facebook's Sharing Debugger tool to scrape your URL again. This forces Facebook to fetch fresh meta tags from your page.",
        },
        {
          question: "What size should my Facebook preview image be?",
          answer:
            "The recommended size is 1200x630 pixels (1.91:1 aspect ratio). Minimum size is 600x315 pixels. Images smaller than this may not display properly.",
        },
      ]}
      relatedLinks={[
        {
          href: "/fix/facebook-preview-not-showing",
          title: "Fix Facebook Preview Issues",
          description: "Troubleshoot why your Facebook preview isn't showing correctly.",
        },
        {
          href: "/guides/og-image-size",
          title: "OG Image Size Guide",
          description: "Learn the optimal image sizes for all social platforms.",
        },
      ]}
    />
  );
}
