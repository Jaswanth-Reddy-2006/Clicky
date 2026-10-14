"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Star,
  Award,
  ArrowRight,
  Gamepad2,
  Bot,
  Compass,
  CheckCircle2,
  TrendingUp,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Mascot } from "@/components/common/Mascot";
import { GAMES_DATA } from "@/lib/data/games-data";
import { getLevelProgress } from "@/lib/utils";

export default function ChildDashboardPage() {
  const [profile, setProfile] = useState<{
    name: string;
    level: number;
    levelTitle: string;
    xp: number;
    currentStreak: number;
  }>({
    name: "Alex",
    level: 2,
    levelTitle: "Safety Scout",
    xp: 480,
    currentStreak: 3,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.success && data.childProfile) {
        setProfile({
          name: data.childProfile.name,
          level: data.childProfile.level,
          levelTitle: data.childProfile.levelTitle,
          xp: data.childProfile.xp,
          currentStreak: data.childProfile.currentStreak,
        });
      }
    } catch {
      // Use defaults if demo state
    } finally {
      setLoading(false);
    }
  };

  const progress = getLevelProgress(profile.xp);
  const featuredGame = GAMES_DATA[0]; // Scam Detective
  const recommendedGame = GAMES_DATA[5]; // VoiceGuard Rescue

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white relative overflow-hidden shadow-card">
        <div className="absolute right-4 -bottom-6 opacity-20 sm:opacity-30 pointer-events-none select-none">
          <Mascot size="xl" mood="cheer" animate={false} />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-clicky-yellow text-xs font-black border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-clicky-yellow" />
            <span>LEVEL {profile.level} • {profile.levelTitle.toUpperCase()}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Hey, {profile.name}! Ready for today&apos;s adventure?
          </h1>

          <p className="text-xs sm:text-sm text-clicky-sky-light font-medium leading-relaxed">
            Cyber villains are testing new tricks. Put on your detective badge, practice safe choices, and protect the Clicky universe!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/child/games/${featuredGame.slug}`}
              className="px-6 py-2.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs sm:text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center gap-2"
            >
              <span>Play Featured Mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/child/kindbot"
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm border border-white/30 transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-clicky-yellow" />
              <span>Ask KindBot AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats & Daily Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* XP Level Progress Card */}
        <div className="p-5 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-clicky-navy tracking-wider">
                Hero Level Progress
              </span>
              <span className="w-7 h-7 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark flex items-center justify-center font-bold text-xs">
                ⭐
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-clicky-navy">
                {profile.xp}
              </span>
              <span className="text-xs font-bold text-clicky-muted">Total XP</span>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 mt-2">
              <div
                className="h-full bg-gradient-to-r from-clicky-yellow to-clicky-orange rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-clicky-border/60 flex items-center justify-between text-xs font-bold text-clicky-navy">
            <span>{profile.levelTitle}</span>
            <span className="text-clicky-orange font-black">
              {progress.xpToNext} XP to Level {profile.level + 1}
            </span>
          </div>
        </div>

        {/* Daily Safety Streak Card */}
        <div className="p-5 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-clicky-navy tracking-wider">
                Daily Learning Streak
              </span>
              <div className="p-1.5 rounded-xl bg-orange-100 text-orange-600">
                <Flame className="w-4 h-4 fill-orange-500" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-orange-600">
                {profile.currentStreak} Days
              </span>
              <span className="text-xs font-bold text-clicky-muted">Active streak</span>
            </div>

            <p className="text-xs text-clicky-muted font-medium mt-1">
              Awesome consistency! Completing one mission every day builds lifelong online safety instincts.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-clicky-border/60 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Today&apos;s goal active</span>
            </span>
            <span className="text-clicky-orange font-black">+25 XP bonus</span>
          </div>
        </div>

        {/* Daily Quest Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-clicky-yellow-pale to-white border border-clicky-yellow/60 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-clicky-yellow/40 px-2 py-0.5 rounded-full">
                Daily Challenge
              </span>
              <span className="text-xs font-black text-clicky-orange">+50 XP</span>
            </div>

            <h4 className="font-black text-clicky-navy text-sm mt-1">
              Phishing Detective Mission
            </h4>
            <p className="text-xs text-clicky-muted font-semibold mt-1 leading-relaxed">
              Complete Scenario 1 in Scam Detective without tapping any suspicious links!
            </p>
          </div>

          <Link
            href="/child/games/scam-detective"
            className="mt-4 w-full py-2 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Start Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recommended Next Mission Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-clicky-pale border border-clicky-sky/40 flex items-center justify-center text-3xl shrink-0 shadow-xs">
            🎙️
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
              Recommended by Parent Guardian
            </span>
            <h3 className="text-lg font-black text-clicky-navy leading-snug">
              {recommendedGame.title}: {recommendedGame.subtitle}
            </h3>
            <p className="text-xs text-clicky-muted font-medium mt-0.5">
              Learn how to stop AI voice clones and use secret family safe words!
            </p>
          </div>
        </div>

        <Link
          href={`/child/games/${recommendedGame.slug}`}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Play Mission</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Game Worlds Quick Arcade Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-clicky-navy">
              Safety Adventures & Games
            </h2>
            <p className="text-xs text-clicky-muted font-bold">
              Choose an adventure world to unlock badges and level up
            </p>
          </div>

          <Link
            href="/child/games"
            className="text-xs font-black text-clicky-orange hover:underline flex items-center gap-1"
          >
            <span>View All 8</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES_DATA.slice(0, 4).map((game, i) => (
            <Link
              key={game.slug}
              href={`/child/games/${game.slug}`}
              className="p-5 rounded-3xl bg-white border border-clicky-border shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-2.5 rounded-2xl bg-clicky-pale border border-clicky-sky/30">
                    {i === 0 ? "🕵️" : i === 1 ? "🛡️" : i === 2 ? "📰" : "🔐"}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-clicky-muted">
                    {game.totalScenarios} Scenarios
                  </span>
                </div>
                <h4 className="font-black text-sm text-clicky-navy group-hover:text-clicky-orange transition-colors">
                  {game.title}
                </h4>
                <p className="text-xs text-clicky-muted font-medium mt-1 line-clamp-2">
                  {game.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-clicky-border/60 flex items-center justify-between text-xs font-bold text-clicky-orange">
                <span>Play Adventure</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
