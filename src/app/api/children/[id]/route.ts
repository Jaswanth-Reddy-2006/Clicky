import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const child = demoStore.getChildProfileById(id);

  if (!child) {
    return NextResponse.json(
      { success: false, error: "Child profile not found." },
      { status: 404 }
    );
  }

  const overview = demoStore.getParentOverview(
    child.parentId || "parent-sarah-demo",
    child.id
  );

  return NextResponse.json({
    success: true,
    child,
    topicProgress: overview?.topicProgress || [],
    recentAchievements: overview?.recentAchievements || [],
    recentActivities: overview?.recentActivities || [],
    recommendations: overview?.recommendations || [],
  });
}
