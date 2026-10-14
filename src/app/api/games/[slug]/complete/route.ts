import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

const CompleteSchema = z.object({
  score: z.number().min(0).max(100),
  xpEarned: z.number().min(0).max(1000),
  correctAnswersCount: z.number().min(0),
  totalScenarios: z.number().min(1),
  childProfileId: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await req.json();
    const parsed = CompleteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid completion payload." },
        { status: 400 }
      );
    }

    const session = await getSession();
    // Default to seeded demo child if not logged in or during demo testing
    const targetChildId =
      parsed.data.childProfileId ||
      session?.childProfileId ||
      "profile-alex-demo";

    const result = demoStore.recordGameCompletion(
      targetChildId,
      slug,
      parsed.data.score,
      parsed.data.xpEarned
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to record game completion." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Game completion recorded successfully!",
      updatedProfile: result.child,
      badgeUnlocked: result.badgeUnlocked,
      newXp: result.newXp,
      newLevel: result.newLevel,
      levelTitle: result.levelTitle,
    });
  } catch (error) {
    console.error("Game completion error:", error);
    return NextResponse.json(
      { success: false, error: "Server error recording completion." },
      { status: 500 }
    );
  }
}
