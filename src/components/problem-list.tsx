"use client";

import { type ValidationIssue, getGlobalIssues, getMetaTagCode, type MetaData } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, AlertTriangle, Info, Copy, Check, Code } from "lucide-react";
import { useState } from "react";

interface ProblemListProps {
  issues: ValidationIssue[];
  meta: MetaData;
}

export function ProblemList({ issues, meta }: ProblemListProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const globalIssues = getGlobalIssues(issues);

  const errors = globalIssues.filter((i) => i.type === "error");
  const warnings = globalIssues.filter((i) => i.type === "warning");
  const infos = globalIssues.filter((i) => i.type === "info");

  const copyMetaTags = async () => {
    const code = getMetaTagCode(meta);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metaTagCode = getMetaTagCode(meta);

  if (globalIssues.length === 0) {
    return (
      <Card className="border-success/50 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Check className="h-5 w-5" />
            All checks passed!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your link previews look great on all platforms.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              Issues Found
              <span className="rounded-full bg-muted px-2 py-0.5 text-sm font-normal">
                {globalIssues.length}
              </span>
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                <Code className="mr-2 h-4 w-4" />
                {showCode ? "Hide Code" : "View Fix"}
              </Button>
              <Button variant="outline" size="sm" onClick={copyMetaTags}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Tags
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive">
                <AlertCircle className="h-4 w-4" />
                Critical Issues ({errors.length})
              </h4>
              <ul className="space-y-2 pl-6">
                {errors.map((issue, index) => (
                  <li key={index} className="text-sm">
                    <p className="font-medium">{issue.message}</p>
                    {issue.suggestion && (
                      <p className="text-muted-foreground">{issue.suggestion}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-warning">
                <AlertTriangle className="h-4 w-4" />
                Warnings ({warnings.length})
              </h4>
              <ul className="space-y-2 pl-6">
                {warnings.map((issue, index) => (
                  <li key={index} className="text-sm">
                    <p className="font-medium">{issue.message}</p>
                    {issue.suggestion && (
                      <p className="text-muted-foreground">{issue.suggestion}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {infos.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Info className="h-4 w-4" />
                Suggestions ({infos.length})
              </h4>
              <ul className="space-y-2 pl-6">
                {infos.map((issue, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    <p>{issue.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showCode && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold">Recommended Meta Tags</h4>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                <code>{metaTagCode}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
