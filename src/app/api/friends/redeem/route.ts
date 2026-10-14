import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  try {
    const { code, childProfileId: customChildId } = await req.json();

    const targetChildId =
      customChildId || session?.childProfileId || "profile-alex-demo";

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, message: "A valid friend code is required." },
        { status: 400 }
      );
    }

    const result = demoStore.redeemFriendCode(code, targetChildId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      friend: result.friend,
      updatedFriends: demoStore.getFriends(targetChildId),
    });
  } catch (error) {
    console.error("Error redeeming friend code:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error redeeming code." },
      { status: 500 }
    );
  }
}
