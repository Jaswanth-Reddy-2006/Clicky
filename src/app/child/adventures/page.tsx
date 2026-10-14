"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, Star, Trophy, ArrowRight, ShieldCheck } from "lucide-react";
import { GAMES_DATA } from "@/lib/data/games-data";

export default function AdventuresMapPage() {
  const worldIcons = ["🏝️", "🏰", "🌋", "🔒", "🤖", "📻", "👑", "🕹️"];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
          World Quest Map
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy">
          The Clicky Adventure Realm
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Journey across 8 safety realms, defeat cyber villains, and conquer all badges!
        </p>
      </div>

      {/* World Quest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES_DATA.map((game, idx) => (
          <div
            key={game.slug}
            className="p-6 rounded-3xl bg-white border-2 border-clicky-border hover:border-clicky-navy shadow-card transition-all duration-200 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-clicky-pale to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl p-3 rounded-2xl bg-clicky-pale border border-clicky-sky/40 shadow-xs">
                  {worldIcons[idx]}
                </span>
                <span className="text-xs font-black text-clicky-navy flex items-center gap-1 bg-clicky-yellow-pale px-3 py-1 rounded-full border border-clicky-yellow/60">
                  <Star className="w-3.5 h-3.5 text-clicky-orange fill-clicky-orange" />
                  <span>World #{idx + 1}</span>
                </span>
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider text-clicky-orange">
                {game.theme}
              </span>
              <h3 className="text-xl font-black text-clicky-navy mt-0.5 leading-snug group-hover:text-clicky-orange transition-colors">
                {game.title}
              </h3>
              <p className="text-xs font-bold text-clicky-muted mb-2">
                {game.subtitle}
              </p>
              <p className="text-xs text-clicky-text font-medium leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-clicky-border/60 flex items-center justify-between">
              <div className="text-xs font-bold text-clicky-navy">
                <span className="text-clicky-muted">Badge: </span>
                <strong className="text-clicky-navy">{game.badgeName}</strong>
              </div>

              <Link
                href={`/child/games/${game.slug}`}
                className="px-5 py-2.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs transition-all shadow-fun-orange active:translate-y-1 flex items-center gap-1.5"
              >
                <span>Enter Realm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
