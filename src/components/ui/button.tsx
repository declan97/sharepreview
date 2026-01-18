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
      "group relative inline-flex items-center justify-center font-medium",
      "rounded-xl transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "active:scale-[0.98]"
    );

    const variants = {
      default: cn(
        "bg-primary text-primary-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(249,115,22,0.2)]",
        "hover:bg-primary-hover hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_24px_rgba(249,115,22,0.3)]",
        "hover:-translate-y-0.5"
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground",
        "border border-border",
        "shadow-sm",
        "hover:bg-muted hover:border-muted-foreground/20"
      ),
      outline: cn(
        "border-2 border-border bg-transparent",
        "hover:bg-muted hover:border-primary/50",
        "hover:shadow-sm"
      ),
      ghost: cn(
        "hover:bg-muted hover:text-foreground",
        "text-muted-foreground"
      ),
      destructive: cn(
        "bg-destructive text-destructive-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(220,38,38,0.2)]",
        "hover:bg-destructive/90 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_24px_rgba(220,38,38,0.3)]"
      ),
    };

    const sizes = {
      default: "h-11 px-5 py-2.5 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-base",
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
          <>
            {children}
            {variant === "default" && (
              <span className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
