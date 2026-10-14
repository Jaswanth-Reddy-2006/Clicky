import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoStore } from "@/lib/store/demo-store";
import { createSessionValue, DEMO_CREDENTIALS } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email and password (minimum 6 characters)." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const user = demoStore.getUserByEmail(email);

    // Check demo accounts or user store
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Try using the 1-Click Demo Login below!" },
        { status: 401 }
      );
    }

    // In demo mode, accept demo password or standard passwords
    if (password !== "Password123!" && password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
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
      httpOnly: false, // Accessible to client-side hydration for responsive UI state
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
