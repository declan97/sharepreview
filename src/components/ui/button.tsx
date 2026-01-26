"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "group relative inline-flex items-center justify-center font-semibold",
      "rounded-lg transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "active:scale-[0.98]"
    );

    const variants = {
      default: cn(
        "bg-primary text-primary-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(13,148,136,0.1)]",
        "hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(13,148,136,0.25)]",
        "hover:-translate-y-px"
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        "hover:bg-secondary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
        "hover:-translate-y-px"
      ),
      outline: cn(
        "border-2 border-border bg-transparent text-foreground",
        "hover:bg-muted hover:border-primary/40",
        "hover:shadow-sm"
      ),
      ghost: cn(
        "hover:bg-muted hover:text-foreground",
        "text-muted-foreground"
      ),
      destructive: cn(
        "bg-destructive text-destructive-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        "hover:bg-destructive/90 hover:shadow-[0_4px_12px_rgba(220,38,38,0.25)]",
        "hover:-translate-y-px"
      ),
    };

    const sizes = {
      default: "h-11 px-5 py-2.5 text-sm gap-2",
      sm: "h-9 px-4 text-xs gap-1.5",
      lg: "h-13 px-7 text-base gap-2.5",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Checking...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
