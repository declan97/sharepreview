import * as cheerio from "cheerio";
import probe from "probe-image-size";
import { type MetaData, type ImageStatus } from "./validators";

export interface ParseResult {
  success: boolean;
  data?: MetaData;
  error?: string;
  errorType?: "timeout" | "dns" | "ssl" | "not_html" | "blocked" | "not_found" | "server_error" | "network" | "unknown";
  fetchTime?: number;
}

// Custom error types for specific error handling
interface FetchErrorDetails {
  type: ParseResult["errorType"];
  message: string;
}

function categorizeError(error: unknown, url: string): FetchErrorDetails {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const name = error.name;

    // Timeout
    if (name === "AbortError" || message.includes("timeout") || message.includes("aborted")) {
      return { type: "timeout", message: "Request timed out after 10 seconds. The server may be slow or unresponsive." };
    }

    // DNS errors
    if (message.includes("getaddrinfo") || message.includes("enotfound") || message.includes("dns")) {
      try {
        const hostname = new URL(url).hostname;
        return { type: "dns", message: `Could not resolve domain "${hostname}". Check if the URL is spelled correctly.` };
      } catch {
        return { type: "dns", message: "Could not resolve the domain. Check if the URL is spelled correctly." };
      }
    }

    // SSL/TLS errors
    if (message.includes("ssl") || message.includes("tls") || message.includes("certificate") ||
        message.includes("cert") || message.includes("unable to verify") || message.includes("self signed") ||
        message.includes("eproto") || message.includes("depth zero")) {
      return { type: "ssl", message: "SSL certificate error. The site may have an invalid or expired certificate." };
    }

    // Connection refused/reset
    if (message.includes("econnrefused") || message.includes("econnreset") || message.includes("connection refused")) {
      return { type: "network", message: "Connection refused. The server may be down or blocking requests." };
    }

    // Network errors
    if (message.includes("network") || message.includes("enetunreach") || message.includes("ehostunreach")) {
      return { type: "network", message: "Network error. Could not establish a connection to the server." };
    }

    // Fetch failed (generic)
    if (message.includes("fetch failed")) {
      return { type: "network", message: "Failed to connect to the server. It may be down or blocking our requests." };
    }

    return { type: "unknown", message: error.message };
  }

  return { type: "unknown", message: "An unknown error occurred while fetching the URL." };
}

async function validateImageUrl(imageUrl: string): Promise<ImageStatus> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(imageUrl, {
      signal: controller.signal,
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SharePreview/1.0; +https://sharepreview.com)",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        return { valid: false, error: "not_found", message: "Image URL returns 404 Not Found" };
      }
      if (response.status === 403) {
        return { valid: false, error: "error", message: "Image URL returns 403 Forbidden - access denied" };
      }
      return { valid: false, error: "error", message: `Image URL returns ${response.status} ${response.statusText}` };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return { valid: false, error: "not_image", message: `Image URL returns ${contentType || "unknown"} content type, not an image` };
    }

    return { valid: true, contentType };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { valid: false, error: "timeout", message: "Image URL request timed out" };
    }
    return { valid: false, error: "error", message: "Could not verify image URL" };
  }
}

export async function getImageDimensions(
  imageUrl: string
): Promise<{ width: number; height: number } | null> {
  try {
    const result = await probe(imageUrl, {
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SharePreview/1.0; +https://sharepreview.com)",
      },
    });

    return { width: result.width, height: result.height };
  } catch {
    // If probe fails, return null - we'll still show the image but without dimension info
    return null;
  }
}

interface JavaScriptDetectionResult {
  isRequired: boolean;
  reason?: string;
}

