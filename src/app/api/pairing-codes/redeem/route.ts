import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

const RedeemSchema = z.object({
  code: z.string().min(5),
  childProfileId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RedeemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid pairing code." },
        { status: 400 }
      );
    }

    const session = await getSession();
    const targetChildId =
      parsed.data.childProfileId ||
      session?.childProfileId ||
      "profile-alex-demo";

    const redemptionResult = demoStore.redeemPairingCode(
      parsed.data.code,
      targetChildId
    );

    if (!redemptionResult.success) {
      return NextResponse.json(
        { success: false, error: redemptionResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: redemptionResult.message,
      parentName: redemptionResult.parentName,
    });
  } catch (error) {
    console.error("Redeem pairing code error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to redeem pairing code." },
      { status: 500 }
    );
  }
}
