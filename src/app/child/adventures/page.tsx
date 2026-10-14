"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  Star,
  Trophy,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
  Search,
  Shield,
  Newspaper,
  Bot,
  Radio,
  Heart,
  Gamepad2,
} from "lucide-react";
import { GAMES_DATA } from "@/lib/data/games-data";
import { playSound } from "@/lib/utils";

export default function AdventuresMapPage() {
  const [topicProgress, setTopicProgress] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.success && data.topicProgress) {
        const map: Record<string, any> = {};
        data.topicProgress.forEach((tp: any) => {
          map[tp.topic] = tp;
        });
        setTopicProgress(map);
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  const worldVisuals = [
    { icon: Search, badgeBg: "bg-amber-100 text-amber-700", stars: 3, status: "Mastered" },
    { icon: Shield, badgeBg: "bg-indigo-100 text-indigo-700", stars: 2, status: "In Progress" },
    { icon: Newspaper, badgeBg: "bg-red-100 text-red-700", stars: 2, status: "In Progress" },
    { icon: Lock, badgeBg: "bg-emerald-100 text-emerald-700", stars: 3, status: "Mastered" },
    { icon: Bot, badgeBg: "bg-cyan-100 text-cyan-700", stars: 2, status: "In Progress" },
    { icon: Radio, badgeBg: "bg-blue-100 text-blue-700", stars: 1, status: "Practice Needed" },
    { icon: Heart, badgeBg: "bg-rose-100 text-rose-700", stars: 3, status: "Mastered" },
    { icon: Gamepad2, badgeBg: "bg-purple-100 text-purple-700", stars: 2, status: "In Progress" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
          Visual Journey Map
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-clicky-navy">
          The Clicky Adventure Trail
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Travel across 8 cyber territories, defeat villains, collect safety stars, and conquer every badge!
        </p>
      </div>

      {/* Overview Stat Ribbon */}
      <div className="max-w-4xl mx-auto p-4 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-wrap items-center justify-around gap-4 text-center">
        <div>
          <span className="text-2xl font-black text-clicky-navy">8 / 8</span>
          <span className="text-[11px] font-bold text-clicky-muted block">Realms Unlocked</span>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" />
        <div>
          <span className="text-2xl font-black text-clicky-yellow">18 / 24</span>
          <span className="text-[11px] font-bold text-clicky-muted block">Safety Stars Earned</span>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" />
        <div>
          <span className="text-2xl font-black text-clicky-orange">4 / 8</span>
          <span className="text-[11px] font-bold text-clicky-muted block">Badges Claimed</span>
        </div>
      </div>

      {/* Visual Adventure Map Cards */}
      <div className="max-w-4xl mx-auto space-y-5">
        {GAMES_DATA.map((game, idx) => {
          const vis = worldVisuals[idx] || worldVisuals[0];
          const tp = topicProgress[game.topic];
          const score = tp ? tp.scorePercentage : idx % 2 === 0 ? 85 : 65;
          const completedCount = tp ? tp.missionsCompleted : idx % 2 === 0 ? 4 : 2;

          return (
            <div
              key={game.slug}
              className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-clicky-border hover:border-clicky-navy shadow-card transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
            >
              {/* Left Side: Realm Icon & Details */}
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-16 h-16 rounded-3xl ${vis.badgeBg} border border-clicky-border/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <vis.icon className="w-8 h-8" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-clicky-orange bg-clicky-orange-light/40 px-2 py-0.5 rounded-full border border-clicky-orange/30">
                      World #{idx + 1} • {game.theme}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{vis.status}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-clicky-navy group-hover:text-clicky-orange transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-clicky-muted font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
                    {game.subtitle} • {game.description}
                  </p>

                  {/* Stars Representation */}
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx <= vis.stars
                            ? "text-clicky-yellow fill-clicky-yellow"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-clicky-muted ml-1.5">
                      {completedCount} of {game.totalScenarios} missions ({score}% mastery)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Badge & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold text-clicky-muted block">Realm Badge</span>
                  <span className="text-xs font-black text-clicky-navy">{game.badgeName}</span>
                </div>

                <Link
                  href={`/child/games/${game.slug}`}
                  className="px-5 py-2.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs transition-all shadow-md active:translate-y-0.5 flex items-center gap-1.5"
                >
                  <span>Enter Realm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
