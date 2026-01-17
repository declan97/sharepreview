import { ConvexHttpClient } from "convex/browser";

// Initialize Convex HTTP client for server-side usage
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.warn(
    "[Convex] NEXT_PUBLIC_CONVEX_URL is not set. Waitlist will use fallback storage."
  );
}

export const convex = convexUrl ? new ConvexHttpClient(convexUrl) : null;
