"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Star, ArrowRight, Filter, Gamepad2, Award } from "lucide-react";
import { GAMES_DATA } from "@/lib/data/games-data";
import { SafetyTopic } from "@/types";

export default function GamesArcadePage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    "ALL",
    "Scam Awareness",
    "Cyberbullying",
    "Fake News & Misinformation",
    "Privacy & Personal Data",
    "Safe AI Exploration",
    "Voice Cloning & Impersonation",
    "Kindness & Empathy",
    "Gaming Safety",
  ];

  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesTopic =
      selectedTopic === "ALL" || game.topic === selectedTopic;
    const matchesQuery =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-black uppercase tracking-wider border border-clicky-sky/40">
            Interactive Arcade
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
            Safety Game Arcade
          </h1>
          <p className="text-xs sm:text-sm text-clicky-muted font-bold">
            Select any of the 8 mission games to practice digital survival skills and earn badges
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search missions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-clicky-border text-xs font-bold text-clicky-navy focus:border-clicky-navy outline-none shadow-xs"
          />
          <Search className="w-4 h-4 text-clicky-muted absolute left-3 top-3" />
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
              selectedTopic === t
                ? "bg-clicky-navy text-white border-clicky-navy shadow-sm"
                : "bg-white text-clicky-text border-clicky-border hover:bg-clicky-pale"
            }`}
          >
            {t === "ALL" ? "All 8 Games" : t}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.map((game, idx) => (
          <div
            key={game.slug}
            className="bg-white rounded-3xl p-5 border border-clicky-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-3 rounded-2xl bg-clicky-pale border border-clicky-sky/40 shadow-xs">
                  {game.slug.includes("scam")
                    ? "🕵️"
                    : game.slug.includes("cyberbullying")
                    ? "🛡️"
                    : game.slug.includes("fake")
                    ? "📰"
                    : game.slug.includes("privacy")
                    ? "🔐"
                    : game.slug.includes("ai")
                    ? "🤖"
                    : game.slug.includes("voice")
                    ? "🎙️"
                    : game.slug.includes("kindness")
                    ? "👑"
                    : "🎮"}
                </span>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark">
                  ~{game.estimatedMinutes} Mins
                </span>
              </div>

              <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                {game.topic}
              </span>
              <h3 className="text-lg font-black text-clicky-navy mt-0.5 leading-snug group-hover:text-clicky-orange transition-colors">
                {game.title}
              </h3>
              <p className="text-xs text-clicky-muted font-medium mt-1 leading-relaxed line-clamp-3">
                {game.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-clicky-border/60">
              <div className="flex items-center justify-between text-[11px] font-bold text-clicky-muted mb-3">
                <span>{game.totalScenarios} Scenarios</span>
                <span className="text-clicky-navy font-black flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-clicky-yellow fill-clicky-yellow" />
                  <span>+350 Max XP</span>
                </span>
              </div>

              <Link
                href={`/child/games/${game.slug}`}
                className="w-full py-2.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs transition-all shadow-fun-orange active:translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Play Game</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
