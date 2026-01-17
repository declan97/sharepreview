"use client";

import { platformSpecs } from "@/lib/platform-specs";

interface MockPreviewProps {
  image: string | null;
  title: string;
  description: string;
  domain: string;
}

function MockFacebookPreview({
  image,
  title,
  description,
  domain,
}: MockPreviewProps) {
  const spec = platformSpecs.facebook;
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        backgroundColor: spec.colors.card,
        borderColor: spec.colors.border,
      }}
    >
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold text-primary/40">Preview</span>
          </div>
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-200">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-3" style={{ backgroundColor: spec.colors.bg }}>
        <p className="text-xs uppercase text-gray-500">{domain}</p>
        <h4
          className="mt-1 font-semibold leading-tight"
          style={{ color: spec.colors.text }}
        >
          {title}
        </h4>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Broken previews cost you clicks</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your link preview is often the first impression people have of your
            content. Make it count.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Bad Example */}
          <div className="overflow-hidden rounded-xl border bg-red-50 dark:bg-red-950/20">
            <div className="border-b bg-red-100/50 px-6 py-3 dark:bg-red-900/20">
              <span className="text-sm font-medium text-red-700 dark:text-red-400">
                Without checking
              </span>
            </div>
            <div className="p-6">
              <MockFacebookPreview
                image={null}
                title="Home"
                description="Welcome to our website"
                domain="example.com"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Missing image
                  </span>{" "}
                  - Looks unprofessional
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Generic title
                  </span>{" "}
                  - No context or value
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Weak description
                  </span>{" "}
                  - No reason to click
                </p>
              </div>
              <p className="mt-4 text-sm font-medium text-red-700 dark:text-red-400">
                Would you click this?
              </p>
            </div>
          </div>

          {/* Good Example */}
          <div className="overflow-hidden rounded-xl border bg-green-50 dark:bg-green-950/20">
            <div className="border-b bg-green-100/50 px-6 py-3 dark:bg-green-900/20">
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                After fixing with SharePreview
              </span>
            </div>
            <div className="p-6">
              <MockFacebookPreview
                image="/og-image.png"
                title="10 Tips to Double Your Newsletter Subscribers"
                description="Learn the proven strategies that helped us grow from 0 to 50,000 subscribers in 6 months."
                domain="example.com"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Eye-catching image
                  </span>{" "}
                  - Grabs attention in the feed
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Compelling title
                  </span>{" "}
                  - Clear value proposition
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Enticing description
                  </span>{" "}
                  - Creates curiosity
                </p>
              </div>
              <p className="mt-4 text-sm font-medium text-green-700 dark:text-green-400">
                2x higher click-through rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
