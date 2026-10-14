import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const parentId = session?.role === "PARENT" ? session.userId : "parent-sarah-demo";

    const codeRecord = demoStore.generatePairingCode(parentId);

    return NextResponse.json({
      success: true,
      message: "One-time pairing code generated!",
      code: codeRecord.code,
      expiresAt: codeRecord.expiresAt,
    });
  } catch (error) {
    console.error("Generate pairing code error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate pairing code." },
      { status: 500 }
    );
  }
}
