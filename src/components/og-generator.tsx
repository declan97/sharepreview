"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download, Copy, Check, RefreshCw } from "lucide-react";

const templates = [
  { id: "minimal", name: "Minimal", description: "Clean white background" },
  { id: "bold", name: "Bold", description: "Purple background, high contrast" },
  { id: "gradient", name: "Gradient", description: "Purple to blue gradient" },
  { id: "dark", name: "Dark", description: "Dark mode style" },
  { id: "nature", name: "Nature", description: "Green gradient" },
];

interface OgGeneratorProps {
  defaultTitle?: string;
  defaultDescription?: string;
  siteName?: string;
}

export function OgGenerator({
  defaultTitle = "",
  defaultDescription = "",
  siteName = "sharelint.com",
}: OgGeneratorProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [template, setTemplate] = useState("minimal");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const imageUrl = `/api/generate?title=${encodeURIComponent(title || "Your Title Here")}&description=${encodeURIComponent(description)}&template=${template}&siteName=${encodeURIComponent(siteName)}`;

  const handleCopyUrl = async () => {
    const fullUrl = `${window.location.origin}${imageUrl}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `og-image-${template}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          OG Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview */}
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[1.91/1] w-full">
            <img
              src={imageUrl}
              alt="OG Image Preview"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title"
              maxLength={100}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description (optional)
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              maxLength={150}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {description.length}/150 characters
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Template</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                    template === t.id
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleDownload} disabled={isGenerating}>
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Download PNG"}
          </Button>
          <Button variant="outline" onClick={handleCopyUrl}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </>
            )}
          </Button>
        </div>

        {/* Usage instructions */}
        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-medium">How to use</h4>
          <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
            <li>Customize your title and description above</li>
            <li>Choose a template that matches your brand</li>
            <li>Download the image or copy the URL</li>
            <li>Add the image to your page&apos;s og:image meta tag</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
