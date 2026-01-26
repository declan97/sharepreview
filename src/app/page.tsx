"use client";

import { useState } from "react";
import Link from "next/link";
import { UrlInput } from "@/components/url-input";
import { PreviewCard } from "@/components/preview-card";
import { ProblemList } from "@/components/problem-list";
import { ErrorDisplay } from "@/components/error-display";
import { getAllPlatforms } from "@/lib/platform-specs";
import { type MetaData, type ValidationIssue } from "@/lib/validators";
import { type ErrorType } from "@/lib/constants";
import {
  CheckCircle2,
  Clock,
  Shield,
  RefreshCw,
  ArrowRight,
  Zap,
  Globe,
  Code2,
  AlertTriangle,
  Eye,
  Copy,
  Bell,
  ChevronDown,
  ChevronUp,
  Users,
  Megaphone,
  Building2,
  Sparkles,
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

// FAQ Data
const faqItems = [
  {
    question: "Why do my link previews look different on each platform?",
    answer: "Each social platform has its own requirements for meta tags. Facebook uses Open Graph tags, Twitter uses its own Twitter Card tags, and platforms like Discord and Slack have their own preferences. SharePreview checks all of them and shows you exactly what each platform will display.",
  },
  {
    question: "Do I need to sign up to use SharePreview?",
    answer: "No. Basic URL checking is completely free and requires no account. Just paste your URL and get instant results. Pro features like monitoring and alerts require a free account.",
  },
  {
    question: "How accurate are the previews?",
    answer: "We fetch your actual meta tags and render pixel-perfect previews that match what each platform displays. We also validate image dimensions, character limits, and other platform-specific requirements.",
  },
  {
    question: "What frameworks do you support for fix code?",
    answer: "We detect your framework automatically and generate code for Next.js (Metadata API), Nuxt (useSeoMeta), Remix (MetaFunction), and plain HTML. Just copy and paste the fix.",
  },
  {
    question: "Why isn't my preview updating after I fixed the tags?",
    answer: "Social platforms cache previews aggressively. Use our platform-specific cache clearing guides, or upgrade to Pro for automated cache busting when your monitors detect changes.",
  },
];

export default function Home() {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"idle" | "fetching" | "parsing" | "validating">("idle");
  const [lastCheckedUrl, setLastCheckedUrl] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const platforms = getAllPlatforms();

  const handleCheck = async (url: string, forceRefresh = false) => {
    setIsLoading(true);
    setLoadingStep("fetching");
    setResult(null);
    setLastCheckedUrl(url);

    try {
      const progressTimer = setTimeout(() => setLoadingStep("parsing"), 600);
      const valTimer = setTimeout(() => setLoadingStep("validating"), 1200);

      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, forceRefresh }),
      });

      const data = await response.json();

      clearTimeout(progressTimer);
      clearTimeout(valTimer);

      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Failed to check URL. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setLoadingStep("idle");
    }
  };

  const handleRecheck = () => {
    if (lastCheckedUrl) {
      handleCheck(lastCheckedUrl, true);
    }
  };

  const errorCount = result?.issues?.filter(i => i.type === "error").length || 0;
  const warningCount = result?.issues?.filter(i => i.type === "warning").length || 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header when results exist */}
      {result && (
        <header className="sticky top-16 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-lg lg:top-[4.5rem]">
          <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
            <div className="hidden items-center gap-3 text-sm md:flex">
              <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md truncate max-w-[200px]">
                {lastCheckedUrl && new URL(lastCheckedUrl).hostname}
              </span>
              {errorCount === 0 && warningCount === 0 ? (
                <span className="badge badge-success">
                  <CheckCircle2 className="h-3 w-3" />
                  All Clear
                </span>
              ) : (
                <span className="badge badge-warning">
                  {errorCount + warningCount} issues
                </span>
              )}
            </div>
            <div className="w-full max-w-md">
              <UrlInput
                onCheck={handleCheck}
                isLoading={isLoading}
                compact
                initialUrl={lastCheckedUrl || ""}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRecheck}
              disabled={isLoading}
              className="hidden sm:flex"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </header>
      )}

      <main className="flex flex-col">
        {/* Hero Section */}
        {!result && (
          <section className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 grid-pattern-fade opacity-60" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

            <div className="relative px-4 py-20 md:py-28 lg:py-32">
              <div className="container mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-muted/30 px-4 py-1.5 text-xs font-medium text-primary mb-8 animate-fade-up">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Free link preview checker</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 animate-fade-up stagger-1">
                  Stop sharing
                  <br />
                  <span className="text-primary">broken link previews</span>
                </h1>

                {/* Subhead */}
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-up stagger-2">
                  See exactly how your links appear on Facebook, Twitter, LinkedIn, Discord, and Slack.
                  Get copy-paste fixes for any issues in seconds.
                </p>

                {/* Input */}
                <div className="mx-auto max-w-xl animate-fade-up stagger-3">
                  <UrlInput onCheck={handleCheck} isLoading={isLoading} />

                  {isLoading && (
                    <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                      <div className="relative">
                        <div className="h-5 w-5 rounded-full border-2 border-primary/30" />
                        <div className="absolute inset-0 h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      </div>
                      <span className="font-mono text-xs">
                        {loadingStep === "fetching" && "Fetching HTML..."}
                        {loadingStep === "parsing" && "Parsing meta tags..."}
                        {loadingStep === "validating" && "Running validations..."}
                      </span>
                    </div>
                  )}

                  <p className="mt-4 text-sm text-muted-foreground">
                    Try it with any URL — no signup required
                  </p>
                </div>

                {/* Trust indicators */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground animate-fade-up stagger-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-muted">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <span>10,000+ URLs checked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-muted">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span>Results in 2 seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>Privacy focused</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {result && (
          <section className="px-4 py-8 animate-fade-in">
            <div className="container mx-auto max-w-7xl">
              {result.success && result.data ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Sidebar */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Summary Card */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Analysis Result
                        </h2>
                        {errorCount === 0 && warningCount === 0 ? (
                          <span className="badge badge-success">Passed</span>
                        ) : (
                          <span className="badge badge-warning">{errorCount + warningCount} issues</span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                          errorCount === 0 && warningCount === 0
                            ? "bg-success-muted"
                            : "bg-warning-muted"
                        }`}>
                          {errorCount === 0 && warningCount === 0 ? (
                            <CheckCircle2 className="h-7 w-7 text-success" />
                          ) : (
                            <Code2 className="h-7 w-7 text-warning" />
                          )}
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {errorCount === 0 && warningCount === 0 ? "All Good!" : `${errorCount + warningCount} Issues`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {result.data.finalUrl && new URL(result.data.finalUrl).hostname}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                          <p className="text-lg font-bold">{platforms.length}</p>
                          <p className="text-xs text-muted-foreground">Platforms</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                          <p className="text-lg font-bold text-destructive">{errorCount}</p>
                          <p className="text-xs text-muted-foreground">Errors</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                          <p className="text-lg font-bold text-warning">{warningCount}</p>
                          <p className="text-xs text-muted-foreground">Warnings</p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRecheck}
                        disabled={isLoading}
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Re-check URL
                      </Button>
                    </div>

                    {/* Issues List */}
                    <ProblemList issues={result.issues || []} meta={result.data} />

                    {/* Raw Metadata */}
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Extracted Metadata
                      </h3>
                      <dl className="space-y-4 text-sm">
                        <div>
                          <dt className="text-muted-foreground mb-1.5 flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5" />
                            Title
                          </dt>
                          <dd className="font-mono text-xs bg-muted/50 p-3 rounded-lg break-words leading-relaxed">
                            {result.data.title || <span className="text-muted-foreground italic">Missing</span>}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground mb-1.5">Description</dt>
                          <dd className="font-mono text-xs bg-muted/50 p-3 rounded-lg break-words line-clamp-4 leading-relaxed">
                            {result.data.description || <span className="text-muted-foreground italic">Missing</span>}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground mb-1.5">Image Dimensions</dt>
                          <dd className="font-mono text-xs bg-muted/50 p-3 rounded-lg">
                            {result.data.imageWidth
                              ? `${result.data.imageWidth} × ${result.data.imageHeight} px`
                              : <span className="text-muted-foreground italic">Unknown</span>
                            }
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Right Content: Previews */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight">Platform Previews</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          See how your link appears across social platforms
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {platforms.map((platform, index) => (
                        <div
                          key={platform.id}
                          className="opacity-0 animate-slide-up"
                          style={{
                            animationDelay: `${index * 0.06}s`,
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
                </div>
              ) : (
                <div className="max-w-2xl mx-auto mt-12">
                  <ErrorDisplay error={result.error} errorType={result.errorType} />
                  <div className="mt-8 text-center">
                    <Button variant="outline" onClick={() => setResult(null)}>
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      Try Another URL
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Content Sections (Only on Hero) */}
        {!result && (
          <>
            {/* Problem Section */}
            <section className="border-t border-border bg-muted/20 py-20">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    Broken previews cost you clicks
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    You spend hours crafting the perfect post, only to have it show up with a missing image,
                    truncated title, or worse — a blank preview that nobody clicks.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-4">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="font-semibold mb-2">Missing Images</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Posts without images get up to 80% fewer clicks. Wrong dimensions? The platform crops it badly or ignores it entirely.
                    </p>
                  </div>

                  <div className="rounded-xl border border-warning/20 bg-warning/5 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 mb-4">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <h3 className="font-semibold mb-2">Truncated Text</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Each platform has different character limits. Your carefully written headline gets cut off mid-word on LinkedIn but looks fine on Twitter.
                    </p>
                  </div>

                  <div className="rounded-xl border border-muted-foreground/20 bg-muted/30 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-4">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Stale Cache</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fixed your tags but the preview still looks wrong? Platforms cache aggressively. You need to know how to force a refresh.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="border-t border-border py-20">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    Fix your link previews in 3 steps
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    No more guessing. No more "post and pray." See exactly what needs fixing and get the code to fix it.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mx-auto mb-6">
                      1
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-muted mx-auto mb-4">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Paste Your URL</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Drop any URL into the checker. We fetch your page and extract all the meta tags that matter.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mx-auto mb-6">
                      2
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-muted mx-auto mb-4">
                      <Globe className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">See All Platforms</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      View pixel-perfect previews for Facebook, Twitter, LinkedIn, Discord, and Slack. Spot issues instantly.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mx-auto mb-6">
                      3
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-muted mx-auto mb-4">
                      <Copy className="h-6 w-6 text-warning" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Copy the Fix</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Get framework-specific code for Next.js, Nuxt, Remix, or HTML. Paste it into your codebase and deploy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="border-t border-border bg-muted/30 py-20">
              <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    Everything you need to nail link previews
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Built by developers who got tired of broken social cards. Every feature solves a real problem.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-muted mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">5 Platform Previews</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Facebook, Twitter, LinkedIn, Discord, and Slack. Each with platform-accurate rendering and validation rules.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-muted mb-4">
                      <Code2 className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Framework Detection</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We detect Next.js, Nuxt, Remix, Vue, React, and more. Get fix code that matches your stack exactly.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-muted mb-4">
                      <Zap className="h-6 w-6 text-warning" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Instant Analysis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Results in under 2 seconds. We fetch your page, probe image dimensions, and validate everything in one request.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info-muted mb-4">
                      <Eye className="h-6 w-6 text-info" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Image Validation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We check actual dimensions, aspect ratios, file sizes, and HTTPS. Know exactly why your image isn't showing.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-muted mb-4">
                      <Bell className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Monitoring (Pro)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Set up alerts for your important pages. Get notified when meta tags change or break unexpectedly.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-muted mb-4">
                      <Shield className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We don't store your URLs permanently. No tracking, no ads, no selling your data. Just a tool that works.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Who It's For Section */}
            <section className="border-t border-border py-20">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    Built for people who share links
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Whether you're shipping features or shipping campaigns, you need previews that convert.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-muted mx-auto mb-6">
                      <Code2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Developers</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Debug meta tags before your PM asks why the preview looks wrong in Slack. Get code that drops right into your codebase.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Framework-specific fix code</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Image dimension validation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>CI/CD integration (coming)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-muted mx-auto mb-6">
                      <Megaphone className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Marketers</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Preview campaigns before they go live. No more posting to a private group just to see what it looks like.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>All major platforms in one view</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Character limit warnings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Cache clearing guides</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning-muted mx-auto mb-6">
                      <Building2 className="h-8 w-8 text-warning" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Teams</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Monitor your most shared pages. Get alerts when meta tags change so broken previews don't slip through.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>URL monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Change alerts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span>Team collaboration (coming)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Proof / Stats Section */}
            <section className="border-t border-border bg-primary/5 py-16">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</p>
                    <p className="text-sm text-muted-foreground">URLs Checked</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">5</p>
                    <p className="text-sm text-muted-foreground">Platforms Supported</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">2s</p>
                    <p className="text-sm text-muted-foreground">Average Check Time</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">4</p>
                    <p className="text-sm text-muted-foreground">Framework Outputs</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="border-t border-border py-20">
              <div className="container mx-auto max-w-3xl px-4">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    Frequently asked questions
                  </h2>
                  <p className="text-muted-foreground">
                    Everything you need to know about fixing link previews.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                      >
                        <span className="font-medium pr-4">{item.question}</span>
                        {openFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="border-t border-border bg-gradient-to-b from-muted/30 to-background py-20">
              <div className="container mx-auto max-w-3xl px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-muted/30 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start checking for free</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to fix your link previews?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                  Stop guessing how your links look on social media.
                  Check any URL instantly — no signup required.
                </p>

                <div className="max-w-xl mx-auto mb-8">
                  <UrlInput onCheck={handleCheck} isLoading={isLoading} />
                </div>

                <p className="text-sm text-muted-foreground mb-8">
                  Or explore our guides:
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/guides/og-image-size"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    OG Image Size Guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    href="/guides/twitter-card-size"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    Twitter Card Guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    href="/fix/facebook-preview-not-showing"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    Fix Facebook Preview
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
