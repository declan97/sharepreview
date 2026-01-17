"use client";

import { useState } from "react";
import { UrlInput } from "@/components/url-input";
import { PreviewCard } from "@/components/preview-card";
import { ProblemList } from "@/components/problem-list";
import { getAllPlatforms } from "@/lib/platform-specs";
import { type MetaData, type ValidationIssue } from "@/lib/validators";
import { Check, Zap, Eye, Image } from "lucide-react";

interface CheckResult {
  success: boolean;
  data?: MetaData;
  issues?: ValidationIssue[];
  error?: string;
  fetchTime?: number;
}

export default function Home() {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const platforms = getAllPlatforms();

  const handleCheck = async (url: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Failed to check URL. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            See it before you{" "}
            <span className="text-primary">share it</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            40% of shared links have broken previews. Check yours in 2 seconds—before
            your audience sees it.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <UrlInput onCheck={handleCheck} isLoading={isLoading} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to use. No signup required.
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-b py-8 bg-muted/20">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <span className="font-medium">Trusted by marketers & developers</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">10K+</span>
              <span>URLs checked</span>
            </span>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <span className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">4</span>
              <span>platforms supported</span>
            </span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="border-b bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {result.success && result.data ? (
              <div className="space-y-8">
                {/* Issues Summary */}
                <ProblemList issues={result.issues || []} meta={result.data} />

                {/* Platform Previews */}
                <div>
                  <h2 className="mb-6 text-xl font-semibold">
                    Platform Previews
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {platforms.map((platform) => (
                      <PreviewCard
                        key={platform.id}
                        meta={result.data!}
                        platform={platform}
                        issues={result.issues || []}
                      />
                    ))}
                  </div>
                </div>

                {/* Meta Data Summary */}
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 font-semibold">Extracted Meta Data</h3>
                  <dl className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground">URL</dt>
                      <dd className="mt-1 break-all font-mono text-xs">
                        {result.data.url}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Title</dt>
                      <dd className="mt-1">{result.data.title || "Not set"}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-muted-foreground">Description</dt>
                      <dd className="mt-1">
                        {result.data.description || "Not set"}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-muted-foreground">Image</dt>
                      <dd className="mt-1 break-all font-mono text-xs">
                        {result.data.image || "Not set"}
                      </dd>
                    </div>
                  </dl>
                  {result.fetchTime && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      Fetched in {result.fetchTime}ms
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-6 text-center">
                <p className="text-destructive">
                  {result.error || "Failed to fetch URL"}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold">
              Everything you need for perfect link previews
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Eye className="h-8 w-8" />}
                title="Universal Preview"
                description="See how your link looks on Facebook, Twitter, LinkedIn, Discord, and Slack in one place."
              />
              <FeatureCard
                icon={<Check className="h-8 w-8" />}
                title="Issue Detection"
                description="Get clear warnings about missing images, titles that are too long, and wrong dimensions."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Quick Fixes"
                description="Copy-paste ready meta tag code to fix any issues instantly."
              />
              <FeatureCard
                icon={<Image className="h-8 w-8" />}
                title="Image Generator"
                description="Create beautiful OG images with our built-in templates if you don't have one."
              />
            </div>
          </div>
        </section>
      )}

      {/* Platforms Section */}
      {!result && (
        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Supported Platforms</h2>
            <p className="mt-4 text-muted-foreground">
              Check your previews on all major social platforms
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {["Facebook", "Twitter / X", "LinkedIn", "Discord"].map(
                (platform) => (
                  <div
                    key={platform}
                    className="rounded-xl border bg-card p-6 text-center"
                  >
                    <span className="text-lg font-medium">{platform}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Stop sharing broken links
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Check any URL now—free. See exactly how it looks before your audience does.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
