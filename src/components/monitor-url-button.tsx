"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Check, Loader2, Crown } from "lucide-react";

interface MonitorUrlButtonProps {
  url: string;
  hasIssues?: boolean;
  className?: string;
}

export function MonitorUrlButton({ url, hasIssues, className = "" }: MonitorUrlButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsUpgrade, setNeedsUpgrade] = useState(false);

  const handleAddMonitor = async () => {
    setIsAdding(true);
    setError(null);

    try {
      const response = await fetch("/api/monitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.upgradeRequired) {
          setNeedsUpgrade(true);
        } else if (response.status === 409) {
          // Already being monitored
          setAdded(true);
        } else {
          setError(data.error || "Failed to add monitor");
        }
        return;
      }

      setAdded(true);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  if (needsUpgrade) {
    return (
      <div className={`rounded-xl border border-primary/20 bg-primary/5 p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">
              {hasIssues
                ? "Get alerted if this breaks again"
                : "Monitor this URL for changes"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade to Pro to monitor up to 25 URLs and get instant alerts when previews break.
            </p>
            <div className="mt-3 flex gap-2">
              <Link href="/pricing">
                <Button size="sm">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </Link>
              <Link href="/features/monitoring">
                <Button size="sm" variant="ghost">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (added) {
    return (
      <div className={`rounded-xl border border-success/20 bg-success/5 p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
            <Check className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-success">URL added to monitoring</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ll check this URL daily and alert you if anything breaks.
            </p>
          </div>
          <Link href="/dashboard/monitors">
            <Button size="sm" variant="outline">
              View monitors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border bg-muted/30 p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-medium">
            {hasIssues
              ? "Get alerted if this breaks again"
              : "Monitor this URL for changes"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll check daily and notify you if the preview breaks.
          </p>
        </div>
        <Button onClick={handleAddMonitor} disabled={isAdding}>
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Monitor URL
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
