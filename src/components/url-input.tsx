"use client";

import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { isValidUrl, normalizeUrl } from "@/lib/utils";
import { Search, Link2 } from "lucide-react";

interface UrlInputProps {
  onCheck: (url: string) => void;
  isLoading?: boolean;
  initialUrl?: string;
}

export function UrlInput({
  onCheck,
  isLoading,
  initialUrl = "",
}: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    const normalizedUrl = normalizeUrl(url.trim());

    if (!isValidUrl(normalizedUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    onCheck(normalizedUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`
          relative flex flex-col gap-3 rounded-2xl border-2 bg-card p-2
          shadow-lg transition-all duration-300 ease-out
          sm:flex-row sm:items-center
          ${
            isFocused
              ? "border-primary shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
              : error
                ? "border-destructive"
                : "border-border hover:border-muted-foreground/30"
          }
        `}
      >
        {/* Input container */}
        <div className="flex flex-1 items-center gap-3 px-2">
          <Link2
            className={`h-5 w-5 flex-shrink-0 transition-colors ${
              isFocused ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <input
            type="text"
            placeholder="Paste your URL here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            className="h-12 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:text-lg"
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          size="lg"
          className="h-12 w-full shrink-0 px-6 text-base sm:h-14 sm:w-auto sm:px-8"
          isLoading={isLoading}
        >
          {!isLoading && <Search className="mr-2 h-5 w-5" />}
          {isLoading ? "Checking..." : "Check Preview"}
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-destructive animate-fade-in">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Hint text */}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Try: <span className="font-mono">https://example.com</span> or{" "}
        <span className="font-mono">blog.company.com/article</span>
      </p>
    </form>
  );
}
