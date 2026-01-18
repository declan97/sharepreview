import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseMetaTags } from "@/lib/meta-parser";
import { validateMetaData, type ValidationIssue } from "@/lib/validators";

// POST /api/monitors/[id]/check - Manually trigger a check for a monitor
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
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

    // TypeScript narrowing doesn't work across closures, so create a local ref
    const db = prisma;

    const { id } = await params;

    // Get the monitor
    const monitor = await db.monitor.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!monitor) {
      return NextResponse.json(
        { success: false, error: "Monitor not found" },
        { status: 404 }
      );
    }

    // Run the check
    const result = await parseMetaTags(monitor.url);

    if (!result.success || !result.data) {
      // Create a check record for the failure
      const check = await db.monitorCheck.create({
        data: {
          monitorId: monitor.id,
          status: "broken",
          issues: JSON.stringify([{ type: "error", message: result.error || "Failed to fetch URL" }]),
          snapshot: JSON.stringify({}),
          platformResults: JSON.stringify({}),
        },
      });

      // Update monitor status
      await db.monitor.update({
        where: { id: monitor.id },
        data: {
          status: "broken",
          lastCheckedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          checkId: check.id,
          status: "broken",
          error: result.error,
        },
      });
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

    // Compare with previous snapshot for change detection
    const previousSnapshot = monitor.lastSnapshot ? JSON.parse(monitor.lastSnapshot) : null;
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
        platformResults: JSON.stringify({}), // TODO: Add platform-specific results
        title: result.data.title || null,
        description: result.data.description || null,
        image: result.data.image || null,
        imageStatus: result.data.imageStatus ? JSON.stringify(result.data.imageStatus) : null,
      },
    });

    // Create alerts for significant changes
    if (changes.length > 0 && monitor.alertsEnabled) {
      await Promise.all(
        changes.map((change) =>
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

    return NextResponse.json({
      success: true,
      data: {
        checkId: check.id,
        status,
        issues,
        changes,
        meta: result.data,
      },
    });
  } catch (error) {
    console.error("Check monitor error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
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
    // First check, no comparison needed
    // But check for issues with current state
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
  } else if (previous.title !== current.title && current.title) {
    changes.push({
      type: "title_changed",
      message: "Page title changed",
      previousValue: previous.title || null,
      currentValue: current.title,
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
  } else if (previous.image !== current.image) {
    changes.push({
      type: "image_changed",
      message: "Preview image changed",
      previousValue: previous.image || null,
      currentValue: current.image || null,
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
