import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  try {
    const { toFriendId, reactionText, icon, childProfileId: customChildId } =
      await req.json();

    const fromChildId =
      customChildId || session?.childProfileId || "profile-alex-demo";

    if (!toFriendId || !reactionText) {
      return NextResponse.json(
        { success: false, message: "Recipient and reaction text are required." },
        { status: 400 }
      );
    }

    const reaction = demoStore.sendFriendReaction(
      fromChildId,
      toFriendId,
      reactionText,
      icon || "🌟"
    );

    return NextResponse.json({
      success: true,
      reaction,
      reactions: demoStore.getFriendReactions(fromChildId),
    });
  } catch (error) {
    console.error("Error sending friend reaction:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error sending reaction." },
      { status: 500 }
    );
  }
}
