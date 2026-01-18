import { platformSpecs, type PlatformSpec } from "./platform-specs";

export interface ValidationIssue {
  type: "error" | "warning" | "info";
  message: string;
  field: string;
  platform?: string;
  suggestion?: string;
  truncatedValue?: string;  // For title/description truncation suggestions
}

export type ImageStatus =
  | { valid: true; contentType: string }
  | { valid: false; error: "not_found" | "not_image" | "timeout" | "error"; message: string };

export interface MetaData {
  url: string;
  originalUrl?: string;  // The URL user entered
  finalUrl?: string;     // The URL after redirects
  redirectCount?: number;
  title?: string;
  description?: string;
  image?: string;
  imageStatus?: ImageStatus;  // Whether the image URL is accessible
  siteName?: string;
  type?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageStatus?: ImageStatus;
  imageWidth?: number;              // Best available dimensions (actual if available, else declared)
  imageHeight?: number;
  declaredImageWidth?: number;      // From og:image:width meta tag
  declaredImageHeight?: number;     // From og:image:height meta tag
  actualImageWidth?: number;        // From probe-image-size
  actualImageHeight?: number;
  isJavaScriptRequired?: boolean;   // True if site appears to need JS to render
  jsRenderingReason?: string;       // Why we think JS is required
  detectedFramework?: string;       // Detected JS framework (Next.js, Nuxt, etc.)
  robotsMeta?: string;              // Content of robots meta tag
  canonicalUrl?: string;            // Canonical URL from meta tag
}

export function validateMetaData(meta: MetaData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // JavaScript rendering warning (show first as it affects everything)
  if (meta.isJavaScriptRequired) {
    issues.push({
      type: "warning",
      message: "This page may require JavaScript to render",
      field: "javascript",
      suggestion: meta.jsRenderingReason || "Social platforms cannot execute JavaScript. Meta tags should be in the initial HTML.",
    });
  }

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
  } else if (meta.imageStatus && !meta.imageStatus.valid) {
    // Image tag exists but URL is not accessible
    const errorMessages: Record<string, { message: string; suggestion: string }> = {
      not_found: {
        message: "Preview image URL returns 404 Not Found",
        suggestion: "The og:image URL points to an image that doesn't exist. Update it to a valid image URL.",
      },
      not_image: {
        message: "Preview image URL is not an image",
        suggestion: `The og:image URL returns ${meta.imageStatus.message.includes("content type") ? meta.imageStatus.message.split("returns ")[1] : "wrong content type"}. Ensure the URL points directly to an image file.`,
      },
      timeout: {
        message: "Preview image URL timed out",
        suggestion: "The image server is too slow to respond. Consider hosting the image on a faster CDN.",
      },
      error: {
        message: "Preview image URL is not accessible",
        suggestion: meta.imageStatus.message || "Could not verify the image URL. Ensure it's publicly accessible.",
      },
    };

    const errorInfo = errorMessages[meta.imageStatus.error] || errorMessages.error;
    issues.push({
      type: "error",
      message: errorInfo.message,
      field: "image",
      suggestion: errorInfo.suggestion,
    });
  }

  // Twitter image validation (if different from og:image)
  if (meta.twitterImage && meta.twitterImage !== meta.image && meta.twitterImageStatus && !meta.twitterImageStatus.valid) {
    issues.push({
      type: "warning",
      message: "Twitter image URL is not accessible",
      field: "twitterImage",
      suggestion: meta.twitterImageStatus.message || "The twitter:image URL could not be verified.",
    });
  }

  // Protocol mismatch detection (HTTPS page with HTTP image)
  if (meta.url && meta.image) {
    try {
      const pageUrl = new URL(meta.url);
      const imageUrl = new URL(meta.image);
      if (pageUrl.protocol === "https:" && imageUrl.protocol === "http:") {
        issues.push({
          type: "warning",
          message: "Mixed content: HTTPS page with HTTP image",
          field: "image",
          suggestion: "Your page uses HTTPS but the og:image uses HTTP. Some platforms may block or show a broken image. Use an HTTPS image URL instead.",
        });
      }
    } catch {
      // Invalid URLs, skip check
    }
  }

  // Image dimension mismatch detection (declared vs actual)
  if (meta.declaredImageWidth && meta.declaredImageHeight &&
      meta.actualImageWidth && meta.actualImageHeight) {
    const declaredWidth = meta.declaredImageWidth;
    const declaredHeight = meta.declaredImageHeight;
    const actualWidth = meta.actualImageWidth;
    const actualHeight = meta.actualImageHeight;

    // Check if dimensions differ by more than 5%
    const widthDiff = Math.abs(declaredWidth - actualWidth) / actualWidth;
    const heightDiff = Math.abs(declaredHeight - actualHeight) / actualHeight;

    if (widthDiff > 0.05 || heightDiff > 0.05) {
      issues.push({
        type: "warning",
        message: "Image dimensions don't match meta tags",
        field: "image",
        suggestion: `Your og:image:width/height (${declaredWidth}×${declaredHeight}) doesn't match the actual image (${actualWidth}×${actualHeight}). This can cause preview distortion. Update your meta tags to match the real dimensions.`,
      });
    }
  }

  // Robots/noindex detection
  if (meta.robotsMeta) {
    const robotsLower = meta.robotsMeta.toLowerCase();
    if (robotsLower.includes("noindex") || robotsLower.includes("none")) {
      issues.push({
        type: "warning",
        message: "Page has noindex directive",
        field: "robots",
        suggestion: "Your page has a noindex robots meta tag. Some social platforms may skip or ignore pages marked as noindex, preventing previews from working.",
      });
    }
  }

  // Canonical URL mismatch detection
  if (meta.canonicalUrl && meta.finalUrl) {
    try {
      const canonical = new URL(meta.canonicalUrl, meta.finalUrl).href;
      const final = new URL(meta.finalUrl).href;
      // Normalize by removing trailing slashes for comparison
      const normalizedCanonical = canonical.replace(/\/$/, "");
      const normalizedFinal = final.replace(/\/$/, "");
      if (normalizedCanonical !== normalizedFinal) {
        issues.push({
          type: "info",
          message: "Canonical URL differs from page URL",
          field: "canonical",
          suggestion: `The canonical URL (${meta.canonicalUrl}) differs from the page URL. Social platforms may show the canonical URL in previews instead.`,
        });
      }
    } catch {
      // Invalid URLs, skip check
    }
  }

  // Platform-specific validations
  for (const [, spec] of Object.entries(platformSpecs)) {
    validateForPlatform(meta, spec, issues);
  }

  return issues;
}

