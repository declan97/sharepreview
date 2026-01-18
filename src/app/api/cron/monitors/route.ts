import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseMetaTags } from "@/lib/meta-parser";
import { validateMetaData } from "@/lib/validators";
import type { PrismaClient } from "@prisma/client";

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.warn("CRON_SECRET not set - cron jobs disabled");
    return false;
  }

  return authHeader === `Bearer ${cronSecret}`;
}

// POST /api/cron/monitors - Run scheduled checks for all monitors
// This should be called by a cron job (e.g., Vercel Cron) every hour
export async function POST(request: NextRequest) {
  // Verify the request is from our cron service
  if (!verifyCronSecret(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!prisma) {
    return NextResponse.json(
      { success: false, error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Find monitors that need checking
    // - Hourly monitors that haven't been checked in the last hour
    // - Daily monitors that haven't been checked in the last 24 hours
    const monitorsToCheck = await prisma.monitor.findMany({
      where: {
        OR: [
          {
            checkFrequency: "hourly",
            OR: [
              { lastCheckedAt: null },
              { lastCheckedAt: { lt: oneHourAgo } },
            ],
          },
          {
            checkFrequency: "daily",
            OR: [
              { lastCheckedAt: null },
              { lastCheckedAt: { lt: oneDayAgo } },
            ],
          },
        ],
      },
      include: {
        user: {
          select: { email: true, plan: true },
        },
      },
    });

    console.log(`Found ${monitorsToCheck.length} monitors to check`);

    const results = {
      total: monitorsToCheck.length,
      success: 0,
      failed: 0,
      alerts: 0,
    };

    // Process monitors in batches to avoid overwhelming the system
    const batchSize = 10;
    for (let i = 0; i < monitorsToCheck.length; i += batchSize) {
      const batch = monitorsToCheck.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (monitor) => {
          try {
            const checkResult = await runMonitorCheck(monitor, prisma!);
            if (checkResult.success) {
              results.success++;
              results.alerts += checkResult.alertsCreated;
            } else {
              results.failed++;
            }
          } catch (error) {
            console.error(`Error checking monitor ${monitor.id}:`, error);
            results.failed++;
          }
        })
      );

      // Small delay between batches to be nice to rate limits
      if (i + batchSize < monitorsToCheck.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Cron monitors error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

interface MonitorWithUser {
  id: string;
  url: string;
  nickname: string | null;
  status: string;
  alertsEnabled: boolean;
  lastSnapshot: string | null;
  user: {
    email: string | null;
    plan: string;
  };
}

async function runMonitorCheck(monitor: MonitorWithUser, db: PrismaClient) {
  // Fetch and parse the URL
  const result = await parseMetaTags(monitor.url);

  if (!result.success || !result.data) {
    // Create a check record for the failure
    await db.monitorCheck.create({
      data: {
        monitorId: monitor.id,
        status: "broken",
        issues: JSON.stringify([
          { type: "error", message: result.error || "Failed to fetch URL" },
        ]),
        snapshot: JSON.stringify({}),
        platformResults: JSON.stringify({}),
      },
    });

    // Update monitor status
    const previousStatus = monitor.status;
    await db.monitor.update({
      where: { id: monitor.id },
      data: {
        status: "broken",
        lastCheckedAt: new Date(),
      },
    });

    // Create alert if status changed and alerts are enabled
    let alertsCreated = 0;
    if (previousStatus !== "broken" && monitor.alertsEnabled) {
      await db.alert.create({
        data: {
          monitorId: monitor.id,
          type: "status_error",
          message: result.error || "URL is not accessible",
        },
      });
      alertsCreated++;

      // TODO: Send email notification
      // await sendAlertEmail(monitor, alert);
    }

    return { success: true, alertsCreated };
  }

  // Validate the meta data
  const issues = validateMetaData(result.data);

  // Determine status based on issues
  let status: "healthy" | "warning" | "broken" = "healthy";
  const hasErrors = issues.some((i) => i.type === "error");
  const hasWarnings = issues.some((i) => i.type === "warning");

  if (hasErrors) {
    status = "broken";
  } else if (hasWarnings) {
    status = "warning";
  }

  // Compare with previous snapshot
  const previousSnapshot = monitor.lastSnapshot
    ? JSON.parse(monitor.lastSnapshot)
    : null;
  const currentSnapshot = {
    title: result.data.title,
    description: result.data.description,
    image: result.data.image,
    imageStatus: result.data.imageStatus,
  };

  const changes = detectChanges(previousSnapshot, currentSnapshot);

  // Create the check record
  const check = await db.monitorCheck.create({
    data: {
      monitorId: monitor.id,
      status,
      issues: JSON.stringify(issues),
      snapshot: JSON.stringify(result.data),
      platformResults: JSON.stringify({}),
      title: result.data.title || null,
      description: result.data.description || null,
      image: result.data.image || null,
      imageStatus: result.data.imageStatus
        ? JSON.stringify(result.data.imageStatus)
        : null,
    },
  });

  // Create alerts for significant changes
  let alertsCreated = 0;
  if (changes.length > 0 && monitor.alertsEnabled) {
    const alertsToCreate = changes.filter((c) =>
      // Only alert on breaking changes, not all changes
      ["image_broken", "image_removed", "title_missing", "tags_removed"].includes(
        c.type
      )
    );

    await Promise.all(
      alertsToCreate.map((change) =>
        db.alert.create({
          data: {
            monitorId: monitor.id,
            checkId: check.id,
            type: change.type,
            message: change.message,
            previousValue: change.previousValue,
            currentValue: change.currentValue,
          },
        })
      )
    );

    alertsCreated = alertsToCreate.length;

    // TODO: Send email notifications for alerts
    // for (const alert of alertsToCreate) {
    //   await sendAlertEmail(monitor, alert);
    // }
  }

  // Update monitor
  await db.monitor.update({
    where: { id: monitor.id },
    data: {
      status,
      lastCheckedAt: new Date(),
      lastSnapshot: JSON.stringify(currentSnapshot),
    },
  });

  return { success: true, alertsCreated };
}

interface Change {
  type: string;
  message: string;
  previousValue: string | null;
  currentValue: string | null;
}

function detectChanges(
  previous: {
    title?: string;
    description?: string;
    image?: string;
    imageStatus?: { valid: boolean };
  } | null,
  current: {
    title?: string;
    description?: string;
    image?: string;
    imageStatus?: { valid: boolean };
  }
): Change[] {
  const changes: Change[] = [];

  if (!previous) {
    // First check - check for issues with current state
    if (current.imageStatus && !current.imageStatus.valid) {
      changes.push({
        type: "image_broken",
        message: "Preview image is not accessible",
        previousValue: null,
        currentValue: current.image || null,
      });
    }
    return changes;
  }

  // Title changes
  if (previous.title && !current.title) {
    changes.push({
      type: "title_missing",
      message: "Page title was removed",
      previousValue: previous.title,
      currentValue: null,
    });
  }

  // Description changes
  if (previous.description && !current.description) {
    changes.push({
      type: "description_missing",
      message: "Description was removed",
      previousValue: previous.description,
      currentValue: null,
    });
  }

  // Image changes
  if (previous.image && !current.image) {
    changes.push({
      type: "image_removed",
      message: "Preview image was removed",
      previousValue: previous.image,
      currentValue: null,
    });
  }

  // Image became broken
  if (
    previous.imageStatus?.valid &&
    current.imageStatus &&
    !current.imageStatus.valid
  ) {
    changes.push({
      type: "image_broken",
      message: "Preview image is no longer accessible",
      previousValue: previous.image || null,
      currentValue: current.image || null,
    });
  }

  return changes;
}

// Also support GET for Vercel Cron which uses GET by default
export async function GET(request: NextRequest) {
  return POST(request);
}
