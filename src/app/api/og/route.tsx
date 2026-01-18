import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            opacity: 0.1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Logo and brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
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
              fontSize: "36px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            ShareLint
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 40px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
            }}
          >
            See it before you{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              share it
            </span>
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              margin: "0",
              maxWidth: "700px",
            }}
          >
            Check how your links look on Facebook, Twitter, LinkedIn, Discord & Slack
          </p>
        </div>

        {/* Platform badges */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["Facebook", "Twitter", "LinkedIn", "Discord", "Slack"].map((platform) => (
            <div
              key={platform}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {platform}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#71717a",
            fontSize: "16px",
          }}
        >
          <span>Free link preview checker</span>
          <span>•</span>
          <span>sharelint.vercel.app</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
