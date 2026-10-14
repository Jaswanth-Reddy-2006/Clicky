import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  const childProfileId =
    req.nextUrl.searchParams.get("childId") ||
    session?.childProfileId ||
    "profile-alex-demo";

  const codeRecord = demoStore.getActiveFriendCode(childProfileId);
  return NextResponse.json({ success: true, codeRecord });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  let body: { childProfileId?: string } = {};
  try {
    body = await req.json();
  } catch {
    // optional body
  }

  const childProfileId =
    body.childProfileId || session?.childProfileId || "profile-alex-demo";

  const newCode = demoStore.generateFriendCode(childProfileId);
  return NextResponse.json({ success: true, codeRecord: newCode });
}
