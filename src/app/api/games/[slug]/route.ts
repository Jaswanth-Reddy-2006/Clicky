import { NextRequest, NextResponse } from "next/server";
import { GAMES_DATA } from "@/lib/data/games-data";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const game = GAMES_DATA.find((g) => g.slug === slug);

  if (!game) {
    return NextResponse.json(
      { success: false, error: "Game not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, game });
}
