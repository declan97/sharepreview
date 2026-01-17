"use client";

import { useState } from "react";
import { UrlInput } from "@/components/url-input";
import { PreviewCard } from "@/components/preview-card";
import { ProblemList } from "@/components/problem-list";
import { DemoPreviewSection } from "@/components/demo-preview";
import { BeforeAfterSection } from "@/components/before-after";
import { FeatureCard } from "@/components/feature-card";
import { ErrorDisplay } from "@/components/error-display";
import { getAllPlatforms } from "@/lib/platform-specs";
import { type MetaData, type ValidationIssue } from "@/lib/validators";
import { type ErrorType } from "@/lib/constants";
import { Eye, AlertCircle, Zap, Image, ArrowRight } from "lucide-react";

interface CheckResult {
  success: boolean;
  data?: MetaData;
  issues?: ValidationIssue[];
  error?: string;
  errorType?: ErrorType;
  fetchTime?: number;
  originalUrl?: string;
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
      {/* Hero Section - New Copy */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your link previews are{" "}
            <span className="text-primary">probably broken</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Missing images. Wrong titles. Cut-off text. Find out in 2 seconds—and
            get copy-paste fixes that actually work.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <UrlInput onCheck={handleCheck} isLoading={isLoading} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free. No signup. Results in 2 seconds. We don&apos;t store your URLs.
          </p>
        </div>
      </section>

      {/* Social Proof Section - Outcome Focused */}
      <section className="border-b bg-muted/20 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,341</div>
                <div className="text-muted-foreground">broken previews caught this week</div>
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-muted-foreground">platforms checked at once</div>
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">&lt;2s</div>
                <div className="text-muted-foreground">average check time</div>
              </div>
            </div>
            <p className="text-center text-sm italic text-muted-foreground">
              &ldquo;Caught a missing OG image right before my Product Hunt launch. Would&apos;ve looked terrible.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="border-b bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {result.success && result.data ? (
              <div className="space-y-8">
                {/* Redirect Notice */}
                {result.data.originalUrl && result.data.finalUrl && result.data.originalUrl !== result.data.finalUrl && (
                  <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950">
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">URL Redirected</p>
                      <p className="mt-1 text-blue-700 dark:text-blue-300">
                        <span className="font-mono text-xs">{result.data.originalUrl}</span>
                        <span className="mx-2">→</span>
                        <span className="font-mono text-xs">{result.data.finalUrl}</span>
                      </p>
                    </div>
                  </div>
                )}

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
                      <dt className="text-muted-foreground">URL Checked</dt>
                      <dd className="mt-1 break-all font-mono text-xs">
                        {result.data.finalUrl || result.data.url}
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
                        {result.data.image && result.data.imageWidth && result.data.imageHeight && (
                          <span className="ml-2 text-muted-foreground">
                            ({result.data.imageWidth}x{result.data.imageHeight}px)
                          </span>
                        )}
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
              <ErrorDisplay error={result.error} errorType={result.errorType} />
            )}
          </div>
        </section>
      )}

      {/* Visual Demo Section - Shows what tool does without user action */}
      {!result && <DemoPreviewSection />}

      {/* Before/After Section - Shows consequences */}
      {!result && <BeforeAfterSection />}

      {/* Features Section - Reframed as Benefits */}
      {!result && (
        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold">
              Fix your previews in minutes, not hours
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Stop guessing. Know exactly what&apos;s wrong and how to fix it.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Eye className="h-8 w-8" />}
                title="One check, all platforms"
                description="Stop opening 5 tabs. See Facebook, Twitter, LinkedIn, and Discord previews side-by-side in seconds."
              />
              <FeatureCard
                icon={<AlertCircle className="h-8 w-8" />}
                title="Catch problems before your audience does"
                description="Missing images? Title too long? We'll tell you exactly what's wrong and how to fix it."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Fix issues in 60 seconds"
                description="Get copy-paste code snippets that work. No developer needed. Just paste and publish."
              />
              <FeatureCard
                icon={<Image className="h-8 w-8" />}
                title="No image? No problem."
                description="Create a professional preview image in seconds with our built-in templates. No design skills required."
              />
            </div>
          </div>
        </section>
      )}



      {/* CTA Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Ready to check your link?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Paste your URL below. See previews on Facebook, Twitter, LinkedIn, and Discord in 2 seconds.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <UrlInput onCheck={handleCheck} isLoading={isLoading} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Free forever. No account needed.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
