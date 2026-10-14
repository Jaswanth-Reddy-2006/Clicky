import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const searchParams = req.nextUrl.searchParams;
    const requestedChildId = searchParams.get("childId") || undefined;

    const parentId = session?.role === "PARENT" ? session.userId : "parent-sarah-demo";
    const overview = demoStore.getParentOverview(parentId, requestedChildId);

    if (!overview) {
      return NextResponse.json(
        { success: false, error: "Parent overview could not be loaded." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: overview });
  } catch (error) {
    console.error("Parent overview error:", error);
    return NextResponse.json(
      { success: false, error: "Server error loading parent overview." },
      { status: 500 }
    );
  }
}
