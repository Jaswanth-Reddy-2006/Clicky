import React from "react";
import { notFound } from "next/navigation";
import { GAMES_DATA } from "@/lib/data/games-data";
import { GameEngine } from "@/components/game/GameEngine";

export default function GameRunnerPage({
  params,
}: {
  params: { slug: string };
}) {
  const game = GAMES_DATA.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="py-2">
      <GameEngine game={game} />
    </div>
  );
}
