import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  const searchParams = req.nextUrl.searchParams;
  const childIdParam = searchParams.get("childId");

  const targetChildId =
    childIdParam || session?.childProfileId || "profile-alex-demo";

  const childProfile = demoStore.getChildProfileById(targetChildId);

  if (!childProfile) {
    return NextResponse.json(
      { success: false, error: "Child profile not found." },
      { status: 404 }
    );
  }

  const parentOverview = demoStore.getParentOverview(
    childProfile.parentId || "parent-sarah-demo",
    childProfile.id
  );

  return NextResponse.json({
    success: true,
    childProfile,
    topicProgress: parentOverview?.topicProgress || [],
    recentAchievements: parentOverview?.recentAchievements || [],
    recentActivities: parentOverview?.recentActivities || [],
  });
}
