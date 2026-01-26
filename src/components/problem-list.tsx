"use client";

import { type ValidationIssue, getGlobalIssues, getMetaTagCode, type MetaData, type CodeFormat } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, AlertTriangle, Info, Copy, Check, Code, Zap, Scissors } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { ClearCacheGuide } from "@/components/clear-cache-guide";

const FRAMEWORK_OPTIONS: { value: CodeFormat; label: string; framework?: string }[] = [
  { value: "html", label: "HTML" },
  { value: "nextjs", label: "Next.js", framework: "nextjs" },
  { value: "nuxt", label: "Nuxt", framework: "nuxt" },
  { value: "remix", label: "Remix", framework: "remix" },
];

interface ProblemListProps {
  issues: ValidationIssue[];
  meta: MetaData;
}

// Component for showing truncated text with copy button
function TruncatedSuggestion({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2 flex items-start gap-2 rounded-md bg-muted/50 p-2">
      <Scissors className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-1">Suggested version:</p>
        <p className="text-sm font-medium break-words">&ldquo;{text}&rdquo;</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 flex-shrink-0"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}

export function ProblemList({ issues, meta }: ProblemListProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const globalIssues = getGlobalIssues(issues);

  // Auto-detect initial format based on detected framework
  const initialFormat = useMemo<CodeFormat>(() => {
    if (meta.detectedFramework) {
      const match = FRAMEWORK_OPTIONS.find(opt => opt.framework === meta.detectedFramework);
      if (match) return match.value;
    }
    return "html";
  }, [meta.detectedFramework]);

  const [codeFormat, setCodeFormat] = useState<CodeFormat>(initialFormat);

  // Separate JS warning from other issues (it gets special treatment)
  const jsWarning = globalIssues.find((i) => i.field === "javascript");
  const otherIssues = globalIssues.filter((i) => i.field !== "javascript");

  const errors = otherIssues.filter((i) => i.type === "error");
  const warnings = otherIssues.filter((i) => i.type === "warning");
  const infos = otherIssues.filter((i) => i.type === "info");

  const copyMetaTags = async () => {
    const code = getMetaTagCode(meta, codeFormat);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metaTagCode = getMetaTagCode(meta, codeFormat);

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

  const issueCount = otherIssues.length;

  return (
    <div className="space-y-4">
      {/* JavaScript Rendering Warning - shown prominently */}
      {jsWarning && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900">
              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                {jsWarning.message}
              </h3>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                {jsWarning.suggestion}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {issueCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Issues Found
                <span className="rounded-full bg-muted px-2 py-0.5 text-sm font-normal">
                  {issueCount}
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
                <ul className="space-y-3 pl-6">
                  {warnings.map((issue, index) => (
                    <li key={index} className="text-sm">
                      <p className="font-medium">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="text-muted-foreground">{issue.suggestion}</p>
                      )}
                      {issue.truncatedValue && (
                        <TruncatedSuggestion text={issue.truncatedValue} />
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
                <ul className="space-y-3 pl-6">
                  {infos.map((issue, index) => (
                    <li key={index} className="text-sm">
                      <p className="text-muted-foreground">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="text-muted-foreground text-xs">{issue.suggestion}</p>
                      )}
                      {issue.truncatedValue && (
                        <TruncatedSuggestion text={issue.truncatedValue} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showCode && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Recommended Meta Tags</h4>
                  <div className="flex gap-1">
                    {FRAMEWORK_OPTIONS.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={codeFormat === opt.value ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setCodeFormat(opt.value)}
                      >
                        {opt.label}
                        {opt.framework === meta.detectedFramework && (
                          <span className="ml-1 text-[10px] opacity-60">•</span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
                {meta.detectedFramework && codeFormat !== "html" && (
                  <p className="text-xs text-muted-foreground">
                    Detected framework: {FRAMEWORK_OPTIONS.find(o => o.framework === meta.detectedFramework)?.label || meta.detectedFramework}
                  </p>
                )}
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                  <code>{metaTagCode}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <ClearCacheGuide />
    </div>
  );
}
