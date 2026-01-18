"use client";

import { platformSpecs } from "@/lib/platform-specs";
import { X, Check, Sparkles } from "lucide-react";

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
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{
        backgroundColor: spec.colors.card,
        borderColor: spec.colors.border,
      }}
    >
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-amber-500/20">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xl font-bold text-primary/60">Preview Image</span>
          </div>
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-muted">
          <span className="text-muted-foreground">No image set</span>
        </div>
      )}
      <div className="p-3" style={{ backgroundColor: spec.colors.bg }}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{domain}</p>
        <h4
          className="mt-1 font-semibold leading-tight"
          style={{ color: spec.colors.text }}
        >
          {title}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full bg-success/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive">
            Real Impact
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Broken previews cost you clicks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Your link preview is often the first impression people have of your
            content. Make it count.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Bad Example */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-destructive/20 bg-card shadow-lg transition-all duration-300 hover:border-destructive/40">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-destructive/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                  <X className="h-4 w-4 text-destructive" />
                </div>
                <span className="font-semibold text-destructive">
                  Without checking
                </span>
              </div>
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                -47% CTR
              </span>
            </div>

            {/* Preview */}
            <div className="p-6">
              <MockFacebookPreview
                image={null}
                title="Home"
                description="Welcome to our website"
                domain="example.com"
              />

              {/* Issues list */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-destructive/5 p-3">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Missing image</p>
                    <p className="text-sm text-muted-foreground">
                      Posts without images get 2.3x less engagement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-destructive/5 p-3">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Generic title</p>
                    <p className="text-sm text-muted-foreground">
                      No context or value proposition
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-destructive/5 p-3">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Weak description</p>
                    <p className="text-sm text-muted-foreground">
                      No compelling reason to click
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center font-semibold text-muted-foreground">
                Would you click this?
              </p>
            </div>
          </div>

          {/* Good Example */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-success/20 bg-card shadow-lg transition-all duration-300 hover:border-success/40">
            {/* Sparkle decoration */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-success/10 blur-2xl" />

            {/* Header */}
            <div className="flex items-center justify-between border-b bg-success/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <Sparkles className="h-4 w-4 text-success" />
                </div>
                <span className="font-semibold text-success">
                  After fixing with SharePreview
                </span>
              </div>
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                +2x CTR
              </span>
            </div>

            {/* Preview */}
            <div className="relative p-6">
              <MockFacebookPreview
                image="/og-image.png"
                title="10 Tips to Double Your Newsletter Subscribers"
                description="Learn the proven strategies that helped us grow from 0 to 50,000 subscribers in 6 months."
                domain="example.com"
              />

              {/* Benefits list */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-success/5 p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <div>
                    <p className="font-medium text-success">Eye-catching image</p>
                    <p className="text-sm text-muted-foreground">
                      Grabs attention in crowded feeds
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-success/5 p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <div>
                    <p className="font-medium text-success">Compelling title</p>
                    <p className="text-sm text-muted-foreground">
                      Clear value proposition with specific number
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-success/5 p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <div>
                    <p className="font-medium text-success">Enticing description</p>
                    <p className="text-sm text-muted-foreground">
                      Creates curiosity with social proof
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center font-semibold text-success">
                2x higher click-through rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
