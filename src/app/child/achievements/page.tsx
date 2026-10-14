"use client";

import React, { useState, useEffect } from "react";
import { Award, Lock, Sparkles, CheckCircle2, Star, Trophy, Flame } from "lucide-react";
import { Achievement } from "@/types";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<
    (Achievement & { isUnlocked: boolean })[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch("/api/achievements");
      const data = await res.json();
      if (data.success) {
        setAchievements(data.achievements);
        setUnlockedCount(data.unlockedCount);
        setTotalCount(data.totalCount);
      }
    } catch (err) {
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["ALL", "GAME", "MILESTONE", "STREAK", "MASTERY"];

  const filtered = achievements.filter((a) =>
    selectedCategory === "ALL" ? true : a.category === selectedCategory
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
            Trophy Showcase
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
            Badges & Achievements
          </h1>
          <p className="text-xs sm:text-sm text-clicky-muted font-bold">
            Collect special safety badges by finishing missions and practicing digital kindness
          </p>
        </div>

        {/* Counter Badge */}
        <div className="p-4 rounded-2xl bg-white border border-clicky-border shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-clicky-yellow/30 text-clicky-navy flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5 text-clicky-navy" />
          </div>
          <div>
            <span className="text-[10px] text-clicky-muted uppercase font-black tracking-wider block">
              Unlocked Badges
            </span>
            <span className="text-lg font-black text-clicky-navy">
              {unlockedCount} / {totalCount}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? "bg-clicky-navy text-white border-clicky-navy shadow-sm"
                : "bg-white text-clicky-text border-clicky-border hover:bg-clicky-pale"
            }`}
          >
            {cat === "ALL" ? "All Badges" : `${cat.charAt(0)}${cat.slice(1).toLowerCase()}s`}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((badge) => {
          const isUnlocked = badge.isUnlocked;

          return (
            <div
              key={badge.slug}
              className={`p-6 rounded-3xl border-2 transition-all duration-200 flex items-start gap-4 ${
                isUnlocked
                  ? "bg-white border-clicky-yellow shadow-card hover:shadow-card-hover"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs border ${
                  isUnlocked
                    ? "bg-gradient-to-br from-clicky-yellow-pale to-clicky-pale border-clicky-yellow text-clicky-navy"
                    : "bg-gray-200 border-gray-300 text-gray-400"
                }`}
              >
                {isUnlocked ? (
                  badge.category === "GAME" ? (
                    <Award className="w-7 h-7 text-clicky-navy" />
                  ) : badge.category === "STREAK" ? (
                    <Flame className="w-7 h-7 text-orange-500 fill-orange-500" />
                  ) : (
                    <Star className="w-7 h-7 text-clicky-yellow fill-clicky-yellow" />
                  )
                ) : (
                  <Lock className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isUnlocked
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </span>
                  <span className="text-xs font-black text-clicky-orange flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-clicky-orange" />
                    <span>+{badge.xpReward} XP</span>
                  </span>
                </div>

                <h4
                  className={`font-black text-base leading-tight ${
                    isUnlocked ? "text-clicky-navy" : "text-gray-600"
                  }`}
                >
                  {badge.title}
                </h4>

                <p className="text-xs text-clicky-muted font-medium mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
