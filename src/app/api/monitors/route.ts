import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isValidUrl, normalizeUrl } from "@/lib/utils";

const PLAN_LIMITS = {
  FREE: 0,
  PRO: 25,
  TEAM: 100,
};

// GET /api/monitors - List all monitors for the current user
export async function GET(request: NextRequest) {
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

    const monitors = await prisma.monitor.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { status: "asc" }, // broken first, then warning, then healthy
        { updatedAt: "desc" },
      ],
      include: {
        _count: {
          select: { alerts: { where: { acknowledged: false } } },
        },
      },
    });

    // Transform status order for proper sorting
    const statusOrder = { broken: 0, warning: 1, healthy: 2 };
    const sortedMonitors = monitors.sort(
      (a, b) =>
        (statusOrder[a.status as keyof typeof statusOrder] || 2) -
        (statusOrder[b.status as keyof typeof statusOrder] || 2)
    );

    return NextResponse.json({
      success: true,
      data: sortedMonitors.map((m) => ({
        id: m.id,
        url: m.url,
        nickname: m.nickname,
        status: m.status,
        checkFrequency: m.checkFrequency,
        alertsEnabled: m.alertsEnabled,
        lastCheckedAt: m.lastCheckedAt,
        unacknowledgedAlerts: m._count.alerts,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("List monitors error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/monitors - Create a new monitor
export async function POST(request: NextRequest) {
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

    // Check user plan
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });

    const plan = (user?.plan || "FREE") as keyof typeof PLAN_LIMITS;
    const limit = PLAN_LIMITS[plan];

    if (limit === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Monitoring is a Pro feature. Please upgrade to add monitors.",
          upgradeRequired: true,
        },
        { status: 403 }
      );
    }

    // Check current monitor count
    const currentCount = await prisma.monitor.count({
      where: { userId: session.user.id },
    });

    if (currentCount >= limit) {
      return NextResponse.json(
        {
          success: false,
          error: `You've reached your limit of ${limit} monitors. Upgrade to add more.`,
          limitReached: true,
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { url, nickname } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);

    if (!isValidUrl(normalizedUrl)) {
      return NextResponse.json(
        { success: false, error: "Invalid URL provided" },
        { status: 400 }
      );
    }

    // Check if URL is already being monitored
    const existing = await prisma.monitor.findFirst({
      where: {
        userId: session.user.id,
        url: normalizedUrl,
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "This URL is already being monitored" },
        { status: 409 }
      );
    }

    // Create the monitor
    const monitor = await prisma.monitor.create({
      data: {
        url: normalizedUrl,
        nickname: nickname || null,
        userId: session.user.id,
        status: "healthy", // Will be updated on first check
      },
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
    console.error("Create monitor error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
