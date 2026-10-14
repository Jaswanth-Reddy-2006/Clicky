import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    let childProfile = null;
    if (session.role === "CHILD") {
      childProfile = session.childProfileId
        ? demoStore.getChildProfileById(session.childProfileId)
        : demoStore.getChildProfileByUserId(session.userId);
    }

    return NextResponse.json({
      authenticated: true,
      user: session,
      childProfile,
    });
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
