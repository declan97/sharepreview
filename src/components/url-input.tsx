"use client";

import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { isValidUrl, normalizeUrl } from "@/lib/utils";
import { Search } from "lucide-react";

interface UrlInputProps {
  onCheck: (url: string) => void;
  isLoading?: boolean;
  initialUrl?: string;
}

export function UrlInput({ onCheck, isLoading, initialUrl = "" }: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState("");

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
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter a URL to preview (e.g., https://example.com)"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            error={error}
            className="h-14 text-lg"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8 text-lg"
          isLoading={isLoading}
        >
          {!isLoading && <Search className="mr-2 h-5 w-5" />}
          Check Preview
        </Button>
      </div>
    </form>
  );
}
