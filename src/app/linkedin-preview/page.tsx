import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform-landing";

export const metadata: Metadata = {
  title: "LinkedIn Post Preview - Check Your LinkedIn Link Previews",
  description:
    "See how your links will appear when shared on LinkedIn. Test your Open Graph images, titles, and descriptions before posting.",
  keywords: [
    "linkedin post preview",
    "linkedin link preview",
    "linkedin preview checker",
    "linkedin og image",
    "linkedin share preview",
    "linkedin meta tags",
  ],
  openGraph: {
    title: "LinkedIn Post Preview Checker",
    description:
      "See how your links will appear when shared on LinkedIn. Test before you post.",
    url: "https://sharepreview.com/linkedin-preview",
  },
};

export default function LinkedInPreviewPage() {
  return (
    <PlatformLandingPage
      platform="linkedin"
      title="LinkedIn Post Preview Checker"
      subtitle="See how your links look when shared on LinkedIn"
      description="Preview your LinkedIn link cards before posting. Check that your professional content looks perfect with the right image, title, and description."
      features={[
        "Preview your LinkedIn link card",
        "Verify image dimensions (1200x627 recommended)",
        "Check title display (70 characters shown)",
        "Test description preview",
        "Ensure professional appearance",
      ]}
      faq={[
        {
          question: "What image size does LinkedIn use for link previews?",
          answer:
            "LinkedIn recommends 1200x627 pixels for link preview images. The aspect ratio is 1.91:1. Images should be high quality for professional appearance.",
        },
        {
          question: "Why isn't my LinkedIn preview updating?",
          answer:
            "LinkedIn caches link previews aggressively. Use LinkedIn's Post Inspector tool to clear the cache. You can also try adding a query parameter to your URL to force a refresh.",
        },
        {
          question: "Does LinkedIn use Open Graph tags?",
          answer:
            "Yes, LinkedIn reads Open Graph meta tags (og:title, og:description, og:image) for link previews. Make sure these tags are properly set in your page's <head> section.",
        },
        {
          question: "How do I make my LinkedIn preview look professional?",
          answer:
            "Use a high-quality image at 1200x627 pixels, keep your title concise and compelling, and write a clear description. Avoid clickbait and ensure your branding is consistent.",
        },
      ]}
    />
  );
}
