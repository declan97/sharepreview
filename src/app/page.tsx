"use client";

import { useState } from "react";
import { UrlInput } from "@/components/url-input";
import { PreviewCard } from "@/components/preview-card";
import { ProblemList } from "@/components/problem-list";
import { DemoPreviewSection } from "@/components/demo-preview";
import { BeforeAfterSection } from "@/components/before-after";
import { getAllPlatforms } from "@/lib/platform-specs";
import { type MetaData, type ValidationIssue } from "@/lib/validators";
import { Eye, AlertCircle, Zap, Image } from "lucide-react";

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
      {/* Hero Section - New Copy */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your link previews are{" "}
            <span className="text-primary">probably broken</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            40% of shared links look terrible on social media. Missing images,
            cut-off titles, wrong descriptions. Check yours before your audience
            sees them.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <UrlInput onCheck={handleCheck} isLoading={isLoading} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free. No signup. Results in 2 seconds.
          </p>
        </div>
      </section>

      {/* Social Proof Section - Improved */}
      <section className="border-b bg-muted/20 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">10,847</div>
              <div className="text-muted-foreground">URLs checked this week</div>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2,341</div>
              <div className="text-muted-foreground">Issues found & fixed</div>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-muted-foreground">Platforms supported</div>
            </div>
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

      {/* User Personas Section */}
      {!result && (
        <section className="border-t px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold">
              Built for people who share content
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Whether you&apos;re publishing daily or launching a campaign, make
              every share count.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {/* Creators */}
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl">✍️</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Content Creators</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You spend hours on your content. Make sure the preview does it
                  justice. Check before every publish.
                </p>
              </div>

              {/* Marketers */}
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Marketers</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your links are your first impression. Broken previews = lower
                  CTR. Check campaigns before launch.
                </p>
              </div>

              {/* Developers */}
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Developers</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Debug meta tags without deploying. Test locally, catch issues
                  early. Integrate with our API.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platforms Section */}
      {!result && (
        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">All major platforms, one tool</h2>
            <p className="mt-4 text-muted-foreground">
              Each platform has different requirements. We check them all.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { name: "Facebook", size: "1200x630", chars: "60" },
                { name: "Twitter / X", size: "1200x628", chars: "70" },
                { name: "LinkedIn", size: "1200x627", chars: "70" },
                { name: "Discord", size: "1200x630", chars: "256" },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="rounded-xl border bg-card p-6 text-center"
                >
                  <span className="text-lg font-medium">{platform.name}</span>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {platform.size} px
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {platform.chars} char title
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!result && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Stop sharing broken links today
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Check any URL now. See exactly how it looks before your audience
              does. Free, instant, no signup.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Check Your Link Now
            </button>
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
