import * as cheerio from "cheerio";
import { type MetaData } from "./validators";

export interface ParseResult {
  success: boolean;
  data?: MetaData;
  error?: string;
  fetchTime?: number;
}

export async function parseMetaTags(url: string): Promise<ParseResult> {
  const startTime = Date.now();

  try {
    // Fetch the URL with a reasonable timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SharePreview/1.0; +https://sharepreview.com)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch URL: ${response.status} ${response.statusText}`,
        fetchTime: Date.now() - startTime,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      return {
        success: false,
        error: "URL does not return HTML content",
        fetchTime: Date.now() - startTime,
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract meta tags
    const meta: MetaData = {
      url: response.url, // Use final URL after redirects
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

    // Image dimensions if available
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

    return {
      success: true,
      data: meta,
      fetchTime: Date.now() - startTime,
    };
  } catch (error) {
    const fetchTime = Date.now() - startTime;

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          success: false,
          error: "Request timed out after 10 seconds",
          fetchTime,
        };
      }
      return {
        success: false,
        error: error.message,
        fetchTime,
      };
    }

    return {
      success: false,
      error: "An unknown error occurred",
      fetchTime,
    };
  }
}

export async function getImageDimensions(
  imageUrl: string
): Promise<{ width: number; height: number } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(imageUrl, {
      signal: controller.signal,
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SharePreview/1.0; +https://sharepreview.com)",
      },
    });

    clearTimeout(timeoutId);

    // Note: This is a simplified check. In production, you'd want to
    // actually fetch and analyze the image to get dimensions.
    // For now, we rely on og:image:width and og:image:height tags.

    return null;
  } catch {
    return null;
  }
}
