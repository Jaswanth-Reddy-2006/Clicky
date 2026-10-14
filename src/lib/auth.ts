import { cookies } from "next/headers";
import { User, Role } from "@/types";
import { demoStore } from "./store/demo-store";

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: Role;
  childProfileId?: string;
  avatar?: string;
}

const SESSION_COOKIE_NAME = "clicky_session_token";

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  try {
    const raw = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    const data = JSON.parse(raw) as SessionData;
    return data;
  } catch {
    return null;
  }
}

export function createSessionValue(session: SessionData): string {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export const DEMO_CREDENTIALS = {
  parent: {
    email: "parent@clicky.demo",
    password: "Password123!",
    name: "Sarah Miller",
    role: "PARENT" as Role,
    description: "Parent account with linked child Alex, weekly progress analytics, topic charts, and safety recommendations.",
  },
  child: {
    email: "alex@clicky.demo",
    password: "Password123!",
    name: "Alex Miller",
    role: "CHILD" as Role,
    description: "Child account (Level 2 Safety Scout, 480 XP) ready to play missions and consult KindBot.",
  },
};
