import { NextRequest, NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const PREDEFINED_REACTION_OPTIONS = [
  { text: "Great detective work!", icon: "🌟" },
  { text: "Awesome learning streak!", icon: "🔥" },
  { text: "You're a true Cyber Guardian!", icon: "🛡️" },
  { text: "Let's beat the next mission!", icon: "🚀" },
  { text: "High five on your new badge!", icon: "👏" },
  { text: "Keep up the amazing work!", icon: "💪" },
  { text: "Super safe online decision!", icon: "✨" },
];

export async function GET(req: NextRequest) {
  const session = await getSession();
  const searchParams = req.nextUrl.searchParams;
  const childIdParam = searchParams.get("childId");

  const childProfileId =
    childIdParam || session?.childProfileId || "profile-alex-demo";

  const friends = demoStore.getFriends(childProfileId);
  const activeCode = demoStore.getActiveFriendCode(childProfileId);
  const challenges = demoStore.getFriendChallenges(childProfileId);
  const reactions = demoStore.getFriendReactions(childProfileId);

  return NextResponse.json({
    success: true,
    childProfileId,
    friends,
    activeCode,
    challenges,
    reactions,
    reactionOptions: PREDEFINED_REACTION_OPTIONS,
  });
}
