"use client";

import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { isValidUrl, normalizeUrl } from "@/lib/utils";
import { Search, Link2, AlertCircle } from "lucide-react";

interface UrlInputProps {
  onCheck: (url: string) => void;
  isLoading?: boolean;
  initialUrl?: string;
  compact?: boolean;
}

export function UrlInput({
  onCheck,
  isLoading,
  initialUrl = "",
  compact = false,
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
          relative flex items-center rounded-xl border bg-card transition-all duration-200
          ${compact ? "p-1 shadow-sm" : "p-2 shadow-md"}
          ${isFocused
            ? "border-primary shadow-[0_0_0_3px_rgba(13,148,136,0.1)]"
            : error
              ? "border-destructive shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
              : "border-border hover:border-primary/40 hover:shadow-lg"
          }
        `}
      >
        {/* Input container */}
        <div className="flex flex-1 items-center gap-3 px-3">
          {!compact && (
            <Link2
              className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                isFocused ? "text-primary" : "text-muted-foreground"
              }`}
            />
          )}
          <input
            type="text"
            placeholder={compact ? "Check another URL..." : "Enter any URL to check..."}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            className={`
              flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60
              disabled:cursor-not-allowed disabled:opacity-50
              ${compact ? "h-9 text-sm" : "h-12 text-base md:text-lg"}
            `}
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          size={compact ? "sm" : "lg"}
          className={`
            shrink-0 transition-all
            ${compact ? "h-9 px-4" : "h-12 px-6 md:px-8"}
          `}
          isLoading={isLoading}
        >
          {!isLoading && <Search className={compact ? "h-4 w-4" : "h-5 w-5"} />}
          {(!compact || isLoading) && (isLoading ? "Checking..." : "Check")}
        </Button>
      </div>

      {/* Error message */}
      {error && !compact && (
        <div className="mt-3 flex items-center gap-2 text-sm text-destructive animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </form>
  );
}
