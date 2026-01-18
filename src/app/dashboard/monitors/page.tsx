"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  MoreVertical,
  RefreshCw,
  Trash2,
  Settings,
  Search,
  Crown,
  ArrowRight,
} from "lucide-react";

interface Monitor {
  id: string;
  url: string;
  nickname: string | null;
  status: "healthy" | "warning" | "broken";
  lastCheckedAt: string | null;
  issueCount: number;
  issueMessage?: string;
}

// Demo data for the UI - in production this would come from the API
const demoMonitors: Monitor[] = [
  {
    id: "1",
    url: "https://example.com/launch",
    nickname: "Launch Page",
    status: "broken",
    lastCheckedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    issueCount: 2,
    issueMessage: "Image returned 404",
  },
  {
    id: "2",
    url: "https://example.com/blog/guide",
    nickname: "SEO Guide",
    status: "warning",
    lastCheckedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    issueCount: 1,
    issueMessage: "Title truncated on Twitter",
  },
  {
    id: "3",
    url: "https://example.com",
    nickname: "Homepage",
    status: "healthy",
    lastCheckedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    issueCount: 0,
  },
];

export default function MonitorsPage() {
  const [monitors, setMonitors] = useState<Monitor[]>(demoMonitors);
  const [newUrl, setNewUrl] = useState("");
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // In production, this would be fetched from the session/API
  const userPlan = "FREE"; // FREE | PRO | TEAM
  const monitorLimit = userPlan === "FREE" ? 0 : userPlan === "PRO" ? 25 : 100;
  const canAddMonitors = userPlan !== "FREE" && monitors.length < monitorLimit;

  const filteredMonitors = monitors.filter(
    (m) =>
      m.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nickname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCounts = {
    healthy: monitors.filter((m) => m.status === "healthy").length,
    warning: monitors.filter((m) => m.status === "warning").length,
    broken: monitors.filter((m) => m.status === "broken").length,
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !canAddMonitors) return;

    setIsAddingUrl(true);
    // In production, this would call the API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMonitor: Monitor = {
      id: Date.now().toString(),
      url: newUrl,
      nickname: null,
      status: "healthy",
      lastCheckedAt: null,
      issueCount: 0,
    };

    setMonitors([newMonitor, ...monitors]);
    setNewUrl("");
    setShowAddForm(false);
    setIsAddingUrl(false);
  };

  const handleRefresh = async (id: string) => {
    // In production, this would trigger a re-check via the API
    console.log("Refreshing monitor:", id);
  };

  const handleDelete = async (id: string) => {
    // In production, this would call the API
    setMonitors(monitors.filter((m) => m.id !== id));
  };

  const formatLastChecked = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  const StatusIcon = ({ status }: { status: Monitor["status"] }) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "broken":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
    }
  };

  const statusStyles = {
    healthy: "border-success/20 bg-success/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    broken: "border-destructive/20 bg-destructive/5",
  };

  // Free user view
  if (userPlan === "FREE") {
    return (
      <div className="flex flex-col">
        {/* Header */}
        <section className="border-b bg-muted/30 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Preview Monitor</h1>
                <p className="mt-2 text-muted-foreground">
                  Get alerted when your link previews break
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">
                  Monitoring is a Pro feature
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Upgrade to Pro to monitor up to 25 URLs and get instant alerts
                  when your link previews break.
                </p>
                <ul className="mt-6 space-y-2 text-left text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Daily automated checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Instant email alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    90-day check history
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Before/after comparisons
                  </li>
                </ul>
                <div className="mt-8 flex gap-4">
                  <Link href="/pricing">
                    <Button size="lg">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                  <Link href="/features/monitoring">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  14-day free trial • No credit card required
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  // Pro/Team user view
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b bg-muted/30 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Preview Monitor</h1>
              <p className="mt-2 text-muted-foreground">
                {monitors.length} of {monitorLimit} URLs monitored
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} disabled={!canAddMonitors}>
              <Plus className="mr-2 h-4 w-4" />
              Add URL
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b px-4 py-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.healthy}</p>
                <p className="text-sm text-muted-foreground">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.warning}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.broken}</p>
                <p className="text-sm text-muted-foreground">Need attention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          {/* Add URL Form */}
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add URL to monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddUrl} className="flex gap-4">
                  <Input
                    type="url"
                    placeholder="https://example.com/page"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={isAddingUrl}>
                    {isAddingUrl ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add URL"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          {monitors.length > 0 && (
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search monitors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Monitor List */}
          {monitors.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No monitors yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Add your first URL to start monitoring
                </p>
                <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add URL
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredMonitors.map((monitor) => (
                <div
                  key={monitor.id}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${statusStyles[monitor.status]}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                    <StatusIcon status={monitor.status} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{monitor.nickname || monitor.url}</p>
                      <a
                        href={monitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    {monitor.nickname && (
                      <p className="truncate text-sm text-muted-foreground">
                        {monitor.url}
                      </p>
                    )}
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      {monitor.issueMessage ? (
                        <span
                          className={
                            monitor.status === "broken"
                              ? "text-destructive"
                              : monitor.status === "warning"
                                ? "text-yellow-600"
                                : ""
                          }
                        >
                          {monitor.issueMessage}
                        </span>
                      ) : (
                        <span className="text-success">All platforms healthy</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Checked {formatLastChecked(monitor.lastCheckedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {monitor.status !== "healthy" && (
                      <Link href={`/?url=${encodeURIComponent(monitor.url)}`}>
                        <Button size="sm" variant="outline">
                          {monitor.status === "broken" ? "Fix Now" : "Review"}
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRefresh(monitor.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <div className="relative">
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                      {/* Dropdown menu would go here in production */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer info */}
          {monitors.length > 0 && (
            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Monitors are checked daily. Next check in approximately 18 hours.
              </p>
              <Link
                href="/dashboard/monitors/settings"
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Alert settings
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
