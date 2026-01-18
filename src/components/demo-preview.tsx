"use client";

import { truncate, getDomain } from "@/lib/utils";
import { platformSpecs } from "@/lib/platform-specs";
import { ExternalLink } from "lucide-react";

interface DemoData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

const defaultDemoData: DemoData = {
  title: "SharePreview - Check Your Link Previews",
  description:
    "See how your links appear on Facebook, Twitter, LinkedIn, and Discord before you share. Fix broken previews in seconds.",
  image: "/og-image.png",
  url: "https://sharepreview.com",
  siteName: "SharePreview",
};

export function DemoPreviewSection() {
  return (
    <section className="border-b bg-muted/20 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Visual Preview
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            See the difference a good preview makes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The same link can look completely different across platforms.
            Here&apos;s how your content appears on each one.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <DemoFacebookPreview data={defaultDemoData} />
          </div>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <DemoTwitterPreview data={defaultDemoData} />
          </div>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <DemoLinkedInPreview data={defaultDemoData} />
          </div>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <DemoDiscordPreview data={defaultDemoData} />
          </div>
        </div>

        <p className="mt-10 text-center text-muted-foreground">
          This is how{" "}
          <span className="font-semibold text-foreground">SharePreview.com</span>{" "}
          appears on each platform.{" "}
          <span className="font-semibold text-primary">
            What does your link look like?
          </span>
        </p>
      </div>
    </section>
  );
}

function DemoFacebookPreview({ data }: { data: DemoData }) {
  const spec = platformSpecs.facebook;
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877f2] text-white">
          <span className="text-xs font-bold">f</span>
        </div>
        <span className="font-semibold">Facebook</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-[1.01]"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-amber-500/20">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/60">
                {data.siteName}
              </span>
            </div>
          </div>
          <div className="p-3" style={{ backgroundColor: spec.colors.bg }}>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {data.siteName}
            </p>
            <h4
              className="mt-1 font-semibold leading-tight"
              style={{ color: spec.colors.text }}
            >
              {truncate(data.title, spec.titleMaxLength)}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {truncate(data.description, spec.descriptionMaxLength)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoTwitterPreview({ data }: { data: DemoData }) {
  const spec = platformSpecs.twitter;
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
          <span className="text-xs font-bold">𝕏</span>
        </div>
        <span className="font-semibold">Twitter / X</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-2xl border transition-transform duration-300 group-hover:scale-[1.01]"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/40 via-primary/30 to-amber-500/30">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/70">
                {data.siteName}
              </span>
            </div>
          </div>
          <div className="p-3">
            <h4
              className="font-normal leading-tight"
              style={{ color: spec.colors.text }}
            >
              {truncate(data.title, spec.titleMaxLength)}
            </h4>
            <p className="mt-1 text-sm" style={{ color: "#71767b" }}>
              {truncate(data.description, 100)}
            </p>
            <p
              className="mt-1 flex items-center gap-1 text-sm"
              style={{ color: "#71767b" }}
            >
              <ExternalLink className="h-3 w-3" />
              {getDomain(data.url)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoLinkedInPreview({ data }: { data: DemoData }) {
  const spec = platformSpecs.linkedin;
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0077b5] text-white">
          <span className="text-xs font-bold">in</span>
        </div>
        <span className="font-semibold">LinkedIn</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-[1.01]"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/25 via-primary/15 to-amber-500/15">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/50">
                {data.siteName}
              </span>
            </div>
          </div>
          <div className="p-3">
            <h4
              className="font-semibold leading-tight"
              style={{ color: spec.colors.text }}
            >
              {truncate(data.title, spec.titleMaxLength)}
            </h4>
            <p className="mt-1 text-xs text-gray-500">{data.siteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoDiscordPreview({ data }: { data: DemoData }) {
  const spec = platformSpecs.discord;
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5865f2] text-white">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
        </div>
        <span className="font-semibold">Discord</span>
      </div>
      <div className="p-4">
        <div
          className="flex overflow-hidden rounded-lg border-l-4 border-l-primary transition-transform duration-300 group-hover:scale-[1.01]"
          style={{ backgroundColor: spec.colors.card }}
        >
          <div className="flex-1 p-4">
            <p
              className="text-xs font-medium"
              style={{ color: spec.colors.text }}
            >
              {data.siteName}
            </p>
            <h4
              className="mt-1 font-semibold leading-tight"
              style={{ color: spec.colors.link }}
            >
              {truncate(data.title, spec.titleMaxLength)}
            </h4>
            <p className="mt-2 text-sm" style={{ color: spec.colors.text }}>
              {truncate(data.description, spec.descriptionMaxLength)}
            </p>
          </div>
          <div className="m-4 hidden h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/30 to-amber-500/30 sm:flex">
            <span className="text-xs font-bold text-primary/60">IMG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