// Smart truncation that preserves whole words
function smartTruncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Try to truncate at a word boundary
  let truncated = text.substring(0, maxLength - 3); // Leave room for "..."
  const lastSpace = truncated.lastIndexOf(" ");

  // If there's a space in a reasonable position, truncate there
  if (lastSpace > maxLength * 0.6) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated.trimEnd() + "...";
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
    const truncated = smartTruncate(title, spec.titleMaxLength);
    issues.push({
      type: "warning",
      message: `Title may be truncated on ${spec.name}`,
      field: "title",
      platform,
      suggestion: `Your title is ${title.length} characters (${spec.name} limit: ${spec.titleMaxLength})`,
      truncatedValue: truncated,
    });
  }

  // Description length
  const description = meta.description || "";
  if (description.length > spec.descriptionMaxLength) {
    const truncated = smartTruncate(description, spec.descriptionMaxLength);
    issues.push({
      type: "info",
      message: `Description may be truncated on ${spec.name}`,
      field: "description",
      platform,
      suggestion: `Your description is ${description.length} characters (${spec.name} limit: ${spec.descriptionMaxLength})`,
      truncatedValue: truncated,
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

export type CodeFormat = "html" | "nextjs" | "nuxt" | "remix";

export function getMetaTagCode(meta: Partial<MetaData>, format: CodeFormat = "html"): string {
  switch (format) {
    case "nextjs":
      return getNextJsMetaCode(meta);
    case "nuxt":
      return getNuxtMetaCode(meta);
    case "remix":
      return getRemixMetaCode(meta);
    default:
      return getHtmlMetaCode(meta);
  }
}

function getHtmlMetaCode(meta: Partial<MetaData>): string {
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
    // Use detected dimensions if available, otherwise use recommended 1200x630
    const width = meta.imageWidth || 1200;
    const height = meta.imageHeight || 630;
    tags.push(`<meta property="og:image:width" content="${width}">`);
    tags.push(`<meta property="og:image:height" content="${height}">`);
  }

  if (meta.url) {
    tags.push(`<meta property="og:url" content="${meta.url}">`);
  }

  tags.push(`<meta property="og:type" content="website">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);

  return tags.join("\n");
}

function getNextJsMetaCode(meta: Partial<MetaData>): string {
  const width = meta.imageWidth || 1200;
  const height = meta.imageHeight || 630;

  const lines: string[] = [
    "// Add to your page.tsx or layout.tsx",
    "import type { Metadata } from 'next';",
    "",
    "export const metadata: Metadata = {",
  ];

  if (meta.title) {
    lines.push(`  title: "${escapeJs(meta.title)}",`);
  }
  if (meta.description) {
    lines.push(`  description: "${escapeJs(meta.description)}",`);
  }

  lines.push("  openGraph: {");
  if (meta.title) lines.push(`    title: "${escapeJs(meta.title)}",`);
  if (meta.description) lines.push(`    description: "${escapeJs(meta.description)}",`);
  if (meta.url) lines.push(`    url: "${meta.url}",`);
  lines.push('    type: "website",');
  if (meta.image) {
    lines.push("    images: [{");
    lines.push(`      url: "${meta.image}",`);
    lines.push(`      width: ${width},`);
    lines.push(`      height: ${height},`);
    lines.push("    }],");
  }
  lines.push("  },");

  lines.push("  twitter: {");
  lines.push('    card: "summary_large_image",');
  if (meta.title) lines.push(`    title: "${escapeJs(meta.title)}",`);
  if (meta.description) lines.push(`    description: "${escapeJs(meta.description)}",`);
  if (meta.image) lines.push(`    images: ["${meta.image}"],`);
  lines.push("  },");

  lines.push("};");

  return lines.join("\n");
}

function getNuxtMetaCode(meta: Partial<MetaData>): string {
  const width = meta.imageWidth || 1200;
  const height = meta.imageHeight || 630;

  const lines: string[] = [
    "// Add to your nuxt.config.ts or use useSeoMeta() in your component",
    "useSeoMeta({",
  ];

  if (meta.title) {
    lines.push(`  title: "${escapeJs(meta.title)}",`);
    lines.push(`  ogTitle: "${escapeJs(meta.title)}",`);
    lines.push(`  twitterTitle: "${escapeJs(meta.title)}",`);
  }
  if (meta.description) {
    lines.push(`  description: "${escapeJs(meta.description)}",`);
    lines.push(`  ogDescription: "${escapeJs(meta.description)}",`);
    lines.push(`  twitterDescription: "${escapeJs(meta.description)}",`);
  }
  if (meta.url) {
    lines.push(`  ogUrl: "${meta.url}",`);
  }
  lines.push('  ogType: "website",');
  if (meta.image) {
    lines.push(`  ogImage: "${meta.image}",`);
    lines.push(`  ogImageWidth: ${width},`);
    lines.push(`  ogImageHeight: ${height},`);
    lines.push(`  twitterImage: "${meta.image}",`);
  }
  lines.push('  twitterCard: "summary_large_image",');
  lines.push("});");

  return lines.join("\n");
}

function getRemixMetaCode(meta: Partial<MetaData>): string {
  const width = meta.imageWidth || 1200;
  const height = meta.imageHeight || 630;

  const lines: string[] = [
    "// Add to your route file",
    "import type { MetaFunction } from '@remix-run/node';",
    "",
    "export const meta: MetaFunction = () => {",
    "  return [",
  ];

  if (meta.title) {
    lines.push(`    { title: "${escapeJs(meta.title)}" },`);
    lines.push(`    { property: "og:title", content: "${escapeJs(meta.title)}" },`);
    lines.push(`    { name: "twitter:title", content: "${escapeJs(meta.title)}" },`);
  }
  if (meta.description) {
    lines.push(`    { name: "description", content: "${escapeJs(meta.description)}" },`);
    lines.push(`    { property: "og:description", content: "${escapeJs(meta.description)}" },`);
    lines.push(`    { name: "twitter:description", content: "${escapeJs(meta.description)}" },`);
  }
  if (meta.url) {
    lines.push(`    { property: "og:url", content: "${meta.url}" },`);
  }
  lines.push('    { property: "og:type", content: "website" },');
  if (meta.image) {
    lines.push(`    { property: "og:image", content: "${meta.image}" },`);
    lines.push(`    { property: "og:image:width", content: "${width}" },`);
    lines.push(`    { property: "og:image:height", content: "${height}" },`);
    lines.push(`    { name: "twitter:image", content: "${meta.image}" },`);
  }
  lines.push('    { name: "twitter:card", content: "summary_large_image" },');
  lines.push("  ];");
  lines.push("};");

  return lines.join("\n");
}

function escapeJs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
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
