import { NextResponse } from "next/server";
import { GAMES_DATA } from "@/lib/data/games-data";

export async function GET() {
  // Return games without heavy scenario details for fast list/grid rendering
  const gamesSummary = GAMES_DATA.map((g) => ({
    slug: g.slug,
    title: g.title,
    subtitle: g.subtitle,
    theme: g.theme,
    description: g.description,
    topic: g.topic,
    iconName: g.iconName,
    colorScheme: g.colorScheme,
    totalScenarios: g.totalScenarios,
    badgeSlug: g.badgeSlug,
    badgeName: g.badgeName,
    estimatedMinutes: g.estimatedMinutes,
  }));

  return NextResponse.json({ success: true, games: gamesSummary });
}
