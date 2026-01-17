import { ROUTES } from "@/lib/constants";

export interface ComparisonPageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  competitorName: string;
  status: "discontinued" | "active" | "limited";
  statusMessage?: string;
  quickVerdict: string;
  features: {
    name: string;
    sharePreview: string | boolean;
    competitor: string | boolean;
  }[];
  advantages: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    href: string;
    title: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaHref: string;
}

export const comparisonPages: ComparisonPageContent[] = [
  {
    slug: "sharepreview-vs-facebook-debugger",
    title: "SharePreview vs Facebook Sharing Debugger",
    metaTitle: "SharePreview vs Facebook Sharing Debugger - Comparison",
    metaDescription:
      "Compare SharePreview with Facebook's Sharing Debugger. See which tool is better for checking link previews and fixing Open Graph issues.",
    keywords: [
      "sharepreview vs facebook debugger",
      "facebook sharing debugger alternative",
      "facebook debugger comparison",
      "og debugger alternative",
      "social preview tools",
    ],
    competitorName: "Facebook Sharing Debugger",
    status: "active",
    quickVerdict:
      "Facebook's Debugger is great for Facebook-specific debugging but only works for one platform. SharePreview shows previews across 5 platforms at once, making it faster for multi-platform validation.",
    features: [
      {
        name: "Available without login",
        sharePreview: true,
        competitor: "Requires Facebook account",
      },
      {
        name: "Facebook preview",
        sharePreview: true,
        competitor: true,
      },
      {
        name: "Twitter/X preview",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "LinkedIn preview",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "Discord preview",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "Clear Facebook cache",
        sharePreview: "Use FB Debugger",
        competitor: true,
      },
      {
        name: "Issue detection",
        sharePreview: true,
        competitor: "Basic warnings only",
      },
      {
        name: "Fix recommendations",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "Free to use",
        sharePreview: true,
        competitor: true,
      },
    ],
    advantages: [
      {
        title: "Multi-Platform Preview",
        description:
          "See how your link looks on Facebook, Twitter, LinkedIn, Discord, and Slack all at once. Facebook Debugger only shows Facebook.",
      },
      {
        title: "No Login Required",
        description:
          "SharePreview works instantly without any account. Facebook Debugger requires a Facebook account.",
      },
      {
        title: "Actionable Recommendations",
        description:
          "Get specific suggestions for fixing issues with copy-paste code snippets. Facebook Debugger only shows raw errors.",
      },
      {
        title: "Cleaner Interface",
        description:
          "Focused UI designed for quick previewing. Facebook Debugger shows lots of developer details that most users don't need.",
      },
    ],
    faq: [
      {
        question: "When should I use Facebook Debugger instead?",
        answer:
          "Use Facebook Debugger when you specifically need to clear Facebook's cache or see detailed Open Graph parsing information. For general preview checking, SharePreview is faster.",
      },
      {
        question: "Can SharePreview clear Facebook's cache?",
        answer:
          "No, only Facebook can clear its own cache. Use Facebook Sharing Debugger's 'Scrape Again' button for that specific function.",
      },
      {
        question: "Is SharePreview more accurate than Facebook Debugger?",
        answer:
          "For Facebook previews specifically, Facebook Debugger shows exactly what Facebook sees. SharePreview simulates the preview accurately for most use cases.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.facebookPreview,
        title: "Facebook Preview Checker",
        description: "Test your Facebook link preview.",
      },
      {
        href: ROUTES.fix.facebookPreviewNotShowing,
        title: "Fix Facebook Preview Issues",
        description: "Troubleshoot Facebook preview problems.",
      },
    ],
    ctaTitle: "Try SharePreview Free",
    ctaDescription:
      "Check your links across Facebook, Twitter, LinkedIn, Discord, and Slack instantly.",
    ctaButtonText: "Check Your Link",
    ctaHref: ROUTES.home,
  },
  {
    slug: "sharepreview-vs-metatags-io",
    title: "SharePreview vs Metatags.io",
    metaTitle: "SharePreview vs Metatags.io - Feature Comparison",
    metaDescription:
      "Compare SharePreview with Metatags.io for social media preview testing. See features, pricing, and which tool is best for your needs.",
    keywords: [
      "sharepreview vs metatags",
      "metatags.io alternative",
      "social preview tools comparison",
      "og preview generator",
      "meta tag checker",
    ],
    competitorName: "Metatags.io",
    status: "active",
    quickVerdict:
      "Both tools are excellent for previewing social links. SharePreview focuses on accurate platform-specific previews with detailed issue detection, while Metatags.io includes a meta tag generator for creating tags from scratch.",
    features: [
      {
        name: "Free tier available",
        sharePreview: true,
        competitor: true,
      },
      {
        name: "Facebook preview",
        sharePreview: true,
        competitor: true,
      },
      {
        name: "Twitter preview",
        sharePreview: true,
        competitor: true,
      },
      {
        name: "LinkedIn preview",
        sharePreview: true,
        competitor: true,
      },
      {
        name: "Discord preview",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "Slack preview",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "Meta tag generator",
        sharePreview: "Coming soon",
        competitor: true,
      },
      {
        name: "Issue detection",
        sharePreview: true,
        competitor: "Basic",
      },
      {
        name: "Fix recommendations",
        sharePreview: true,
        competitor: false,
      },
      {
        name: "No signup required",
        sharePreview: true,
        competitor: true,
      },
    ],
    advantages: [
      {
        title: "More Platform Coverage",
        description:
          "SharePreview includes Discord and Slack previews, which Metatags.io doesn't support.",
      },
      {
        title: "Detailed Issue Detection",
        description:
          "Get specific, actionable issues with platform-specific recommendations instead of generic warnings.",
      },
      {
        title: "Platform-Accurate Previews",
        description:
          "Previews that closely match what each platform actually renders, including dark mode support.",
      },
      {
        title: "Code Snippets for Fixes",
        description:
          "Copy-paste code snippets to fix issues quickly without having to look up the correct syntax.",
      },
    ],
    faq: [
      {
        question: "Which tool is better for generating meta tags from scratch?",
        answer:
          "Metatags.io has a built-in generator that's great for creating tags. SharePreview is better for validating existing tags and getting fix recommendations.",
      },
      {
        question: "Does SharePreview have a meta tag generator?",
        answer:
          "Not yet, but it's on our roadmap. Currently SharePreview focuses on validation and issue detection.",
      },
      {
        question: "Which tool is more accurate?",
        answer:
          "Both simulate previews based on your meta tags. The main difference is SharePreview covers more platforms and provides more detailed issue detection.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.home,
        title: "Link Preview Checker",
        description: "Check your link across all platforms.",
      },
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Correct image sizes for social media.",
      },
    ],
    ctaTitle: "Try SharePreview Free",
    ctaDescription:
      "See how your links look on 5 platforms including Discord and Slack.",
    ctaButtonText: "Check Your Link",
    ctaHref: ROUTES.home,
  },
];

export function getComparisonPageBySlug(slug: string): ComparisonPageContent | undefined {
  return comparisonPages.find((page) => page.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisonPages.map((page) => page.slug);
}
