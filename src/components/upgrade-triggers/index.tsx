"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Bell,
  Clock,
  History,
  Rocket,
  Share2,
  Users,
  Zap,
  X,
} from "lucide-react";
import { useState } from "react";

interface UpgradeTriggerProps {
  onDismiss?: () => void;
  className?: string;
}

/**
 * Trigger 1: The "Ouch" Moment
 * Show when user's check reveals broken/missing preview
 */
export function OuchMomentTrigger({ onDismiss, className = "" }: UpgradeTriggerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={`rounded-xl border border-primary/20 bg-primary/5 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <AlertTriangle className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">
            This preview would have failed on LinkedIn and Twitter
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            With Pro, you&apos;d get alerted the moment this breaks—before your audience sees it.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/features/monitoring">
              <Button size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Enable monitoring for this URL
              </Button>
            </Link>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss();
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Trigger 2: The "Again" Moment
 * Show when user checks 3+ URLs in one session
 */
export function AgainMomentTrigger({
  checkCount,
  onDismiss,
  className = "",
}: UpgradeTriggerProps & { checkCount: number }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || checkCount < 3) return null;

  return (
    <div className={`rounded-lg border bg-muted/50 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-primary" />
          <p className="text-sm">
            <span className="font-medium">You&apos;ve checked {checkCount} URLs today.</span>{" "}
            <span className="text-muted-foreground">
              Pro users monitor their whole domain automatically.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/features/monitoring">
            <Button size="sm" variant="ghost" className="text-primary">
              See how it works
            </Button>
          </Link>
          {onDismiss && (
            <button
              onClick={() => {
                setDismissed(true);
                onDismiss();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Trigger 3: The "History" Moment
 * Show when user checks a URL they've checked before
 */
export function HistoryMomentTrigger({
  lastChecked,
  changes,
  onDismiss,
  className = "",
}: UpgradeTriggerProps & {
  lastChecked: string;
  changes: { label: string; status: "fixed" | "broken" | "changed" }[];
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const statusIcons = {
    fixed: "✓",
    broken: "✗",
    changed: "~",
  };

  const statusColors = {
    fixed: "text-success",
    broken: "text-destructive",
    changed: "text-yellow-600",
  };

  return (
    <div className={`rounded-xl border bg-card p-4 shadow-sm ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          <History className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-medium">You checked this URL {lastChecked}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pro users see what changed:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {changes.map((change, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={statusColors[change.status]}>
                  {statusIcons[change.status]}
                </span>
                <span>{change.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link href="/pricing">
              <Button size="sm" variant="outline">
                Unlock check history
              </Button>
            </Link>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss();
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Trigger 4: The "Team" Moment
 * Show when user tries to share results
 */
export function TeamMomentTrigger({
  onCopyTemporary,
  onDismiss,
  className = "",
}: UpgradeTriggerProps & { onCopyTemporary: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={`rounded-xl border bg-card p-4 shadow-sm ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Share this report</h3>
          </div>
          <div className="mt-4 space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
              <input
                type="radio"
                name="share-option"
                defaultChecked
                className="h-4 w-4 text-primary"
              />
              <div>
                <p className="font-medium">Copy link (expires in 24h)</p>
                <p className="text-sm text-muted-foreground">
                  Anyone with the link can view
                </p>
              </div>
            </label>
            <label className="flex cursor-not-allowed items-center gap-3 rounded-lg border border-dashed p-3 opacity-60">
              <input type="radio" name="share-option" disabled className="h-4 w-4" />
              <div>
                <p className="font-medium">
                  Permanent link + team comments{" "}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                    Pro
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Collaborate with your team
                </p>
              </div>
            </label>
            <label className="flex cursor-not-allowed items-center gap-3 rounded-lg border border-dashed p-3 opacity-60">
              <input type="radio" name="share-option" disabled className="h-4 w-4" />
              <div>
                <p className="font-medium">
                  Export as PDF{" "}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                    Pro
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Download a branded report
                </p>
              </div>
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={onCopyTemporary}>Copy temporary link</Button>
            <Link href="/pricing">
              <Button variant="outline">Upgrade for team sharing</Button>
            </Link>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss();
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Trigger 5: The "Pre-Launch" Moment
 * Show when URL contains launch-related keywords
 */
export function PreLaunchTrigger({ onDismiss, className = "" }: UpgradeTriggerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={`rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Rocket className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">Launching soon?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            47% of Product Hunt launches have broken previews in the first hour.
          </p>
          <p className="mt-2 text-sm text-foreground">
            Pro includes real-time monitoring during your launch window—we&apos;ll alert you
            if anything breaks.
          </p>
          <div className="mt-3">
            <Link href="/pricing">
              <Button size="sm">
                Get launch-day coverage
              </Button>
            </Link>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss();
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Trigger 6: The "Limit" Moment
 * Show when user approaches or hits daily limit
 */
export function LimitMomentTrigger({
  checksUsed,
  checksLimit,
  hoursUntilReset,
  onDismiss,
  className = "",
}: UpgradeTriggerProps & {
  checksUsed: number;
  checksLimit: number;
  hoursUntilReset: number;
}) {
  const [dismissed, setDismissed] = useState(false);
  const isAtLimit = checksUsed >= checksLimit;
  const isApproaching = checksUsed >= checksLimit - 1;

  if (dismissed || (!isAtLimit && !isApproaching)) return null;

  if (isAtLimit) {
    return (
      <div className={`rounded-xl border bg-card p-6 text-center shadow-sm ${className}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Daily limit reached</h3>
        <p className="mt-2 text-muted-foreground">
          You checked {checksUsed} URLs today. Come back in {hoursUntilReset} hours,
          or unlock unlimited checks now.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Most Pro users check 30+ URLs on their first day.
        </p>
        <div className="mt-4">
          <Link href="/pricing">
            <Button>Start 14-day free trial</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Approaching limit
  return (
    <div className={`rounded-lg border bg-yellow-500/5 border-yellow-500/20 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <p className="text-sm">
            <span className="font-medium">
              You&apos;ve used {checksUsed} of {checksLimit} free checks today.
            </span>{" "}
            <span className="text-muted-foreground">
              Resets in {hoursUntilReset} hours—or upgrade for unlimited.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pricing">
            <Button size="sm">Go unlimited for $12/mo</Button>
          </Link>
          {onDismiss && (
            <button
              onClick={() => {
                setDismissed(true);
                onDismiss();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Utility: Check if URL looks like a launch page
 */
export function isLaunchUrl(url: string): boolean {
  const launchKeywords = [
    "launch",
    "producthunt",
    "product-hunt",
    "beta",
    "coming-soon",
    "comingsoon",
    "waitlist",
    "prelaunch",
    "pre-launch",
    "new",
    "introducing",
  ];

  const lowerUrl = url.toLowerCase();
  return launchKeywords.some((keyword) => lowerUrl.includes(keyword));
}
