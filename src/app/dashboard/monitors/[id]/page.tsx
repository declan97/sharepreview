"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  RefreshCw,
  Settings,
  Trash2,
  Eye,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

interface MonitorCheck {
  id: string;
  status: "healthy" | "warning" | "broken";
  issues: { type: string; message: string; field: string }[];
  title: string | null;
  description: string | null;
  image: string | null;
  checkedAt: string;
}

interface MonitorAlert {
  id: string;
  type: string;
  message: string;
  previousValue: string | null;
  currentValue: string | null;
  createdAt: string;
}

interface Monitor {
  id: string;
  url: string;
  nickname: string | null;
  status: "healthy" | "warning" | "broken";
  checkFrequency: string;
  alertsEnabled: boolean;
  lastCheckedAt: string | null;
  lastSnapshot: {
    title?: string;
    description?: string;
    image?: string;
  } | null;
  createdAt: string;
  checks: MonitorCheck[];
  alerts: MonitorAlert[];
}

export default function MonitorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [monitor, setMonitor] = useState<Monitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMonitor();
  }, [id]);

  const fetchMonitor = async () => {
    try {
      const response = await fetch(`/api/monitors/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to load monitor");
        return;
      }

      setMonitor(data.data);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!monitor) return;
    setIsRefreshing(true);

    try {
      const response = await fetch(`/api/monitors/${id}/check`, {
        method: "POST",
      });

      if (response.ok) {
        await fetchMonitor();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async () => {
    if (!monitor || !confirm("Are you sure you want to delete this monitor?")) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/monitors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/dashboard/monitors";
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      healthy: "bg-success/10 text-success",
      warning: "bg-yellow-500/10 text-yellow-600",
      broken: "bg-destructive/10 text-destructive",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${styles[status as keyof typeof styles] || styles.healthy}`}
      >
        {status === "healthy" && <CheckCircle2 className="h-4 w-4" />}
        {status === "warning" && <AlertTriangle className="h-4 w-4" />}
        {status === "broken" && <AlertTriangle className="h-4 w-4" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !monitor) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Monitor not found"}</p>
        <Link href="/dashboard/monitors">
          <Button variant="outline">Back to monitors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b bg-muted/30 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/dashboard/monitors"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to monitors
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">
                  {monitor.nickname || new URL(monitor.url).hostname}
                </h1>
                <StatusBadge status={monitor.status} />
              </div>
              <a
                href={monitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {monitor.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Check now
              </Button>
              <Link href={`/dashboard/monitors/${id}/settings`}>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Current State */}
            <div className="space-y-6 lg:col-span-2">
              {/* Current Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Current Preview Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitor.lastSnapshot ? (
                    <dl className="space-y-4">
                      <div>
                        <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          Title
                        </dt>
                        <dd className="mt-1 font-medium">
                          {monitor.lastSnapshot.title || "Not set"}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          Description
                        </dt>
                        <dd className="mt-1 text-sm">
                          {monitor.lastSnapshot.description || "Not set"}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ImageIcon className="h-4 w-4" />
                          Image
                        </dt>
                        <dd className="mt-1">
                          {monitor.lastSnapshot.image ? (
                            <a
                              href={monitor.lastSnapshot.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {monitor.lastSnapshot.image}
                            </a>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No image
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="text-muted-foreground">
                      No data yet. Click &quot;Check now&quot; to run the first check.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Check History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Check History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitor.checks.length === 0 ? (
                    <p className="text-muted-foreground">No checks yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {monitor.checks.map((check) => (
                        <div
                          key={check.id}
                          className="flex items-start gap-4 rounded-lg border p-4"
                        >
                          <div className="shrink-0">
                            {check.status === "healthy" && (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            )}
                            {check.status === "warning" && (
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            )}
                            {check.status === "broken" && (
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {check.status.charAt(0).toUpperCase() +
                                  check.status.slice(1)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formatRelativeTime(check.checkedAt)}
                              </span>
                            </div>
                            {check.issues.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {check.issues.map((issue, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {issue.message}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Info & Alerts */}
            <div className="space-y-6">
              {/* Monitor Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Monitor Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Check frequency</dt>
                      <dd className="font-medium">
                        {monitor.checkFrequency === "hourly" ? "Hourly" : "Daily"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Alerts</dt>
                      <dd className="font-medium">
                        {monitor.alertsEnabled ? "Enabled" : "Disabled"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Last checked</dt>
                      <dd className="font-medium">
                        {monitor.lastCheckedAt
                          ? formatRelativeTime(monitor.lastCheckedAt)
                          : "Never"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Created</dt>
                      <dd className="font-medium">
                        {formatDate(monitor.createdAt)}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitor.alerts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No alerts yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {monitor.alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                        >
                          <p className="text-sm font-medium">{alert.message}</p>
                          {(alert.previousValue || alert.currentValue) && (
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                              {alert.previousValue && (
                                <p>
                                  <span className="line-through">
                                    {alert.previousValue}
                                  </span>
                                </p>
                              )}
                              {alert.currentValue && (
                                <p>{alert.currentValue}</p>
                              )}
                            </div>
                          )}
                          <p className="mt-2 text-xs text-muted-foreground">
                            {formatRelativeTime(alert.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link
                    href={`/?url=${encodeURIComponent(monitor.url)}`}
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      Check preview now
                    </Button>
                  </Link>
                  <a
                    href={monitor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit URL
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
