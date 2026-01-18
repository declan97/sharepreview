import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "Slack Link Preview Checker - Test How Your Links Unfurl",
  description:
    "Check how your links will appear when shared in Slack. See the unfurl preview, image, title, and description before you post to any channel.",
  keywords: [
    "slack link preview",
    "slack unfurl",
    "slack preview checker",
    "slack link unfurl",
    "slack share preview",
    "test slack link",
  ],
  openGraph: {
    title: "Slack Link Preview Checker",
    description:
      "Check how your links will appear when shared in Slack. See the unfurl preview before you post.",
    url: "https://sharelint.com/slack-preview",
  },
  alternates: {
    canonical: "https://sharelint.com/slack-preview",
  },
};

export default function SlackPreviewPage() {
  return (
    <PlatformLandingPage
      platform="slack"
      title="Slack Link Preview Checker"
      subtitle="See exactly how your links will unfurl when shared in Slack"
      description="Test your Slack link unfurls before posting to any channel. Check your Open Graph image, title, and description. Get instant feedback and fix issues with one click."
      features={[
        "See your exact Slack unfurl card",
        "Check image dimensions (recommended 1200x630)",
        "Verify title and description text",
        "Test how links appear in channels",
        "Get copy-paste meta tag fixes",
      ]}
      faq={[
        {
          question: "Why isn't my Slack link showing a preview?",
          answer:
            "Slack requires valid Open Graph meta tags (og:title, og:description, og:image) to generate link unfurls. Make sure your image URL is absolute and accessible publicly.",
        },
        {
          question: "How do I fix my Slack link unfurl?",
          answer:
            "Add the correct Open Graph meta tags to your page's <head> section. Slack uses og:title, og:description, and og:image. Use our tool to generate the correct tags and validate them.",
        },
        {
          question: "How do I clear Slack's link preview cache?",
          answer:
            "Slack caches unfurls for a period of time. You can try adding a query parameter to your URL (like ?v=2) to force Slack to fetch fresh metadata. For workspace admins, there's also an option in Slack settings.",
        },
        {
          question: "What size should my Slack preview image be?",
          answer:
            "Slack recommends images at least 250x250 pixels for small unfurls, but 1200x630 pixels (1.91:1 aspect ratio) works best for large, rich unfurls that display prominently in channels.",
        },
      ]}
    />
  );
}
