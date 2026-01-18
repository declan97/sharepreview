"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              "peer flex h-14 w-full rounded-xl border-2 bg-card px-5 py-3 text-base",
              "transition-all duration-200 ease-out",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
              error
                ? "border-destructive focus:border-destructive"
                : "border-border hover:border-muted-foreground/30 focus:border-primary focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Focus glow effect */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200",
              "peer-focus:opacity-100",
              error
                ? "shadow-[0_0_0_4px_rgba(220,38,38,0.1)]"
                : "shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
            )}
          />
        </div>
        {error && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
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
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
