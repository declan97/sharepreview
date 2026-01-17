import { platformSpecs, type PlatformSpec } from "./platform-specs";

export interface ValidationIssue {
  type: "error" | "warning" | "info";
  message: string;
  field: string;
  platform?: string;
  suggestion?: string;
}

export interface MetaData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  type?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function validateMetaData(meta: MetaData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check required fields
  if (!meta.title) {
    issues.push({
      type: "error",
      message: "Missing page title",
      field: "title",
      suggestion: "Add an og:title meta tag to your page",
    });
  }

  if (!meta.description) {
    issues.push({
      type: "warning",
      message: "Missing description",
      field: "description",
      suggestion: "Add an og:description meta tag for better engagement",
    });
  }

  if (!meta.image) {
    issues.push({
      type: "error",
      message: "No preview image found",
      field: "image",
      suggestion: "Add an og:image meta tag with a 1200x630 image",
    });
  }

  // Platform-specific validations
  for (const [platformId, spec] of Object.entries(platformSpecs)) {
    validateForPlatform(meta, spec, issues);
  }

  return issues;
}

function validateForPlatform(
  meta: MetaData,
  spec: PlatformSpec,
  issues: ValidationIssue[]
): void {
  const platform = spec.id;

  // Title length
  const title = meta.title || "";
  if (title.length > spec.titleMaxLength) {
    issues.push({
      type: "warning",
      message: `Title may be truncated on ${spec.name}`,
      field: "title",
      platform,
      suggestion: `Keep title under ${spec.titleMaxLength} characters for ${spec.name}`,
    });
  }

  // Description length
  const description = meta.description || "";
  if (description.length > spec.descriptionMaxLength) {
    issues.push({
      type: "info",
      message: `Description may be truncated on ${spec.name}`,
      field: "description",
      platform,
      suggestion: `Keep description under ${spec.descriptionMaxLength} characters for ${spec.name}`,
    });
  }

  // Image dimensions (if available)
  if (meta.image && meta.imageWidth && meta.imageHeight) {
    if (spec.imageMinWidth && meta.imageWidth < spec.imageMinWidth) {
      issues.push({
        type: "warning",
        message: `Image too small for ${spec.name}`,
        field: "image",
        platform,
        suggestion: `Use an image at least ${spec.imageMinWidth}px wide for ${spec.name}`,
      });
    }

    // Check aspect ratio
    const actualRatio = meta.imageWidth / meta.imageHeight;
    const expectedRatio = spec.imageWidth / spec.imageHeight;
    const ratioDiff = Math.abs(actualRatio - expectedRatio);

    if (ratioDiff > 0.1) {
      issues.push({
        type: "warning",
        message: `Image aspect ratio not optimal for ${spec.name}`,
        field: "image",
        platform,
        suggestion: `Use a ${spec.imageRatio} aspect ratio (${spec.imageWidth}x${spec.imageHeight}px) for best results on ${spec.name}`,
      });
    }
  }

  // Twitter-specific checks
  if (platform === "twitter") {
    if (!meta.twitterCard) {
      issues.push({
        type: "info",
        message: "No Twitter card type specified",
        field: "twitterCard",
        platform,
        suggestion: 'Add <meta name="twitter:card" content="summary_large_image">',
      });
    }
  }
}

export function getMetaTagCode(meta: Partial<MetaData>): string {
  const tags: string[] = [];

  if (meta.title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(meta.title)}">`);
    tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}">`);
  }

  if (meta.description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(meta.description)}">`);
    tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}">`);
  }

  if (meta.image) {
    tags.push(`<meta property="og:image" content="${meta.image}">`);
    tags.push(`<meta name="twitter:image" content="${meta.image}">`);
    tags.push(`<meta property="og:image:width" content="1200">`);
    tags.push(`<meta property="og:image:height" content="630">`);
  }

  if (meta.url) {
    tags.push(`<meta property="og:url" content="${meta.url}">`);
  }

  tags.push(`<meta property="og:type" content="website">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);

  return tags.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getIssuesByPlatform(
  issues: ValidationIssue[],
  platform: string
): ValidationIssue[] {
  return issues.filter(
    (issue) => !issue.platform || issue.platform === platform
  );
}

export function getGlobalIssues(issues: ValidationIssue[]): ValidationIssue[] {
  return issues.filter((issue) => !issue.platform);
}
