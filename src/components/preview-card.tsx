"use client";

import { type MetaData, type ValidationIssue, getIssuesByPlatform } from "@/lib/validators";
import { type PlatformSpec } from "@/lib/platform-specs";
import { truncate, getDomain } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, ExternalLink, ImageOff, CheckCircle2 } from "lucide-react";

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

  const errorCount = platformIssues.filter((i) => i.type === "error").length;
  const warningCount = platformIssues.filter((i) => i.type === "warning").length;
  const hasIssues = errorCount > 0 || warningCount > 0;

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
      case "slack":
        return <SlackPreview title={title} description={description} image={image} siteName={siteName} url={meta.url} spec={platform} />;
      default:
        return <GenericPreview title={title} description={description} image={image} siteName={siteName} spec={platform} />;
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-2.5">
          <h3 className="font-semibold text-sm">{platform.name}</h3>
          {!hasIssues && (
            <span className="badge badge-success">
              <CheckCircle2 className="h-3 w-3" />
              Good
            </span>
          )}
        </div>
        {hasIssues && (
          <div className="flex items-center gap-2">
            {errorCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errorCount}
              </span>
            )}
            {warningCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-warning">
                <AlertTriangle className="h-3.5 w-3.5" />
                {warningCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="p-4 bg-muted/10">
        {renderPreview()}
      </div>

      {/* Issues */}
      {platformIssues.length > 0 && (
        <div className="border-t border-border bg-muted/20 px-4 py-3">
          <ul className="space-y-2">
            {platformIssues.slice(0, 3).map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                {issue.type === "error" && <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />}
                {issue.type === "warning" && <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />}
                {issue.type === "info" && <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />}
                <span className="text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">{issue.message}</span>
                </span>
              </li>
            ))}
            {platformIssues.length > 3 && (
              <li className="text-xs text-muted-foreground">
                +{platformIssues.length - 3} more issues
              </li>
            )}
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

function NoImagePlaceholder() {
  return (
    <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 border-b">
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <ImageOff className="h-8 w-8" />
        <span className="text-xs font-medium">No image</span>
      </div>
    </div>
  );
}

function FacebookPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <NoImagePlaceholder />
      )}
      <div className="p-3 bg-[#f2f3f5]">
        <p className="text-[11px] uppercase text-[#606770] mb-1 tracking-wide">{siteName}</p>
        <h4 className="font-semibold text-[16px] leading-[20px] text-[#1d2129] mb-1 line-clamp-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[14px] leading-[18px] text-[#606770] line-clamp-1">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}

function TwitterPreview({ title, description, image, url, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#cfd9de] bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b border-[#cfd9de]">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <NoImagePlaceholder />
      )}
      <div className="p-3">
        <h4 className="text-[15px] font-normal leading-5 text-[#0f1419] mb-1 line-clamp-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[15px] leading-5 text-[#536471] mb-1 line-clamp-2">
          {truncate(description, 100)}
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-[#536471]">
          <ExternalLink className="h-3 w-3" />
          {getDomain(url || "")}
        </p>
      </div>
    </div>
  );
}

function LinkedInPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <NoImagePlaceholder />
      )}
      <div className="p-3 bg-[#eef3f8]">
        <h4 className="text-[14px] font-semibold leading-[20px] text-[rgba(0,0,0,0.9)] mb-1 line-clamp-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[12px] text-[rgba(0,0,0,0.6)]">
          {getDomain(siteName || "")}
        </p>
      </div>
    </div>
  );
}

function DiscordPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="flex rounded-[4px] border-l-4 border-[#5865f2] bg-[#2f3136] p-4 max-w-[432px]">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-[12px] leading-[1.375rem] text-[#b9bbbe] mb-1">
          {siteName}
        </p>
        <h4 className="text-[16px] font-semibold leading-[1.375rem] text-[#00aff4] hover:underline cursor-pointer mb-2 line-clamp-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[14px] leading-[1.125rem] text-[#dcddde] line-clamp-3">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
      {image && (
        <div className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[4px] self-start">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      )}
    </div>
  );
}

function SlackPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="flex gap-3 pl-3 border-l-4 border-[#36c5f0] bg-white rounded-r-lg p-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <span className="font-bold text-[15px] leading-[22px] text-[#1d1c1d]">{siteName}</span>
        </div>
        <h4 className="text-[15px] font-bold leading-[22px] text-[#1264a3] hover:underline cursor-pointer mb-1 line-clamp-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[15px] leading-[22px] text-[#1d1c1d] line-clamp-2">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
      {image && (
        <div className="mt-1 h-[80px] w-[80px] shrink-0 overflow-hidden rounded-lg border border-gray-200">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      )}
    </div>
  );
}

function GenericPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {image && (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{siteName}</p>
        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{truncate(title, spec.titleMaxLength)}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}
