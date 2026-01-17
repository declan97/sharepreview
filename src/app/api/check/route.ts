import { NextRequest, NextResponse } from "next/server";
import { parseMetaTags } from "@/lib/meta-parser";
import { validateMetaData } from "@/lib/validators";
import { isValidUrl, normalizeUrl } from "@/lib/utils";

// Simple in-memory rate limiting for anonymous users
const anonymousChecks = new Map<string, { count: number; date: string }>();
const ANONYMOUS_LIMIT = 10; // Generous limit for MVP

function getAnonymousChecksToday(ip: string): number {
  const today = new Date().toDateString();
  const record = anonymousChecks.get(ip);

  if (!record || record.date !== today) {
    return 0;
  }

  return record.count;
}

function incrementAnonymousChecks(ip: string): void {
  const today = new Date().toDateString();
  const record = anonymousChecks.get(ip);

  if (!record || record.date !== today) {
    anonymousChecks.set(ip, { count: 1, date: today });
  } else {
    record.count += 1;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);

    if (!isValidUrl(normalizedUrl)) {
      return NextResponse.json(
        { success: false, error: "Invalid URL provided" },
        { status: 400 }
      );
    }

    // Simple rate limiting by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const anonymousCount = getAnonymousChecksToday(ip);

    if (anonymousCount >= ANONYMOUS_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          error: "Daily check limit reached. Please try again tomorrow.",
          limitReached: true,
        },
        { status: 429 }
      );
    }

    incrementAnonymousChecks(ip);

    // Parse meta tags from the URL
    const result = await parseMetaTags(normalizedUrl);

    if (!result.success || !result.data) {
      return NextResponse.json({
        success: false,
        error: result.error || "Failed to fetch URL",
        errorType: result.errorType,
        fetchTime: result.fetchTime,
      });
    }

    // Validate the meta data
    const issues = validateMetaData(result.data);

    return NextResponse.json({
      success: true,
      data: result.data,
      issues,
      fetchTime: result.fetchTime,
      originalUrl: normalizedUrl,
    });
  } catch (error) {
    console.error("Check API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
