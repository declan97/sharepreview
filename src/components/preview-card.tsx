"use client";

import { type MetaData, type ValidationIssue, getIssuesByPlatform } from "@/lib/validators";
import { type PlatformSpec } from "@/lib/platform-specs";
import { truncate, getDomain } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, ExternalLink, MonitorPlay } from "lucide-react";

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
      case "slack":
        return <SlackPreview title={title} description={description} image={image} siteName={siteName} url={meta.url} spec={platform} />;
      default:
        return <GenericPreview title={title} description={description} image={image} siteName={siteName} spec={platform} />;
    }
  };

  return (
    <div className="group overflow-hidden rounded-lg border bg-card transition-all hover:border-primary/20 hover:shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{platform.name}</h3>
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground border">
            Simulated
          </span>
        </div>
        {platformIssues.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            {platformIssues.filter((i) => i.type === "error").length > 0 && (
              <span className="flex items-center gap-1 text-destructive font-medium">
                <AlertCircle className="h-3.5 w-3.5" />
                {platformIssues.filter((i) => i.type === "error").length}
              </span>
            )}
            {platformIssues.filter((i) => i.type === "warning").length > 0 && (
              <span className="flex items-center gap-1 text-warning font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                {platformIssues.filter((i) => i.type === "warning").length}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-muted/10">
        {renderPreview()}
      </div>

      {platformIssues.length > 0 && (
        <div className="border-t bg-muted/30 px-4 py-3">
          <ul className="space-y-2">
            {platformIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                {issue.type === "error" && <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />}
                {issue.type === "warning" && <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />}
                {issue.type === "info" && <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                <span className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">{issue.message}</span>
                  {issue.suggestion && <span className="block mt-0.5 text-muted-foreground/80">{issue.suggestion}</span>}
                </span>
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
    <div className="overflow-hidden rounded-lg border shadow-sm bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-100 border-b">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <MonitorPlay className="h-8 w-8" />
            <span className="text-xs">No image</span>
          </div>
        </div>
      )}
      <div className="p-3 bg-white">
        <p className="text-[10px] uppercase text-gray-500 mb-0.5 font-sans">{siteName}</p>
        <h4 className="font-semibold text-[16px] leading-[20px] text-[#050505] font-sans antialiased mb-1">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[14px] leading-[20px] text-[#65676B] font-sans line-clamp-1">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}

function TwitterPreview({ title, description, image, url, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(207,217,222,1)] bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b border-[rgba(207,217,222,1)]">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-100 border-b border-[rgba(207,217,222,1)]">
           <div className="flex flex-col items-center gap-2 text-gray-400">
            <MonitorPlay className="h-8 w-8" />
            <span className="text-xs">No image</span>
          </div>
        </div>
      )}
      <div className="p-3">
        <h4 className="font-sans text-[15px] font-medium leading-5 text-[#0f1419] mb-0.5">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="font-sans text-[15px] leading-5 text-[#536471] mb-1">
          {truncate(description, 100)}
        </p>
        <p className="flex items-center gap-1 font-sans text-[15px] text-[#536471]">
          <ExternalLink className="h-3 w-3" />
          {getDomain(url || "")}
        </p>
      </div>
    </div>
  );
}

function LinkedInPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm bg-white">
      {image ? (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-gray-100 border-b">
           <div className="flex flex-col items-center gap-2 text-gray-400">
            <MonitorPlay className="h-8 w-8" />
            <span className="text-xs">No image</span>
          </div>
        </div>
      )}
      <div className="p-3 bg-white">
        <h4 className="font-sans text-[14px] font-semibold leading-[20px] text-[rgba(0,0,0,0.9)] mb-1">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <div className="flex items-center gap-1 text-[12px] text-[rgba(0,0,0,0.6)]">
           <span className="font-sans">{getDomain(siteName || "")}</span>
           <span>•</span>
           <span className="font-sans">1m reading time</span>
        </div>
      </div>
    </div>
  );
}

function DiscordPreview({ title, description, image, siteName, spec }: PlatformPreviewProps) {
  return (
    <div className="flex rounded-md border-l-[3px] border-[#E3E5E8] bg-[#F2F3F5] p-3 max-w-[432px]">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-[12px] leading-[1.375rem] text-[#4F545C] font-sans mb-1">
          {siteName}
        </p>
        <h4 className="text-[16px] font-semibold leading-[1.375rem] text-[#0690FA] hover:underline cursor-pointer font-sans mb-2">
          {truncate(title, spec.titleMaxLength)}
        </h4>
        <p className="text-[14px] leading-[1.125rem] text-[#2E3338] font-sans mb-2">
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

function SlackPreview({ title, description, image, siteName, url, spec }: PlatformPreviewProps) {
  return (
    <div className="flex gap-3 pl-3 border-l-4 border-[#E8E8E8]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-3.5 w-3.5 rounded bg-gray-200" />
          <span className="font-bold text-[15px] leading-[22px] text-[#1d1c1d]">{siteName}</span>
        </div>
         <h4 className="text-[15px] font-bold leading-[22px] text-[#1264a3] hover:underline cursor-pointer mb-1">
            {truncate(title, spec.titleMaxLength)}
         </h4>
         <p className="text-[15px] leading-[22px] text-[#1d1c1d] mb-1">
            {truncate(description, spec.descriptionMaxLength)}
         </p>
         {image && (
          <div className="mt-2 text-[15px] leading-[22px] text-[#1264a3] opacity-50 italic">
            [Linked image]
          </div>
         )}
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
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      {image && (
        <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100 border-b">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{siteName}</p>
        <h4 className="font-semibold text-sm mb-1">{truncate(title, spec.titleMaxLength)}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">
          {truncate(description, spec.descriptionMaxLength)}
        </p>
      </div>
    </div>
  );
}
