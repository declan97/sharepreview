"use client";

import { Clock, Globe, ShieldAlert, Link2, AlertCircle, Server } from "lucide-react";
import { type ErrorType, ERROR_TYPES } from "@/lib/constants";

interface ErrorConfig {
  icon: typeof Clock;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const errorConfig: Record<ErrorType, ErrorConfig> = {
  [ERROR_TYPES.timeout]: {
    icon: Clock,
    title: "Request Timed Out",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  [ERROR_TYPES.dns]: {
    icon: Globe,
    title: "Domain Not Found",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
  [ERROR_TYPES.ssl]: {
    icon: ShieldAlert,
    title: "SSL Certificate Error",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  [ERROR_TYPES.notHtml]: {
    icon: Link2,
    title: "Not an HTML Page",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  [ERROR_TYPES.blocked]: {
    icon: ShieldAlert,
    title: "Access Denied",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
  [ERROR_TYPES.notFound]: {
    icon: AlertCircle,
    title: "Page Not Found",
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-50 dark:bg-gray-900",
    borderColor: "border-gray-200 dark:border-gray-700",
  },
  [ERROR_TYPES.serverError]: {
    icon: Server,
    title: "Server Error",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
  [ERROR_TYPES.network]: {
    icon: Globe,
    title: "Connection Failed",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
  [ERROR_TYPES.unknown]: {
    icon: AlertCircle,
    title: "Error",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
};

interface ErrorDisplayProps {
  error?: string;
  errorType?: ErrorType;
}

export function ErrorDisplay({ error, errorType }: ErrorDisplayProps) {
  const config = errorConfig[errorType || ERROR_TYPES.unknown];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-6`}>
      <div className="flex items-start gap-4">
        <div className={`rounded-lg p-2 ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${config.color}`}>{config.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {error || "Failed to fetch URL"}
          </p>
        </div>
      </div>
    </div>
  );
}
