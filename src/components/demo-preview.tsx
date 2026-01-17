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

// Example data for SharePreview itself
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
    <section className="border-b bg-muted/30 px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            See the difference a good preview makes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The same link can look completely different across platforms.
            Here&apos;s how your content appears on each one.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <DemoFacebookPreview data={defaultDemoData} />
          <DemoTwitterPreview data={defaultDemoData} />
          <DemoLinkedInPreview data={defaultDemoData} />
          <DemoDiscordPreview data={defaultDemoData} />
        </div>

        <p className="mt-8 text-center text-muted-foreground">
          This is how{" "}
          <span className="font-medium text-foreground">SharePreview.com</span>{" "}
          appears on each platform.{" "}
          <strong className="text-foreground">
            What does your link look like?
          </strong>
        </p>
      </div>
    </section>
  );
}

function DemoFacebookPreview({ data }: { data: DemoData }) {
  const spec = platformSpecs.facebook;
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="font-semibold">Facebook</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-lg border"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/40">
                {data.siteName}
              </span>
            </div>
          </div>
          <div className="p-3" style={{ backgroundColor: spec.colors.bg }}>
            <p className="text-xs uppercase text-gray-500">{data.siteName}</p>
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
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="font-semibold">Twitter / X</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/50">
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
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="font-semibold">LinkedIn</span>
      </div>
      <div className="p-4">
        <div
          className="overflow-hidden rounded-lg border"
          style={{
            backgroundColor: spec.colors.card,
            borderColor: spec.colors.border,
          }}
        >
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/40">
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
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="font-semibold">Discord</span>
      </div>
      <div className="p-4">
        <div
          className="flex overflow-hidden rounded border-l-4 border-l-primary"
          style={{ backgroundColor: spec.colors.card }}
        >
          <div className="flex-1 p-4">
            <p className="text-xs font-medium" style={{ color: spec.colors.text }}>
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
          <div className="m-4 hidden h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-primary/20 sm:flex">
            <span className="text-xs font-bold text-primary/60">IMG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
