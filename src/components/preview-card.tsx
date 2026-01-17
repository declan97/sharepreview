"use client";

import { type MetaData, type ValidationIssue, getIssuesByPlatform } from "@/lib/validators";
import { type PlatformSpec } from "@/lib/platform-specs";
import { truncate, getDomain } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, ExternalLink } from "lucide-react";

interface PreviewCardProps {
  meta: MetaData;
  platform: PlatformSpec;
  issues: ValidationIssue[];
}

export function PreviewCard({ meta, platform, issues }: PreviewCardProps) {
  const platformIssues = getIssuesByPlatform(issues, platform.id);
  const title = meta.twitterTitle || meta.title || "No title";
  const description = meta.twitterDescription || meta.description || "";
  const image = meta.twitterImage || meta.image;
  const siteName = meta.siteName || getDomain(meta.url);

  const renderPreview = () => {
    switch (platform.id) {
      case "facebook":
        return <FacebookPreview title={title} description={description} image={image} siteName={siteName} spec={platform} />;
      case "twitter":
        return <TwitterPreview title={title} description={description} image={image} url={meta.url} spec={platform} />;
      case "linkedin":
        return <LinkedInPreview title={title} description={description} image={image} siteName={siteName} spec={platform} />;
      case "discord":
        return <DiscordPreview title={title} description={description} image={image} siteName={siteName} url={meta.url} spec={platform} />;
      default:
        return <GenericPreview title={title} description={description} image={image} siteName={siteName} spec={platform} />;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-semibold">{platform.name}</h3>
        {platformIssues.length > 0 && (
          <div className="flex items-center gap-1 text-sm">
            {platformIssues.filter((i) => i.type === "error").length > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertCircle className="h-4 w-4" />
                {platformIssues.filter((i) => i.type === "error").length}
              </span>
            )}
            {platformIssues.filter((i) => i.type === "warning").length > 0 && (
              <span className="ml-2 flex items-center gap-1 text-warning">
                <AlertTriangle className="h-4 w-4" />
                {platformIssues.filter((i) => i.type === "warning").length}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        {renderPreview()}
      </div>
      {platformIssues.length > 0 && (
        <div className="border-t bg-muted/50 px-4 py-3">
          <ul className="space-y-2">
            {platformIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                {issue.type === "error" && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                {issue.type === "warning" && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />}
                {issue.type === "info" && <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                <span className="text-muted-foreground">{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface PlatformPreviewProps {
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  url?: string;
  spec: PlatformSpec;
}

function FacebookPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ backgroundColor: spec.colors.card, borderColor: spec.colors.border }}
    >
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-200">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-200">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-3" style={{ backgroundColor: spec.colors.bg }}>
        <p className="text-xs uppercase text-gray-500">{siteName}</p>
        <h4
          className="mt-1 font-semibold leading-tight"
          style={{ color: spec.colors.text }}
        >
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="mt-1 text-sm text-gray-500">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}

function TwitterPreview({ title, description, image, url, spec }: PlatformPreviewProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: spec.colors.card, borderColor: spec.colors.border }}
    >
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-800">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <div className="p-3">
        <h4
          className="font-normal leading-tight"
          style={{ color: spec.colors.text }}
        >
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="mt-1 text-sm" style={{ color: "#71767b" }}>
          {truncate(description, 100)}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm" style={{ color: "#71767b" }}>
          <ExternalLink className="h-3 w-3" />
          {getDomain(url || "")}
        </p>
      </div>
    </div>
  );
}

function LinkedInPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ backgroundColor: spec.colors.card, borderColor: spec.colors.border }}
    >
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-200">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-200">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-3">
        <h4
          className="font-semibold leading-tight"
          style={{ color: spec.colors.text }}
        >
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="mt-1 text-xs text-gray-500">{siteName}</p>
      </div>
    </div>
  );
}

function DiscordPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div
      className="flex overflow-hidden rounded border-l-4 border-l-primary"
      style={{ backgroundColor: spec.colors.card }}
    >
      <div className="flex-1 p-4">
        <p className="text-xs font-medium" style={{ color: spec.colors.text }}>
          {siteName}
        </p>
        <h4
          className="mt-1 font-semibold leading-tight"
          style={{ color: spec.colors.link }}
        >
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="mt-2 text-sm" style={{ color: spec.colors.text }}>
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
      {image && (
        <div className="m-4 h-20 w-20 shrink-0 overflow-hidden rounded">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}

function GenericPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: spec.colors.border }}>
      {image && (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-200">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <p className="text-xs text-gray-500">{siteName}</p>
        <h4 className="mt-1 font-semibold">{truncate(title, spec.titleMaxLength)}</h4>
        <p className="mt-1 text-sm text-gray-500">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}
