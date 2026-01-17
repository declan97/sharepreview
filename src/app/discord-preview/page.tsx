import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "Discord Embed Preview - Test Your Discord Link Embeds",
  description:
    "Check how your links will appear when shared on Discord. Preview your embeds, images, and metadata before sharing in channels.",
  keywords: [
    "discord embed preview",
    "discord link preview",
    "discord embed checker",
    "discord og image",
    "discord unfurl preview",
    "discord meta tags",
  ],
  openGraph: {
    title: "Discord Embed Preview Checker",
    description:
      "Check how your links will appear when shared on Discord. Test your embeds.",
    url: "https://sharepreview.com/discord-preview",
  },
};

export default function DiscordPreviewPage() {
  return (
    <PlatformLandingPage
      platform="discord"
      title="Discord Embed Preview Checker"
      subtitle="Test how your links appear in Discord channels"
      description="Preview your Discord link embeds before sharing. See exactly how your content will appear in servers and DMs with the correct image, title, and description."
      features={[
        "Preview Discord embed appearance",
        "Test large and small image modes",
        "Check embed color and styling",
        "Verify title and description",
        "Test across light and dark themes",
      ]}
      faq={[
        {
          question: "How does Discord display link previews?",
          answer:
            "Discord reads Open Graph meta tags to create link embeds. It shows a colored sidebar (from theme-color meta tag), title, description, and image. Large images display below the text, small images appear on the right.",
        },
        {
          question: "What image size should I use for Discord?",
          answer:
            "Discord displays images at various sizes depending on content. For large embeds, use 1200x630 pixels. Discord will show a thumbnail for smaller images. Maximum file size is 8MB.",
        },
        {
          question: "Can I customize the Discord embed color?",
          answer:
            "Yes! Add a theme-color meta tag to your page: <meta name=\"theme-color\" content=\"#7c3aed\">. This sets the colored sidebar on your Discord embed.",
        },
        {
          question: "Why isn't my Discord embed showing?",
          answer:
            "Make sure your page has proper Open Graph meta tags and is publicly accessible. Discord may also block embeds from certain domains. Check that your og:image URL is absolute and accessible.",
        },
      ]}
    />
  );
}
