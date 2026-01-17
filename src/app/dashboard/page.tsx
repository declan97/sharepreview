import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OgGenerator } from "@/components/og-generator";
import { History, Crown, Link as LinkIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your link previews, view history, and generate OG images.",
};

export default function DashboardPage() {
  // In production, this would fetch real data from the database
  // For now, we'll show a placeholder state

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b bg-muted/30 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your link previews and generate OG images
              </p>
            </div>
            <Link href="/pricing">
              <Button>
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Checks Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0 / 5</div>
                <p className="text-sm text-muted-foreground">Free tier limit</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Free</div>
                <Link
                  href="/pricing"
                  className="text-sm text-primary hover:underline"
                >
                  Upgrade for unlimited
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recent Checks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4">
                    <LinkIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">No checks yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your recent URL checks will appear here.
                  </p>
                  <Link href="/" className="mt-4">
                    <Button variant="outline">Check a URL</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* OG Image Generator */}
            <OgGenerator />
          </div>
        </div>
      </section>

      {/* Sign In Prompt */}
      <section className="border-t bg-muted/30 px-4 py-12">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Sign in to save your history</h2>
          <p className="mt-4 text-muted-foreground">
            Create an account to save your check history, access the OG image
            generator, and unlock more features.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg">Sign in with Google</Button>
            <Button size="lg" variant="outline">
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
