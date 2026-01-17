import { ROUTES } from "@/lib/constants";

export interface GuidePageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  subtitle: string;
  quickAnswer: {
    title: string;
    content: string;
  };
  sections: {
    heading: string;
    content: string;
    code?: string;
    list?: string[];
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

export const guidePages: GuidePageContent[] = [
  {
    slug: "facebook-og-tags",
    title: "Facebook Open Graph Tags - Complete Guide",
    metaTitle: "Facebook Open Graph Tags Guide - How to Set Up OG Tags",
    metaDescription:
      "Learn how to set up Facebook Open Graph meta tags for perfect link previews. Get the correct og:title, og:description, og:image tags with code examples.",
    keywords: [
      "facebook og tags",
      "facebook open graph",
      "og tags facebook",
      "facebook meta tags",
      "og:title",
      "og:description",
      "og:image",
    ],
    subtitle:
      "Everything you need to know about setting up Open Graph meta tags for Facebook link previews.",
    quickAnswer: {
      title: "Essential Facebook OG Tags",
      content:
        "At minimum, you need og:title, og:description, og:image, and og:url. Add og:type as 'website' for most pages or 'article' for blog posts.",
    },
    sections: [
      {
        heading: "What Are Open Graph Tags?",
        content:
          "Open Graph tags are meta tags that control how your content appears when shared on Facebook (and other social platforms). Facebook created the Open Graph protocol in 2010, and it's now the standard for social media previews.",
      },
      {
        heading: "Required Facebook OG Tags",
        content: "Add these meta tags to your page's <head> section:",
        code: `<head>
  <!-- Required OG Tags -->
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="A compelling description of your page content" />
  <meta property="og:image" content="https://yoursite.com/og-image.jpg" />
  <meta property="og:url" content="https://yoursite.com/page" />
  <meta property="og:type" content="website" />

  <!-- Recommended -->
  <meta property="og:site_name" content="Your Site Name" />
  <meta property="og:locale" content="en_US" />
</head>`,
      },
      {
        heading: "Image Requirements",
        content: "Facebook has specific requirements for OG images:",
        list: [
          "Minimum size: 600 x 315 pixels",
          "Recommended size: 1200 x 630 pixels",
          "Aspect ratio: 1.91:1",
          "Maximum file size: 8MB",
          "Supported formats: JPEG, PNG, GIF, WebP",
          "Must use absolute URLs (starting with https://)",
        ],
      },
      {
        heading: "Image Dimension Tags",
        content:
          "Help Facebook render your preview faster by specifying image dimensions:",
        code: `<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:alt" content="Description of the image" />`,
      },
      {
        heading: "Article-Specific Tags",
        content: "For blog posts and articles, add these additional tags:",
        code: `<meta property="og:type" content="article" />
<meta property="article:published_time" content="2024-01-15T09:00:00Z" />
<meta property="article:modified_time" content="2024-01-16T10:30:00Z" />
<meta property="article:author" content="https://yoursite.com/author" />
<meta property="article:section" content="Technology" />
<meta property="article:tag" content="SEO" />`,
      },
      {
        heading: "Testing Your OG Tags",
        content:
          "After adding your tags, use Facebook's Sharing Debugger to verify they're working correctly. Enter your URL and click 'Debug' to see what Facebook sees. Click 'Scrape Again' to clear the cache.",
      },
    ],
    faq: [
      {
        question: "What's the difference between og:title and the HTML title tag?",
        answer:
          "The HTML <title> tag is used by search engines and browser tabs. The og:title is specifically for social media previews. They can be different - for example, you might want a shorter title for social sharing.",
      },
      {
        question: "Do I need both og:image and a regular image tag?",
        answer:
          "Yes, og:image is specifically for social media previews. Regular <img> tags on your page are for displaying images to visitors. They serve different purposes.",
      },
      {
        question: "How do I update a Facebook preview after making changes?",
        answer:
          "Use Facebook's Sharing Debugger and click 'Scrape Again' to force Facebook to fetch your updated meta tags. Note that previously shared posts will keep their old preview.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.facebookPreview,
        title: "Facebook Preview Checker",
        description: "Test your Facebook link preview instantly.",
      },
      {
        href: ROUTES.fix.facebookPreviewNotShowing,
        title: "Fix Facebook Preview Issues",
        description: "Troubleshoot common Facebook preview problems.",
      },
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Detailed image size specifications.",
      },
    ],
    ctaTitle: "Test Your Facebook OG Tags",
    ctaDescription:
      "See exactly how your link will appear when shared on Facebook.",
    ctaButtonText: "Check Facebook Preview",
    ctaHref: ROUTES.facebookPreview,
  },
  {
    slug: "linkedin-meta-tags",
    title: "LinkedIn Meta Tags - Complete Setup Guide",
    metaTitle: "LinkedIn Meta Tags Guide - Open Graph for LinkedIn",
    metaDescription:
      "Learn how to set up meta tags for perfect LinkedIn link previews. Get the correct Open Graph tags for professional sharing with code examples.",
    keywords: [
      "linkedin meta tags",
      "linkedin og tags",
      "linkedin open graph",
      "linkedin preview",
      "linkedin share image",
      "linkedin post preview",
    ],
    subtitle:
      "How to configure Open Graph tags for professional LinkedIn link previews.",
    quickAnswer: {
      title: "LinkedIn Uses Open Graph",
      content:
        "LinkedIn reads Open Graph (og:) meta tags for link previews. Use og:title, og:description, og:image, and og:url for best results.",
    },
    sections: [
      {
        heading: "How LinkedIn Uses Meta Tags",
        content:
          "LinkedIn reads Open Graph meta tags to generate link previews. Unlike Twitter (which has its own tags), LinkedIn relies entirely on OG tags. This means if you've already set up tags for Facebook, you're most of the way there.",
      },
      {
        heading: "Required Meta Tags for LinkedIn",
        content: "Add these to your page's <head> section:",
        code: `<head>
  <meta property="og:title" content="Your Professional Title" />
  <meta property="og:description" content="A compelling, professional description" />
  <meta property="og:image" content="https://yoursite.com/linkedin-image.jpg" />
  <meta property="og:url" content="https://yoursite.com/page" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Your Company Name" />
</head>`,
      },
      {
        heading: "LinkedIn Image Requirements",
        content: "LinkedIn has specific requirements for preview images:",
        list: [
          "Recommended size: 1200 x 627 pixels",
          "Minimum size: 200 x 200 pixels",
          "Aspect ratio: 1.91:1",
          "Maximum file size: 5MB",
          "Supported formats: JPEG, PNG",
          "High-quality, professional images work best",
        ],
      },
      {
        heading: "LinkedIn-Specific Considerations",
        content:
          "Keep these LinkedIn-specific factors in mind when setting up your meta tags:",
        list: [
          "LinkedIn caches previews aggressively - use Post Inspector to refresh",
          "Professional audiences expect high-quality images",
          "Keep titles under 70 characters for best display",
          "Descriptions are truncated at approximately 2 lines",
          "LinkedIn prefers og:type 'article' for content",
        ],
      },
      {
        heading: "Clearing LinkedIn Cache",
        content:
          "LinkedIn's Post Inspector tool lets you clear cached previews. Visit linkedin.com/post-inspector, enter your URL, and click 'Inspect' to refresh. This is essential when updating your content.",
      },
    ],
    faq: [
      {
        question: "Does LinkedIn support Twitter Card tags?",
        answer:
          "No, LinkedIn only reads Open Graph (og:) tags. Twitter Card tags are ignored by LinkedIn.",
      },
      {
        question: "Why does my LinkedIn preview look different from Facebook?",
        answer:
          "LinkedIn and Facebook may crop images differently and have different text truncation rules. Both use OG tags but render them slightly differently.",
      },
      {
        question: "How do I refresh a cached LinkedIn preview?",
        answer:
          "Use LinkedIn's Post Inspector at linkedin.com/post-inspector. Enter your URL and click 'Inspect' to force LinkedIn to fetch fresh metadata.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.linkedinPreview,
        title: "LinkedIn Preview Checker",
        description: "Test your LinkedIn link preview.",
      },
      {
        href: ROUTES.fix.linkedinPreviewNotUpdating,
        title: "Fix LinkedIn Cache Issues",
        description: "Troubleshoot LinkedIn preview update problems.",
      },
    ],
    ctaTitle: "Test Your LinkedIn Preview",
    ctaDescription: "See how your link will appear when shared on LinkedIn.",
    ctaButtonText: "Check LinkedIn Preview",
    ctaHref: ROUTES.linkedinPreview,
  },
  {
    slug: "discord-embed-guide",
    title: "Discord Embed Guide - Custom Link Previews",
    metaTitle: "Discord Embed Guide - How to Customize Link Previews",
    metaDescription:
      "Learn how to create custom Discord embeds for your links. Set up Open Graph tags and theme colors for beautiful Discord link previews.",
    keywords: [
      "discord embed",
      "discord link preview",
      "discord og tags",
      "discord theme color",
      "discord embed color",
      "discord unfurl",
    ],
    subtitle:
      "How to create beautiful link embeds for Discord servers and DMs.",
    quickAnswer: {
      title: "Discord Uses Open Graph + Theme Color",
      content:
        "Discord reads Open Graph tags for embeds. Add a theme-color meta tag to customize the embed's sidebar color.",
    },
    sections: [
      {
        heading: "How Discord Embeds Work",
        content:
          "When you share a link in Discord, it 'unfurls' into a rich embed showing the page title, description, and image. Discord reads Open Graph meta tags to generate these embeds, similar to Facebook and LinkedIn.",
      },
      {
        heading: "Basic Embed Setup",
        content: "Add these meta tags for Discord embeds:",
        code: `<head>
  <meta property="og:title" content="Your Title" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://yoursite.com/image.jpg" />
  <meta property="og:url" content="https://yoursite.com/page" />
  <meta property="og:site_name" content="Your Site" />

  <!-- Custom embed color -->
  <meta name="theme-color" content="#5865F2" />
</head>`,
      },
      {
        heading: "Customizing Embed Color",
        content:
          "The theme-color meta tag sets the colored sidebar on Discord embeds. Use hex color codes:",
        list: [
          "#5865F2 - Discord Blurple",
          "#57F287 - Green",
          "#FEE75C - Yellow",
          "#EB459E - Pink",
          "#ED4245 - Red",
          "Any valid hex color code works",
        ],
      },
      {
        heading: "Image Display Modes",
        content:
          "Discord shows images in two modes based on size:",
        list: [
          "Large image: Displays below the description when image is large (recommended 1200x630)",
          "Thumbnail: Small image on the right side when image is smaller or square",
          "Use og:image:width and og:image:height to hint which mode you want",
        ],
      },
      {
        heading: "Discord-Specific Tips",
        content: "Things to know about Discord embeds:",
        list: [
          "Maximum description length: 2048 characters (but truncated in preview)",
          "Embeds update when cache expires - no manual refresh option",
          "Discord supports GIF images in embeds",
          "Large servers may have embeds disabled - this is a server setting",
          "NSFW channels may suppress embeds by default",
        ],
      },
    ],
    faq: [
      {
        question: "How do I change the Discord embed color?",
        answer:
          'Add <meta name="theme-color" content="#5865F2"> to your page\'s head section. Replace #5865F2 with any hex color code.',
      },
      {
        question: "Why isn't my Discord embed showing?",
        answer:
          "Check that your Open Graph tags are present, the page is publicly accessible, and the image URL is absolute. Some servers also have embeds disabled.",
      },
      {
        question: "Can I have a different image for Discord vs Facebook?",
        answer:
          "Not directly - Discord uses Open Graph tags. You'd need server-side user-agent detection to serve different tags to Discord's crawler.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.discordPreview,
        title: "Discord Preview Checker",
        description: "Test your Discord link embed.",
      },
      {
        href: ROUTES.fix.discordEmbedNotShowing,
        title: "Fix Discord Embed Issues",
        description: "Troubleshoot Discord embed problems.",
      },
    ],
    ctaTitle: "Test Your Discord Embed",
    ctaDescription: "See how your link will appear when shared in Discord.",
    ctaButtonText: "Check Discord Preview",
    ctaHref: ROUTES.discordPreview,
  },
  {
    slug: "next-js-og-tags",
    title: "Next.js Open Graph Tags - Complete Setup Guide",
    metaTitle: "Next.js OG Tags Guide - Add Open Graph Meta Tags in Next.js",
    metaDescription:
      "Learn how to add Open Graph meta tags in Next.js. Complete guide with code examples for App Router and Pages Router.",
    keywords: [
      "next.js og tags",
      "next.js open graph",
      "next.js meta tags",
      "next.js social share",
      "next.js metadata",
      "next.js seo",
    ],
    subtitle:
      "How to configure Open Graph and Twitter Card meta tags in Next.js applications.",
    quickAnswer: {
      title: "Next.js Metadata API",
      content:
        "Next.js 13+ App Router uses the Metadata API. Export a metadata object or generateMetadata function from your page files.",
    },
    sections: [
      {
        heading: "App Router (Next.js 13+)",
        content:
          "The App Router uses the Metadata API. Export a metadata object from any page or layout file:",
        code: `// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    url: 'https://yoursite.com/page',
    siteName: 'Your Site',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image description',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['https://yoursite.com/twitter-image.jpg'],
  },
}

export default function Page() {
  return <div>Your content</div>
}`,
      },
      {
        heading: "Dynamic Metadata",
        content: "For dynamic pages, use generateMetadata function:",
        code: `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}`,
      },
      {
        heading: "Pages Router (Legacy)",
        content:
          "For the Pages Router, use next/head or the next-seo package:",
        code: `// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta property="og:title" content="OG Title" />
        <meta property="og:description" content="OG Description" />
        <meta property="og:image" content="https://yoursite.com/og.jpg" />
        <meta property="og:url" content="https://yoursite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>Your content</main>
    </>
  )
}`,
      },
      {
        heading: "Default Metadata in Layout",
        content:
          "Set default metadata in your root layout that pages can override:",
        code: `// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: 'Your Site',
    template: '%s | Your Site',
  },
  openGraph: {
    siteName: 'Your Site',
    locale: 'en_US',
    type: 'website',
  },
}`,
      },
      {
        heading: "Dynamic OG Images",
        content:
          "Next.js can generate OG images dynamically using the ImageResponse API:",
        code: `// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Hello, World!
      </div>
    ),
    { width: 1200, height: 630 }
  )
}`,
      },
    ],
    faq: [
      {
        question: "Does Next.js automatically add OG tags?",
        answer:
          "No, you need to configure metadata yourself using either the Metadata API (App Router) or next/head (Pages Router).",
      },
      {
        question: "How do I set different OG images per page?",
        answer:
          "Each page can export its own metadata object that overrides the defaults from the layout.",
      },
      {
        question: "What's the metadataBase property for?",
        answer:
          "metadataBase sets the base URL for relative URLs in your metadata. It's required for proper canonical URLs and OG URLs.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.home,
        title: "Link Preview Checker",
        description: "Test your Next.js site's social previews.",
      },
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Correct image dimensions for all platforms.",
      },
    ],
    ctaTitle: "Test Your Next.js Site",
    ctaDescription: "Check how your Next.js pages appear on social media.",
    ctaButtonText: "Check Your URL",
    ctaHref: ROUTES.home,
  },
];

export function getGuidePageBySlug(slug: string): GuidePageContent | undefined {
  return guidePages.find((page) => page.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guidePages.map((page) => page.slug);
}
