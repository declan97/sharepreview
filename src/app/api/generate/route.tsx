import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const templates = {
  minimal: {
    bg: "#ffffff",
    text: "#000000",
    accent: "#7c3aed",
  },
  bold: {
    bg: "#7c3aed",
    text: "#ffffff",
    accent: "#fbbf24",
  },
  gradient: {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    text: "#ffffff",
    accent: "#fbbf24",
  },
  dark: {
    bg: "#0a0a0a",
    text: "#ffffff",
    accent: "#8b5cf6",
  },
  nature: {
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    text: "#ffffff",
    accent: "#ffffff",
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title") || "Your Title Here";
  const description = searchParams.get("description") || "";
  const template = (searchParams.get("template") || "minimal") as keyof typeof templates;
  const siteName = searchParams.get("siteName") || "sharelint.com";

  const style = templates[template] || templates.minimal;
  const isGradient = style.bg.includes("gradient");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          background: style.bg,
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: style.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isGradient || template === "bold" ? "#000" : style.text}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: style.text,
            }}
          >
            {siteName}
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? "48px" : "64px",
              fontWeight: 700,
              color: style.text,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "28px",
                color: style.text,
                opacity: 0.8,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {description.length > 120
                ? description.slice(0, 120) + "..."
                : description}
            </p>
          )}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: style.accent,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