function detectJavaScriptRendering($: cheerio.Root, html: string): JavaScriptDetectionResult {
  // Check for common SPA framework indicators
  const bodyContent = $("body").text().trim();
  const bodyHtml = $("body").html() || "";

  // Very minimal body content (SPAs often have empty bodies that get filled by JS)
  const hasMinimalContent = bodyContent.length < 100;

  // Check for "noscript" tags that indicate JS is needed
  const hasNoscriptWarning = $("noscript").length > 0 &&
    ($("noscript").text().toLowerCase().includes("javascript") ||
     $("noscript").text().toLowerCase().includes("enable") ||
     $("noscript").text().toLowerCase().includes("browser"));

  // Check for React root elements
  const hasReactRoot = $("#root").length > 0 || $("#__next").length > 0 || $("[data-reactroot]").length > 0;

  // Check for Vue/Nuxt markers
  const hasVueMarkers = $("#__nuxt").length > 0 || $("#app").length > 0 && $("[data-v-").length === 0;

  // Check for Angular markers
  const hasAngularMarkers = $("app-root").length > 0 || $("[ng-app]").length > 0 || $("[ng-version]").length > 0;

  // Check for SvelteKit markers
  const hasSvelteMarkers = $("[data-sveltekit]").length > 0;

  // Check if body only contains script tags and empty divs
  const onlyScriptsAndDivs = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<div[^>]*>\s*<\/div>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .trim().length < 50;

  // Check for JSON state hydration (common in SPAs)
  const hasHydrationState = html.includes("__NEXT_DATA__") ||
    html.includes("__NUXT__") ||
    html.includes("window.__INITIAL_STATE__") ||
    html.includes("window.__PRELOADED_STATE__");

  // Determine if JS is likely required
  if (hasMinimalContent && (hasReactRoot || hasVueMarkers || hasAngularMarkers || hasSvelteMarkers)) {
    let framework = "JavaScript";
    if (hasReactRoot) framework = html.includes("__NEXT_DATA__") ? "Next.js" : "React";
    else if (hasVueMarkers) framework = html.includes("__NUXT__") ? "Nuxt" : "Vue";
    else if (hasAngularMarkers) framework = "Angular";
    else if (hasSvelteMarkers) framework = "SvelteKit";

    return {
      isRequired: true,
      reason: `This appears to be a ${framework} application. Meta tags may be rendered client-side, which social platforms cannot read.`
    };
  }

  if (hasMinimalContent && onlyScriptsAndDivs) {
    return {
      isRequired: true,
      reason: "Page body is mostly empty with JavaScript. Content appears to be rendered client-side, which social platforms cannot read."
    };
  }

  if (hasNoscriptWarning && hasMinimalContent) {
    return {
      isRequired: true,
      reason: "This site indicates JavaScript is required. Meta tags may not be visible to social platform crawlers."
    };
  }

  // Warn if hydration state exists but content does exist (SSR with client hydration - usually fine)
  if (hasHydrationState && !hasMinimalContent) {
    return {
      isRequired: false,
      reason: undefined // SSR is fine, no warning needed
    };
  }

  return { isRequired: false };
}

