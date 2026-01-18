import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// PATCH /api/alerts/[id] - Acknowledge an alert
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

    // Verify ownership through the monitor relationship
    const alert = await prisma.alert.findFirst({
      where: { id },
      include: {
        monitor: {
          select: { userId: true },
        },
      },
    });

    if (!alert) {
      return NextResponse.json(
        { success: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    if (alert.monitor.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { acknowledged } = body;

    const updated = await prisma.alert.update({
      where: { id },
      data: {
        acknowledged: Boolean(acknowledged),
        acknowledgedAt: acknowledged ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        acknowledged: updated.acknowledged,
        acknowledgedAt: updated.acknowledgedAt,
      },
    });
  } catch (error) {
    console.error("Update alert error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/alerts/[id] - Delete an alert
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

    // Verify ownership through the monitor relationship
    const alert = await prisma.alert.findFirst({
      where: { id },
      include: {
        monitor: {
          select: { userId: true },
        },
      },
    });

    if (!alert) {
      return NextResponse.json(
        { success: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    if (alert.monitor.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.alert.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Alert deleted",
    });
  } catch (error) {
    console.error("Delete alert error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
