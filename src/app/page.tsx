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
import {
  Eye,
  AlertCircle,
  Zap,
  Image,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [lastCheckedUrl, setLastCheckedUrl] = useState<string | null>(null);
  const platforms = getAllPlatforms();

  const handleCheck = async (url: string, forceRefresh = false) => {
    setIsLoading(true);
    setResult(null);
    setLastCheckedUrl(url);

    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, forceRefresh }),
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

  const handleRecheck = () => {
    if (lastCheckedUrl) {
      handleCheck(lastCheckedUrl, true);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b gradient-hero">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-primary/5 blur-2xl" />
          <div className="absolute -left-20 bottom-20 h-60 w-60 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="container relative mx-auto max-w-5xl px-4 py-20 lg:py-28">
          {/* Badge */}
          <div className="flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Free forever</span>
              <span className="text-muted-foreground">• No account needed</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Your link previews are{" "}
            <span className="relative inline-block">
              <span className="text-gradient">probably broken</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#f97316" />
                    <stop offset="1" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground lg:text-xl opacity-0 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Missing images. Wrong titles. Cut-off text. Find out in 2 seconds—and
            get copy-paste fixes that actually work.
          </p>

          {/* URL Input */}
          <div className="mx-auto mt-10 max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <UrlInput onCheck={handleCheck} isLoading={isLoading} />
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>100% free</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Results in 2 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>We don&apos;t store your URLs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-b bg-muted/30 px-4 py-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-8">
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">2,341</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  broken previews caught this week
                </div>
              </div>
              <div className="hidden h-12 w-px bg-border sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">5</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  platforms checked at once
                </div>
              </div>
              <div className="hidden h-12 w-px bg-border sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">&lt;2s</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  average check time
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <blockquote className="max-w-lg text-center">
              <p className="text-muted-foreground italic">
                &ldquo;Caught a missing OG image right before my Product Hunt launch.
                Would&apos;ve looked terrible.&rdquo;
              </p>
              <footer className="mt-2 text-sm font-medium text-foreground">
                — Startup founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="border-b bg-muted/20 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {result.success && result.data ? (
              <div className="space-y-8 animate-fade-up">
                {/* Recheck Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Results for</h2>
                    <p className="text-sm text-muted-foreground font-mono break-all">
                      {result.data.finalUrl || result.data.url}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRecheck}
                    disabled={isLoading}
                    className="shrink-0"
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    Recheck
                  </Button>
                </div>

                {/* Redirect Notice */}
                {result.data.originalUrl &&
                  result.data.finalUrl &&
                  result.data.originalUrl !== result.data.finalUrl && (
                    <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950/50">
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                          URL Redirected
                        </p>
                        <p className="mt-1 text-blue-700 dark:text-blue-300">
                          <span className="font-mono text-xs">
                            {result.data.originalUrl}
                          </span>
                          <span className="mx-2">→</span>
                          <span className="font-mono text-xs">
                            {result.data.finalUrl}
                          </span>
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
                    {platforms.map((platform, index) => (
                      <div
                        key={platform.id}
                        className="opacity-0 animate-scale-in"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <PreviewCard
                          meta={result.data!}
                          platform={platform}
                          issues={result.issues || []}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta Data Summary */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
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
                        {result.data.image &&
                          result.data.imageWidth &&
                          result.data.imageHeight && (
                            <span className="ml-2 text-muted-foreground">
                              ({result.data.imageWidth}x{result.data.imageHeight}
                              px)
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

      {/* Visual Demo Section */}
      {!result && <DemoPreviewSection />}

      {/* Before/After Section */}
      {!result && <BeforeAfterSection />}

      {/* Features Section */}
      {!result && (
        <section className="border-t bg-muted/20 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Fix your previews in minutes, not hours
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Stop guessing. Know exactly what&apos;s wrong and how to fix it.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="opacity-0 animate-fade-up stagger-1" style={{ animationFillMode: "forwards" }}>
                <FeatureCard
                  icon={<Eye className="h-7 w-7" />}
                  title="One check, all platforms"
                  description="Stop opening multiple tabs. See Facebook, Twitter, LinkedIn, Discord, and Slack previews side-by-side in seconds."
                />
              </div>
              <div className="opacity-0 animate-fade-up stagger-2" style={{ animationFillMode: "forwards" }}>
                <FeatureCard
                  icon={<AlertCircle className="h-7 w-7" />}
                  title="Catch problems early"
                  description="Missing images? Title too long? We'll tell you exactly what's wrong and how to fix it."
                />
              </div>
              <div className="opacity-0 animate-fade-up stagger-3" style={{ animationFillMode: "forwards" }}>
                <FeatureCard
                  icon={<Zap className="h-7 w-7" />}
                  title="Fix issues in 60 seconds"
                  description="Get copy-paste code snippets that work. No developer needed. Just paste and publish."
                />
              </div>
              <div className="opacity-0 animate-fade-up stagger-4" style={{ animationFillMode: "forwards" }}>
                <FeatureCard
                  icon={<Image className="h-7 w-7" />}
                  title="No image? No problem."
                  description="Create a professional preview image in seconds with our built-in templates. No design skills required."
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!result && (
        <section className="relative overflow-hidden px-4 py-20 lg:py-28">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="container relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to check your link?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Paste your URL below. See previews on Facebook, Twitter, LinkedIn,
              Discord, and Slack in 2 seconds.
            </p>
            <div className="mx-auto mt-10 max-w-xl">
              <UrlInput onCheck={handleCheck} isLoading={isLoading} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free forever. No account needed.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
