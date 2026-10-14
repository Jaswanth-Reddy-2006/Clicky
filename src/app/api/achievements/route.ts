import { NextRequest, NextResponse } from "next/server";
import { ACHIEVEMENTS_DATA } from "@/lib/data/achievements-data";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  const searchParams = req.nextUrl.searchParams;
  const childIdParam = searchParams.get("childId");

  const targetChildId =
    childIdParam || session?.childProfileId || "profile-alex-demo";

  const overview = demoStore.getParentOverview(
    "parent-sarah-demo",
    targetChildId
  );

  const unlockedSlugs = new Set(
    (overview?.recentAchievements || []).map((a) => a.slug)
  );

  const achievementsWithStatus = ACHIEVEMENTS_DATA.map((a) => ({
    ...a,
    isUnlocked: unlockedSlugs.has(a.slug),
    unlockedAt: unlockedSlugs.has(a.slug) ? new Date().toISOString() : undefined,
  }));

  return NextResponse.json({
    success: true,
    achievements: achievementsWithStatus,
    unlockedCount: unlockedSlugs.size,
    totalCount: ACHIEVEMENTS_DATA.length,
  });
}
