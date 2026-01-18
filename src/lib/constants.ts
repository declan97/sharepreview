// ShareLint Application Constants

// =============================================================================
// SEO Constants
// =============================================================================
export const SEO = {
  siteName: "ShareLint",
  // Use sharepreview.vercel.app until sharelint.com domain is configured
  // Then set NEXT_PUBLIC_APP_URL=https://sharelint.com in Vercel
  baseUrl: (process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app").trim(),
  defaultTitle: "ShareLint - Social Media Link Preview Checker",
  defaultDescription:
    "Check how your links look on Facebook, Twitter, LinkedIn, and Discord before sharing. Fix broken preview images, titles, and descriptions instantly.",
  twitterHandle: "@sharelint",
  defaultOgImage: "/og-image.png",
} as const;

// =============================================================================
// Route Paths
// =============================================================================
export const ROUTES = {
  // Main pages
  home: "/",
  pricing: "/pricing",
  dashboard: "/dashboard",
  privacy: "/privacy",
  terms: "/terms",

  // Platform preview pages
  facebookPreview: "/facebook-preview",
  twitterPreview: "/twitter-preview",
  linkedinPreview: "/linkedin-preview",
  discordPreview: "/discord-preview",
  slackPreview: "/slack-preview",

  // Guide pages
  guides: {
    ogImageSize: "/guides/og-image-size",
    twitterCardSize: "/guides/twitter-card-size",
    facebookOgTags: "/guides/facebook-og-tags",
    linkedinMetaTags: "/guides/linkedin-meta-tags",
    discordEmbedGuide: "/guides/discord-embed-guide",
    nextJsOgTags: "/guides/next-js-og-tags",
  },

  // Fix/troubleshooting pages
  fix: {
    facebookPreviewNotShowing: "/fix/facebook-preview-not-showing",
    twitterCardNotWorking: "/fix/twitter-card-not-working",
    missingOgImage: "/fix/missing-og-image",
    ogImageWrongSize: "/fix/og-image-wrong-size",
    linkedinPreviewNotUpdating: "/fix/linkedin-preview-not-updating",
    discordEmbedNotShowing: "/fix/discord-embed-not-showing",
    imageNotLoadingInPreview: "/fix/image-not-loading-in-preview",
  },

  // Comparison pages
  compare: {
    vsTwitterCardValidator: "/compare/sharelint-vs-twitter-card-validator",
    vsFacebookDebugger: "/compare/sharelint-vs-facebook-debugger",
    vsMetatagsIo: "/compare/sharelint-vs-metatags-io",
  },

  // Blog pages
  blog: {
    ogImageSizeGuide: "/blog/og-image-size-guide",
    fixFacebookPreview: "/blog/fix-facebook-preview",
    twitterCardTutorial: "/blog/twitter-card-tutorial",
  },
} as const;

// =============================================================================
// Timeout Values (in milliseconds)
// =============================================================================
export const TIMEOUTS = {
  /** Default fetch timeout for URL checking */
  urlCheck: 10000,
  /** Quick fetch timeout for responsive operations */
  quickFetch: 5000,
  /** Extended timeout for slow sites */
  extendedFetch: 15000,
  /** Image dimension fetch timeout */
  imageFetch: 8000,
  /** API response timeout */
  apiResponse: 30000,
} as const;

// =============================================================================
// Rate Limiting
// =============================================================================
export const RATE_LIMITS = {
  /** Maximum requests per minute for free tier */
  freePerMinute: 10,
  /** Maximum requests per minute for pro tier */
  proPerMinute: 100,
  /** Window size in milliseconds */
  windowMs: 60000,
} as const;

// =============================================================================
// Image Specifications
// =============================================================================
export const IMAGE_SPECS = {
  og: {
    recommendedWidth: 1200,
    recommendedHeight: 630,
    minWidth: 600,
    minHeight: 315,
    aspectRatio: 1.91,
  },
  twitter: {
    summaryLargeImage: {
      width: 1200,
      height: 628,
    },
    summary: {
      width: 120,
      height: 120,
    },
  },
} as const;

// =============================================================================
// Error Types
// =============================================================================
export const ERROR_TYPES = {
  timeout: "timeout",
  dns: "dns",
  ssl: "ssl",
  notHtml: "not_html",
  blocked: "blocked",
  notFound: "not_found",
  serverError: "server_error",
  network: "network",
  unknown: "unknown",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

// =============================================================================
// Platform IDs
// =============================================================================
export const PLATFORMS = {
  facebook: "facebook",
  twitter: "twitter",
  linkedin: "linkedin",
  discord: "discord",
  slack: "slack",
} as const;

export type PlatformId = (typeof PLATFORMS)[keyof typeof PLATFORMS];