export async function parseMetaTags(url: string): Promise<ParseResult> {
  const startTime = Date.now();
  const originalUrl = url;

  try {
    // Fetch the URL with a reasonable timeout
    // We manually handle redirects to count them
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let redirectCount = 0;
    let currentUrl = url;
    let response: Response;

    // Follow redirects manually to count them
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SharePreview/1.0; +https://sharepreview.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
      });

      // Calculate redirect count by comparing URLs
      if (response.url !== url) {
        // Simple heuristic: if URL changed, there was at least one redirect
        // For more accurate counting, we'd need to use redirect: "manual" and follow ourselves
        redirectCount = 1;
        currentUrl = response.url;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      const errorDetails = categorizeError(error, url);
      return {
        success: false,
        error: errorDetails.message,
        errorType: errorDetails.type,
        fetchTime: Date.now() - startTime,
      };
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const fetchTime = Date.now() - startTime;
      if (response.status === 404) {
        return {
          success: false,
          error: "Page not found (404). The URL may be incorrect or the page has been removed.",
          errorType: "not_found",
          fetchTime,
        };
      }
      if (response.status === 403) {
        return {
          success: false,
          error: "Access forbidden (403). The server is blocking our request.",
          errorType: "blocked",
          fetchTime,
        };
      }
      if (response.status === 401) {
        return {
          success: false,
          error: "Authentication required (401). The page requires login to access.",
          errorType: "blocked",
          fetchTime,
        };
      }
      if (response.status >= 500) {
        return {
          success: false,
          error: `Server error (${response.status}). The server is experiencing issues.`,
          errorType: "server_error",
          fetchTime,
        };
      }
      return {
        success: false,
        error: `Failed to fetch URL: ${response.status} ${response.statusText}`,
        errorType: "unknown",
        fetchTime,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      return {
        success: false,
        error: `URL returned ${contentType || "unknown content type"}, not HTML. Social previews only work with HTML pages.`,
        errorType: "not_html",
        fetchTime: Date.now() - startTime,
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Detect JavaScript rendering issues
    const jsDetection = detectJavaScriptRendering($, html);

    // Extract meta tags
    const meta: MetaData = {
      url: response.url, // Use final URL after redirects
      originalUrl,
      finalUrl: response.url,
      redirectCount: response.url !== originalUrl ? redirectCount : 0,
      isJavaScriptRequired: jsDetection.isRequired,
      jsRenderingReason: jsDetection.reason,
    };

    // Open Graph tags
    meta.title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="og:title"]').attr("content") ||
      $("title").text() ||
      undefined;

    meta.description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      undefined;

    meta.image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="og:image"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content") ||
      undefined;

    meta.siteName =
      $('meta[property="og:site_name"]').attr("content") ||
      undefined;

    meta.type =
      $('meta[property="og:type"]').attr("content") ||
      undefined;

    meta.locale =
      $('meta[property="og:locale"]').attr("content") ||
      undefined;

    // Image dimensions from meta tags
    const imageWidth = $('meta[property="og:image:width"]').attr("content");
    const imageHeight = $('meta[property="og:image:height"]').attr("content");
    if (imageWidth) meta.imageWidth = parseInt(imageWidth, 10);
    if (imageHeight) meta.imageHeight = parseInt(imageHeight, 10);

    // Twitter tags
    meta.twitterCard =
      $('meta[name="twitter:card"]').attr("content") ||
      $('meta[property="twitter:card"]').attr("content") ||
      undefined;

    meta.twitterSite =
      $('meta[name="twitter:site"]').attr("content") ||
      $('meta[property="twitter:site"]').attr("content") ||
      undefined;

    meta.twitterCreator =
      $('meta[name="twitter:creator"]').attr("content") ||
      $('meta[property="twitter:creator"]').attr("content") ||
      undefined;

    meta.twitterTitle =
      $('meta[name="twitter:title"]').attr("content") ||
      $('meta[property="twitter:title"]').attr("content") ||
      undefined;

    meta.twitterDescription =
      $('meta[name="twitter:description"]').attr("content") ||
      $('meta[property="twitter:description"]').attr("content") ||
      undefined;

    meta.twitterImage =
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[property="twitter:image"]').attr("content") ||
      undefined;

    // Resolve relative image URLs
    if (meta.image && !meta.image.startsWith("http")) {
      try {
        meta.image = new URL(meta.image, meta.url).href;
      } catch {
        // Keep as is if URL resolution fails
      }
    }

    if (meta.twitterImage && !meta.twitterImage.startsWith("http")) {
      try {
        meta.twitterImage = new URL(meta.twitterImage, meta.url).href;
      } catch {
        // Keep as is if URL resolution fails
      }
    }

    // Validate image URLs and get dimensions in parallel
    const imageValidationPromises: Promise<void>[] = [];

    if (meta.image) {
      imageValidationPromises.push(
        (async () => {
          // Validate image URL is accessible
          meta.imageStatus = await validateImageUrl(meta.image!);

          // If image is valid and we don't have dimensions from meta tags, get them
          if (meta.imageStatus.valid && (!meta.imageWidth || !meta.imageHeight)) {
            const dimensions = await getImageDimensions(meta.image!);
            if (dimensions) {
              meta.imageWidth = dimensions.width;
              meta.imageHeight = dimensions.height;
            }
          }
        })()
      );
    }

    if (meta.twitterImage && meta.twitterImage !== meta.image) {
      imageValidationPromises.push(
        (async () => {
          meta.twitterImageStatus = await validateImageUrl(meta.twitterImage!);
        })()
      );
    }

    // Wait for all image validations to complete
    await Promise.all(imageValidationPromises);

    return {
      success: true,
      data: meta,
      fetchTime: Date.now() - startTime,
    };
  } catch (error) {
    const fetchTime = Date.now() - startTime;
    const errorDetails = categorizeError(error, url);

    return {
      success: false,
      error: errorDetails.message,
      errorType: errorDetails.type,
      fetchTime,
    };
  }
}
