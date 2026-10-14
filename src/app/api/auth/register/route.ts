import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoStore } from "@/lib/store/demo-store";
import { createSessionValue } from "@/lib/auth";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["PARENT", "CHILD"]),
  ageBand: z.enum(["EARLY_EXPLORER", "DIGITAL_NAVIGATOR", "CYBER_HERO"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid registration form." },
        { status: 400 }
      );
    }

    const { name, email, role, ageBand } = parsed.data;

    // Check if email already registered
    const existing = demoStore.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      avatar: role === "CHILD" ? "robot-shield" : undefined,
      createdAt: new Date().toISOString(),
    };
    demoStore.getUsers().push(newUser);

    let childProfileId: string | undefined;
    if (role === "CHILD") {
      const newProfile = demoStore.createChildProfile("parent-sarah-demo", {
        name,
        ageBand: ageBand || "DIGITAL_NAVIGATOR",
        avatar: "robot-shield",
      });
      newProfile.userId = newUser.id;
      childProfileId = newProfile.id;
    }

    const sessionData = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      childProfileId,
      avatar: newUser.avatar,
    };

    const cookieValue = createSessionValue(sessionData);

    const response = NextResponse.json({
      success: true,
      user: sessionData,
      redirectTo: role === "CHILD" ? "/child/dashboard" : "/parent/dashboard",
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
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register account." },
      { status: 500 }
    );
  }
}
