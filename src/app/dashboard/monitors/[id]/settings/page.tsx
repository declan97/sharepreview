"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowLeft,
  Bell,
  Clock,
  Save,
  Loader2,
  Crown,
  Trash2,
} from "lucide-react";

interface Monitor {
  id: string;
  url: string;
  nickname: string | null;
  status: string;
  checkFrequency: string;
  alertsEnabled: boolean;
}

export default function MonitorSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [monitor, setMonitor] = useState<Monitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [nickname, setNickname] = useState("");
  const [checkFrequency, setCheckFrequency] = useState("daily");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Assume user plan - in production this would come from session
  const [userPlan] = useState<"FREE" | "PRO" | "TEAM">("PRO");

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
      setNickname(data.data.nickname || "");
      setCheckFrequency(data.data.checkFrequency);
      setAlertsEnabled(data.data.alertsEnabled);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/monitors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname || null,
          checkFrequency,
          alertsEnabled,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save settings");
        return;
      }

      setMonitor(data.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this monitor? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/monitors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/dashboard/monitors";
      }
    } catch {
      setError("Failed to delete monitor");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !monitor) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error}</p>
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
        <div className="container mx-auto max-w-3xl">
          <Link
            href={`/dashboard/monitors/${id}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to monitor
          </Link>

          <h1 className="text-2xl font-bold">Monitor Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Configure how this URL is monitored and when you receive alerts.
          </p>
        </div>
      </section>

      {/* Settings Form */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-3xl space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Give your monitor a name to easily identify it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={monitor?.url || ""}
                  disabled
                  className="mt-1 bg-muted"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  URL cannot be changed. Delete and create a new monitor instead.
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Nickname (optional)</label>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g., Homepage, Blog, Product Page"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  A friendly name to help you identify this monitor.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Check Frequency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Check Frequency
              </CardTitle>
              <CardDescription>
                How often should we check this URL for changes?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                  <input
                    type="radio"
                    name="frequency"
                    value="daily"
                    checked={checkFrequency === "daily"}
                    onChange={() => setCheckFrequency("daily")}
                    className="h-4 w-4 text-primary"
                  />
                  <div>
                    <p className="font-medium">Daily</p>
                    <p className="text-sm text-muted-foreground">
                      Check once every 24 hours
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                    userPlan === "TEAM"
                      ? "cursor-pointer hover:bg-muted/50"
                      : "cursor-not-allowed opacity-60"
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value="hourly"
                    checked={checkFrequency === "hourly"}
                    onChange={() => userPlan === "TEAM" && setCheckFrequency("hourly")}
                    disabled={userPlan !== "TEAM"}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="flex items-center gap-2 font-medium">
                      Hourly
                      {userPlan !== "TEAM" && (
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                          Team
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check every hour for faster alerts
                    </p>
                  </div>
                  {userPlan !== "TEAM" && (
                    <Link href="/pricing">
                      <Button size="sm" variant="outline">
                        <Crown className="mr-1 h-3 w-3" />
                        Upgrade
                      </Button>
                    </Link>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alerts
              </CardTitle>
              <CardDescription>
                Control when and how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div>
                  <p className="font-medium">Enable alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when issues are detected
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={alertsEnabled}
                  onClick={() => setAlertsEnabled(!alertsEnabled)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    alertsEnabled ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all"
                    style={{
                      transform: alertsEnabled ? "translateX(20px)" : "translateX(0)",
                    }}
                  />
                </button>
              </label>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {success && (
                <p className="text-sm text-success">Settings saved successfully!</p>
              )}
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for this monitor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div>
                  <p className="font-medium">Delete this monitor</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this monitor and all its check history.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
