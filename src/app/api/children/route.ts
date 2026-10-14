import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { demoStore } from "@/lib/store/demo-store";

export const dynamic = "force-dynamic";

const CreateChildSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  ageBand: z.enum(["EARLY_EXPLORER", "DIGITAL_NAVIGATOR", "CYBER_HERO"]),
  avatar: z.string().default("robot-shield"),
});

export async function GET() {
  const session = await getSession();
  const parentId = session?.role === "PARENT" ? session.userId : "parent-sarah-demo";
  const children = demoStore.getChildrenForParent(parentId);
  return NextResponse.json({ success: true, children });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const parentId = session?.role === "PARENT" ? session.userId : "parent-sarah-demo";

    const body = await req.json();
    const parsed = CreateChildSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid child profile info." },
        { status: 400 }
      );
    }

    const newChild = demoStore.createChildProfile(parentId, parsed.data);

    return NextResponse.json({
      success: true,
      message: "Child profile created successfully!",
      child: newChild,
    });
  } catch (error) {
    console.error("Create child error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create child profile." },
      { status: 500 }
    );
  }
}
