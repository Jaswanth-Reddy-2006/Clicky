import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  try {
    const { challengeId, action } = await req.json();

    if (!challengeId) {
      return NextResponse.json(
        { success: false, message: "Challenge ID is required." },
        { status: 400 }
      );
    }

    if (action === "accept") {
      const accepted = demoStore.acceptFriendChallenge(challengeId);
      return NextResponse.json({
        success: accepted,
        message: accepted ? "Challenge accepted! Good luck!" : "Challenge not found.",
      });
    }

    return NextResponse.json({ success: true, message: "Action recorded." });
  } catch (error) {
    console.error("Error updating challenge:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
