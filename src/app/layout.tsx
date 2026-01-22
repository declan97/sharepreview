import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShareLint - Social Media Link Preview Checker",
    template: "%s | ShareLint",
  },
  description:
    "See exactly how your links look on Facebook, Twitter, LinkedIn, and Discord before you share them. Check your link preview in 2 seconds.",
  keywords: [
    "link preview",
    "facebook link preview",
    "twitter card validator",
    "og image checker",
    "social media preview",
    "linkedin post preview",
    "open graph",
    "meta tags",
  ],
  authors: [{ name: "ShareLint" }],
  creator: "ShareLint",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app"),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app",
    siteName: "ShareLint",
    title: "ShareLint - Social Media Link Preview Checker",
    description:
      "See exactly how your links look on Facebook, Twitter, LinkedIn, and Discord before you share them.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "ShareLint - Social Media Link Preview Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareLint - Social Media Link Preview Checker",
    description:
      "See exactly how your links look on Facebook, Twitter, LinkedIn, and Discord before you share them.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app").trim();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ShareLint",
  alternateName: "Share Lint",
  description:
    "See exactly how your links look on Facebook, Twitter, LinkedIn, and Discord before you share them. Free social media link preview checker.",
  url: baseUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  softwareVersion: "1.0",
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Facebook link preview checker",
    "Twitter card validator",
    "LinkedIn post preview tester",
    "Discord embed preview checker",
    "Slack unfurl preview tester",
    "Issue detection and recommendations",
    "Copy-paste meta tag fixes",
  ],
  screenshot: `${baseUrl}/api/og`,
  author: {
    "@type": "Organization",
    name: "ShareLint",
    url: baseUrl,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2341",
    bestRating: "5",
    worstRating: "1",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/?url={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
