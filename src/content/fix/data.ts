import { ROUTES } from "@/lib/constants";

export interface FixPageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroSubtitle: string;
  quickFix: string;
  problems: {
    problem: string;
    causes: string[];
    solution: string;
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

export const fixPages: FixPageContent[] = [
  {
    slug: "missing-og-image",
    title: "OG Image Missing? How to Fix It Fast",
    metaTitle: "OG Image Missing? Fix Open Graph Images in 5 Minutes",
    metaDescription:
      "Fix missing OG images on your website. Learn why your Open Graph image isn't showing on Facebook, Twitter, and LinkedIn, and get working solutions.",
    keywords: [
      "og image missing",
      "og:image not showing",
      "open graph image missing",
      "facebook image not showing",
      "twitter image missing",
    ],
    heroSubtitle:
      "Your Open Graph image isn't appearing when you share your link. Here's how to fix it quickly.",
    quickFix:
      "Add an og:image meta tag with an absolute URL (starting with https://) pointing to an image at least 1200x630 pixels.",
    problems: [
      {
        problem: "No og:image meta tag",
        causes: [
          "The og:image tag is missing from your page",
          "The tag is in the <body> instead of <head>",
          "JavaScript is required to render the tag",
        ],
        solution: `Add this to your <head> section:
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`,
      },
      {
        problem: "Relative URL instead of absolute",
        causes: [
          "Using /images/og.jpg instead of full URL",
          "Missing protocol (http/https)",
        ],
        solution: `Always use absolute URLs:
❌ Wrong: /images/og-image.jpg
❌ Wrong: //yoursite.com/og-image.jpg
✓ Correct: https://yoursite.com/og-image.jpg`,
      },
      {
        problem: "Image is inaccessible",
        causes: [
          "Image URL returns 404",
          "Image is behind authentication",
          "Robots.txt blocking crawlers",
          "HTTPS certificate issues",
        ],
        solution: `Verify your image:
1. Open the image URL directly in your browser
2. Check it loads without login
3. Ensure your server allows social media crawlers
4. Verify HTTPS is working correctly`,
      },
    ],
    faq: [
      {
        question: "What size should my OG image be?",
        answer:
          "The recommended size is 1200x630 pixels with a 1.91:1 aspect ratio. This works well on Facebook, Twitter, LinkedIn, and Discord.",
      },
      {
        question: "Why does my OG image show on some platforms but not others?",
        answer:
          "Different platforms have different minimum size requirements and caching behavior. Facebook requires at least 600x315, while Twitter needs 300x157 for large cards.",
      },
      {
        question: "How do I check if my OG image is set correctly?",
        answer:
          "Use a link preview checker like SharePreview to see exactly how your image appears on each platform before sharing.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Complete guide to image sizes for all platforms.",
      },
      {
        href: ROUTES.fix.ogImageWrongSize,
        title: "Fix Wrong Image Size",
        description: "Solutions for OG images that are the wrong dimensions.",
      },
    ],
    ctaTitle: "Check Your OG Image",
    ctaDescription:
      "See if your Open Graph image is working correctly on all platforms.",
    ctaButtonText: "Check Your Link",
    ctaHref: ROUTES.home,
  },
  {
    slug: "og-image-wrong-size",
    title: "OG Image Wrong Size? Fix Dimensions & Aspect Ratio",
    metaTitle: "OG Image Wrong Size - Fix Dimensions & Cropping Issues",
    metaDescription:
      "Fix OG image sizing issues. Learn the correct dimensions for Facebook, Twitter, and LinkedIn. Stop your images from being cropped or stretched.",
    keywords: [
      "og image wrong size",
      "og image dimensions",
      "og image cropped",
      "og:image:width",
      "open graph image aspect ratio",
    ],
    heroSubtitle:
      "Your OG image is showing but it's the wrong size, getting cropped, or looking stretched. Here's how to fix it.",
    quickFix:
      "Resize your image to 1200x630 pixels (1.91:1 aspect ratio) and add og:image:width and og:image:height meta tags.",
    problems: [
      {
        problem: "Image is being cropped",
        causes: [
          "Wrong aspect ratio (should be 1.91:1)",
          "Important content too close to edges",
          "Different platforms crop differently",
        ],
        solution: `Use the correct aspect ratio:
- Resize to 1200 x 630 pixels
- Keep important content in the center
- Leave 50px margin from edges for safe zone`,
      },
      {
        problem: "Image looks blurry",
        causes: [
          "Image is too small",
          "Over-compressed JPEG",
          "Retina displays need higher resolution",
        ],
        solution: `Use high-resolution images:
- Minimum: 600 x 315 pixels
- Recommended: 1200 x 630 pixels
- For retina: 2400 x 1260 pixels
- Use PNG for graphics, JPEG for photos`,
      },
      {
        problem: "Dimensions not being detected",
        causes: [
          "Missing og:image:width and og:image:height tags",
          "Platforms guessing dimensions incorrectly",
        ],
        solution: `Add explicit dimensions:
<meta property="og:image" content="https://site.com/image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`,
      },
    ],
    faq: [
      {
        question: "What's the best OG image size for all platforms?",
        answer:
          "1200x630 pixels (1.91:1 aspect ratio) works well on Facebook, Twitter, LinkedIn, Discord, and Slack without any cropping.",
      },
      {
        question: "Should I include og:image:width and og:image:height?",
        answer:
          "Yes! These tags help platforms render your preview faster and more accurately. They're optional but recommended.",
      },
      {
        question: "My image is 1200x630 but still looks wrong. Why?",
        answer:
          "The platform may have cached an old version. Use each platform's debug tool to clear the cache and re-fetch your image.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Detailed specifications for all platforms.",
      },
      {
        href: ROUTES.fix.missingOgImage,
        title: "Fix Missing OG Image",
        description: "Solutions when your image isn't showing at all.",
      },
    ],
    ctaTitle: "Test Your OG Image Size",
    ctaDescription:
      "Check if your image dimensions are correct for all platforms.",
    ctaButtonText: "Check Your Image",
    ctaHref: ROUTES.home,
  },
  {
    slug: "linkedin-preview-not-updating",
    title: "LinkedIn Preview Not Updating? Clear the Cache",
    metaTitle: "LinkedIn Preview Not Updating - How to Clear Cache & Refresh",
    metaDescription:
      "Fix LinkedIn link preview cache issues. Learn how to force LinkedIn to refresh your link preview and show updated images, titles, and descriptions.",
    keywords: [
      "linkedin preview not updating",
      "linkedin cache clear",
      "linkedin post inspector",
      "linkedin link preview refresh",
      "linkedin og image not changing",
    ],
    heroSubtitle:
      "You updated your page but LinkedIn still shows the old preview. Here's how to fix it.",
    quickFix:
      "Use LinkedIn's Post Inspector tool to clear the cache. Go to linkedin.com/post-inspector, enter your URL, and click Inspect.",
    problems: [
      {
        problem: "Old image still showing",
        causes: [
          "LinkedIn caches previews aggressively",
          "CDN caching old version",
          "Multiple versions of the URL",
        ],
        solution: `Clear LinkedIn's cache:
1. Go to linkedin.com/post-inspector
2. Enter your URL
3. Click "Inspect" to refresh
4. Wait a few minutes and try again`,
      },
      {
        problem: "Post Inspector not working",
        causes: [
          "URL is not publicly accessible",
          "Authentication required",
          "Server blocking LinkedIn's crawler",
        ],
        solution: `Check URL accessibility:
- Ensure page loads without login
- Test URL in incognito browser
- Check server isn't blocking LinkedInBot user agent`,
      },
      {
        problem: "Changes not reflected after refresh",
        causes: [
          "Multiple redirects confusing LinkedIn",
          "Different URLs (www vs non-www)",
          "Query parameters creating duplicate pages",
        ],
        solution: `Use canonical URLs:
- Add canonical meta tag
- Ensure consistent URL format
- Try adding ?v=2 to force new cache entry`,
      },
    ],
    faq: [
      {
        question: "How long does LinkedIn cache previews?",
        answer:
          "LinkedIn can cache link previews for several days. Using the Post Inspector tool is the fastest way to force a refresh.",
      },
      {
        question: "Where is LinkedIn's Post Inspector?",
        answer:
          "Visit linkedin.com/post-inspector. You'll need to be logged into LinkedIn to use it.",
      },
      {
        question: "Why does my LinkedIn preview look different than Facebook?",
        answer:
          "LinkedIn and Facebook may interpret the same OG tags differently. LinkedIn is stricter about image quality and may show a different crop.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.linkedinPreview,
        title: "LinkedIn Preview Checker",
        description: "Test how your links appear on LinkedIn.",
      },
      {
        href: ROUTES.guides.linkedinMetaTags,
        title: "LinkedIn Meta Tags Guide",
        description: "Complete guide to LinkedIn Open Graph tags.",
      },
    ],
    ctaTitle: "Check Your LinkedIn Preview",
    ctaDescription:
      "See exactly how your link will appear when shared on LinkedIn.",
    ctaButtonText: "Check LinkedIn Preview",
    ctaHref: ROUTES.linkedinPreview,
  },
  {
    slug: "discord-embed-not-showing",
    title: "Discord Embed Not Showing? Fix Link Previews",
    metaTitle: "Discord Embed Not Showing - Fix Link Preview Issues",
    metaDescription:
      "Fix Discord embed and link preview issues. Learn why your Discord link preview isn't showing and get solutions for missing images and titles.",
    keywords: [
      "discord embed not showing",
      "discord link preview",
      "discord og image",
      "discord embed fix",
      "discord unfurl not working",
    ],
    heroSubtitle:
      "Your links aren't showing embeds in Discord. Here's how to fix it.",
    quickFix:
      "Ensure your page has proper Open Graph meta tags (og:title, og:description, og:image) with absolute URLs and publicly accessible images.",
    problems: [
      {
        problem: "No embed at all",
        causes: [
          "Missing Open Graph meta tags",
          "Page requires authentication",
          "Discord blocked the domain",
          "HTTPS certificate issues",
        ],
        solution: `Add required meta tags:
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="https://site.com/image.jpg" />
<meta property="og:url" content="https://site.com/page" />`,
      },
      {
        problem: "Embed shows but no image",
        causes: [
          "Image URL is relative",
          "Image is too large (over 8MB)",
          "Image URL returns 404",
          "Image behind authentication",
        ],
        solution: `Fix your image:
- Use absolute URL (https://...)
- Keep file size under 8MB
- Ensure image is publicly accessible
- Test URL directly in browser`,
      },
      {
        problem: "Wrong embed color",
        causes: [
          "Missing theme-color meta tag",
          "Invalid color format",
        ],
        solution: `Set custom embed color:
<meta name="theme-color" content="#5865F2" />
Use hex colors like #FF0000 for red or #5865F2 for Discord blurple.`,
      },
    ],
    faq: [
      {
        question: "How do I customize my Discord embed color?",
        answer:
          "Add a theme-color meta tag to your page: <meta name=\"theme-color\" content=\"#5865F2\">. This sets the colored sidebar on your embed.",
      },
      {
        question: "Why does Discord show a small image instead of large?",
        answer:
          "Discord automatically chooses between large and small image layouts based on the image dimensions. Use 1200x630 pixels for the large layout.",
      },
      {
        question: "Can I have different content for Discord vs other platforms?",
        answer:
          "Discord uses Open Graph tags, the same as Facebook and LinkedIn. For different content per platform, you'd need server-side user-agent detection.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.discordPreview,
        title: "Discord Preview Checker",
        description: "Test how your links appear in Discord.",
      },
      {
        href: ROUTES.guides.discordEmbedGuide,
        title: "Discord Embed Guide",
        description: "Complete guide to Discord link embeds.",
      },
    ],
    ctaTitle: "Check Your Discord Embed",
    ctaDescription: "See exactly how your link will appear when shared in Discord.",
    ctaButtonText: "Check Discord Preview",
    ctaHref: ROUTES.discordPreview,
  },
  {
    slug: "image-not-loading-in-preview",
    title: "Image Not Loading in Preview? Troubleshooting Guide",
    metaTitle: "Image Not Loading in Social Media Preview - Fix Guide",
    metaDescription:
      "Fix images that won't load in social media previews. Troubleshoot OG image issues on Facebook, Twitter, LinkedIn, and Discord.",
    keywords: [
      "image not loading preview",
      "og image not loading",
      "social media image not showing",
      "preview image broken",
      "meta image not working",
    ],
    heroSubtitle:
      "Your preview image isn't loading on social media. Here's a comprehensive troubleshooting guide.",
    quickFix:
      "Verify your image URL is absolute (starts with https://), publicly accessible, and under the platform's size limits.",
    problems: [
      {
        problem: "Image URL is incorrect",
        causes: [
          "Relative URL instead of absolute",
          "Typo in the URL",
          "Wrong file extension",
          "Case-sensitive URL mismatch",
        ],
        solution: `Check your image URL:
1. Copy the og:image URL from your source
2. Paste directly in browser address bar
3. Verify the image loads correctly
4. Ensure it starts with https://`,
      },
      {
        problem: "Server blocking crawlers",
        causes: [
          "Robots.txt blocking social media bots",
          "Firewall rules blocking requests",
          "Geo-restrictions",
          "Rate limiting",
        ],
        solution: `Allow social media crawlers:
# robots.txt should allow these user agents:
User-agent: facebookexternalhit
User-agent: Twitterbot
User-agent: LinkedInBot
Allow: /`,
      },
      {
        problem: "HTTPS/SSL issues",
        causes: [
          "Invalid SSL certificate",
          "Mixed content (HTTP image on HTTPS page)",
          "Certificate chain incomplete",
          "Self-signed certificate",
        ],
        solution: `Fix SSL issues:
- Ensure valid SSL certificate
- Use HTTPS for both page and image
- Check certificate chain is complete
- Don't use self-signed certs in production`,
      },
    ],
    faq: [
      {
        question: "Why does my image load in my browser but not in previews?",
        answer:
          "Social media crawlers may be blocked by your server, or the image may require cookies/authentication that crawlers don't have.",
      },
      {
        question: "What's the maximum file size for preview images?",
        answer:
          "Facebook: 8MB, Twitter: 5MB, LinkedIn: 5MB, Discord: 8MB. Keep images under 1MB for fastest loading.",
      },
      {
        question: "Should I use CDN for my OG images?",
        answer:
          "Yes, using a CDN improves loading speed for social media crawlers globally. Just ensure the CDN URL is the one in your og:image tag.",
      },
    ],
    relatedLinks: [
      {
        href: ROUTES.fix.missingOgImage,
        title: "Fix Missing OG Image",
        description: "When your image tag is missing entirely.",
      },
      {
        href: ROUTES.guides.ogImageSize,
        title: "OG Image Size Guide",
        description: "Correct sizes for all platforms.",
      },
    ],
    ctaTitle: "Test Your Image",
    ctaDescription: "Check if your preview image loads correctly on all platforms.",
    ctaButtonText: "Check Your Link",
    ctaHref: ROUTES.home,
  },
];

export function getFixPageBySlug(slug: string): FixPageContent | undefined {
  return fixPages.find((page) => page.slug === slug);
}

export function getAllFixSlugs(): string[] {
  return fixPages.map((page) => page.slug);
}
