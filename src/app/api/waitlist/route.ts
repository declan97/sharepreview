import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

// Initialize Convex client only if URL is configured
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
let convex: ConvexHttpClient | null = null;

if (convexUrl) {
  convex = new ConvexHttpClient(convexUrl);
}

// Fallback in-memory storage when Convex is not configured
const fallbackEmails: Set<string> = new Set();

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    let email: string | null = null;
    let source: string | undefined;

    // Handle both form submissions and JSON requests
    if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      email = formData.get("email") as string;
      source = (formData.get("source") as string) || "pricing";
    } else if (contentType?.includes("application/json")) {
      const body = await request.json();
      email = body.email;
      source = body.source || "api";
    } else {
      // Try to parse as form data anyway (for simple form submissions)
      try {
        const formData = await request.formData();
        email = formData.get("email") as string;
        source = (formData.get("source") as string) || "pricing";
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid request format" },
          { status: 400 }
        );
      }
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Store in Convex if available, otherwise use fallback
    if (convex) {
      try {
        // Use anyApi to avoid type generation requirement
        const { api } = await import("../../../../convex/_generated/api");
        const result = await convex.mutation(api.waitlist.addEmail, {
          email: normalizedEmail,
          source,
        });
        console.log(
          `[Waitlist] ${result.alreadySubscribed ? "Already subscribed" : "New signup"}: ${normalizedEmail}`
        );
      } catch (error) {
        console.error("[Waitlist] Convex error:", error);
        // Fall through to fallback
        fallbackEmails.add(normalizedEmail);
        console.log(`[Waitlist] Using fallback after Convex error`);
      }
    } else {
      // Fallback when Convex is not configured
      fallbackEmails.add(normalizedEmail);
      console.log(`[Waitlist] Fallback storage - New signup: ${normalizedEmail}`);
      console.log(`[Waitlist] Fallback total: ${fallbackEmails.size}`);
    }

    return redirectToThankYou(request);
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function redirectToThankYou(request: NextRequest) {
  // For form submissions, redirect to pricing page with success message
  const referer = request.headers.get("referer");

  if (referer) {
    const url = new URL(referer);
    url.searchParams.set("waitlist", "success");
    return NextResponse.redirect(url.toString());
  }

  // For API calls, return JSON
  return NextResponse.json({
    success: true,
    message:
      "You've been added to the waitlist! We'll notify you when Pro launches.",
  });
}

// GET endpoint to check waitlist count (for admin/debugging)
export async function GET() {
  if (convex) {
    try {
      const { api } = await import("../../../../convex/_generated/api");
      const result = await convex.query(api.waitlist.getCount, {});
      return NextResponse.json({ count: result.count, source: "convex" });
    } catch (error) {
      console.error("[Waitlist] Convex query error:", error);
    }
  }

  return NextResponse.json({
    count: fallbackEmails.size,
    source: "fallback",
  });
}
