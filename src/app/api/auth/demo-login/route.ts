import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoStore } from "@/lib/store/demo-store";
import { createSessionValue } from "@/lib/auth";

const DemoLoginSchema = z.object({
  role: z.enum(["PARENT", "CHILD"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DemoLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid demo role selected." },
        { status: 400 }
      );
    }

    const targetEmail =
      parsed.data.role === "PARENT" ? "parent@clicky.demo" : "alex@clicky.demo";
    const user = demoStore.getUserByEmail(targetEmail);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Demo user not found." },
        { status: 404 }
      );
    }

    let childProfileId: string | undefined;
    if (user.role === "CHILD") {
      const profile = demoStore.getChildProfileByUserId(user.id);
      childProfileId = profile?.id;
    }

    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      childProfileId,
      avatar: user.avatar,
    };

    const cookieValue = createSessionValue(sessionData);

    const response = NextResponse.json({
      success: true,
      user: sessionData,
      redirectTo: user.role === "CHILD" ? "/child/dashboard" : "/parent/dashboard",
    });

    response.cookies.set("clicky_session_token", cookieValue, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Demo login error:", error);
    return NextResponse.json(
      { success: false, error: "Demo login failed." },
      { status: 500 }
    );
  }
}
