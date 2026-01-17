import Link from "next/link";

export type ContentType = "tool" | "guide" | "fix" | "blog" | "comparison";

interface RelatedItem {
  href: string;
  title: string;
  description: string;
  type: ContentType;
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
}

const typeBadgeStyles: Record<ContentType, string> = {
  tool: "bg-primary/10 text-primary",
  guide: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  fix: "bg-red-500/10 text-red-600 dark:text-red-400",
  blog: "bg-green-500/10 text-green-600 dark:text-green-400",
  comparison: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const typeLabels: Record<ContentType, string> = {
  tool: "Tool",
  guide: "Guide",
  fix: "Fix",
  blog: "Blog",
  comparison: "Compare",
};

export function RelatedContent({
  items,
  title = "Related Resources",
}: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t bg-muted/30 px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-lg font-semibold">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    typeBadgeStyles[item.type]
                  }`}
                >
                  {typeLabels[item.type]}
                </span>
              </div>
              <h3 className="mt-2 font-medium group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to generate related items from common patterns
export function getRelatedToolItems(): RelatedItem[] {
  return [
    {
      href: "/facebook-preview",
      title: "Facebook Preview Checker",
      description: "Test how your links look on Facebook",
      type: "tool",
    },
    {
      href: "/twitter-preview",
      title: "Twitter Card Validator",
      description: "Check your Twitter/X link previews",
      type: "tool",
    },
    {
      href: "/linkedin-preview",
      title: "LinkedIn Preview Checker",
      description: "Preview your LinkedIn link cards",
      type: "tool",
    },
    {
      href: "/discord-preview",
      title: "Discord Embed Checker",
      description: "Test Discord link embeds",
      type: "tool",
    },
    {
      href: "/slack-preview",
      title: "Slack Unfurl Checker",
      description: "Check Slack link unfurls",
      type: "tool",
    },
  ];
}

export function getRelatedGuideItems(): RelatedItem[] {
  return [
    {
      href: "/guides/og-image-size",
      title: "OG Image Size Guide",
      description: "Correct image dimensions for all platforms",
      type: "guide",
    },
    {
      href: "/guides/twitter-card-size",
      title: "Twitter Card Size Guide",
      description: "Image specifications for Twitter/X cards",
      type: "guide",
    },
    {
      href: "/guides/facebook-og-tags",
      title: "Facebook OG Tags Guide",
      description: "Complete Open Graph setup for Facebook",
      type: "guide",
    },
    {
      href: "/guides/linkedin-meta-tags",
      title: "LinkedIn Meta Tags Guide",
      description: "Set up LinkedIn link previews",
      type: "guide",
    },
    {
      href: "/guides/discord-embed-guide",
      title: "Discord Embed Guide",
      description: "Customize Discord link embeds",
      type: "guide",
    },
    {
      href: "/guides/next-js-og-tags",
      title: "Next.js OG Tags Guide",
      description: "Add OG tags to Next.js apps",
      type: "guide",
    },
  ];
}

export function getRelatedFixItems(): RelatedItem[] {
  return [
    {
      href: "/fix/facebook-preview-not-showing",
      title: "Fix Facebook Preview",
      description: "Troubleshoot Facebook link preview issues",
      type: "fix",
    },
    {
      href: "/fix/twitter-card-not-working",
      title: "Fix Twitter Card",
      description: "Resolve Twitter/X card problems",
      type: "fix",
    },
    {
      href: "/fix/missing-og-image",
      title: "Fix Missing OG Image",
      description: "Solutions for missing preview images",
      type: "fix",
    },
    {
      href: "/fix/og-image-wrong-size",
      title: "Fix OG Image Size",
      description: "Resolve image cropping issues",
      type: "fix",
    },
    {
      href: "/fix/linkedin-preview-not-updating",
      title: "Fix LinkedIn Cache",
      description: "Clear LinkedIn preview cache",
      type: "fix",
    },
    {
      href: "/fix/discord-embed-not-showing",
      title: "Fix Discord Embed",
      description: "Troubleshoot Discord embed issues",
      type: "fix",
    },
  ];
}
