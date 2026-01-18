import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/monitors/[id] - Get a specific monitor with recent checks
export async function GET(
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

    const { id } = await params;

    const monitor = await prisma.monitor.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        checks: {
          orderBy: { checkedAt: "desc" },
          take: 30, // Last 30 checks
        },
        alerts: {
          where: { acknowledged: false },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!monitor) {
      return NextResponse.json(
        { success: false, error: "Monitor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: monitor.id,
        url: monitor.url,
        nickname: monitor.nickname,
        status: monitor.status,
        checkFrequency: monitor.checkFrequency,
        alertsEnabled: monitor.alertsEnabled,
        lastCheckedAt: monitor.lastCheckedAt,
        lastSnapshot: monitor.lastSnapshot ? JSON.parse(monitor.lastSnapshot) : null,
        createdAt: monitor.createdAt,
        checks: monitor.checks.map((c) => ({
          id: c.id,
          status: c.status,
          issues: JSON.parse(c.issues),
          title: c.title,
          description: c.description,
          image: c.image,
          checkedAt: c.checkedAt,
        })),
        alerts: monitor.alerts.map((a) => ({
          id: a.id,
          type: a.type,
          message: a.message,
          previousValue: a.previousValue,
          currentValue: a.currentValue,
          createdAt: a.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get monitor error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/monitors/[id] - Update a monitor
export async function PATCH(
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

    const { id } = await params;

    // Verify ownership
    const existing = await prisma.monitor.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Monitor not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { nickname, checkFrequency, alertsEnabled } = body;

    // Build update data
    const updateData: {
      nickname?: string | null;
      checkFrequency?: string;
      alertsEnabled?: boolean;
    } = {};

    if (nickname !== undefined) {
      updateData.nickname = nickname || null;
    }

    if (checkFrequency !== undefined) {
      if (!["daily", "hourly"].includes(checkFrequency)) {
        return NextResponse.json(
          { success: false, error: "Invalid check frequency" },
          { status: 400 }
        );
      }

      // Check if user can use hourly (Team plan only)
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
      });

      if (checkFrequency === "hourly" && user?.plan !== "TEAM") {
        return NextResponse.json(
          {
            success: false,
            error: "Hourly monitoring is only available on the Team plan",
            upgradeRequired: true,
          },
          { status: 403 }
        );
      }

      updateData.checkFrequency = checkFrequency;
    }

    if (alertsEnabled !== undefined) {
      updateData.alertsEnabled = Boolean(alertsEnabled);
    }

    const monitor = await prisma.monitor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: monitor.id,
        url: monitor.url,
        nickname: monitor.nickname,
        status: monitor.status,
        checkFrequency: monitor.checkFrequency,
        alertsEnabled: monitor.alertsEnabled,
        lastCheckedAt: monitor.lastCheckedAt,
        createdAt: monitor.createdAt,
      },
    });
  } catch (error) {
    console.error("Update monitor error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/monitors/[id] - Delete a monitor
export async function DELETE(
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

    const { id } = await params;

    // Verify ownership
    const existing = await prisma.monitor.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Monitor not found" },
        { status: 404 }
      );
    }

    // Delete monitor (cascade will handle checks and alerts)
    await prisma.monitor.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Monitor deleted successfully",
    });
  } catch (error) {
    console.error("Delete monitor error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
