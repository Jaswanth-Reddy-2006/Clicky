"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  ArrowRight,
  Gamepad2,
  Award,
  Shield,
  Newspaper,
  Lock,
  Bot,
  Radio,
  Heart,
  CheckCircle2,
  Play,
  Sparkles,
} from "lucide-react";
import { GAMES_DATA } from "@/lib/data/games-data";
import { playSound } from "@/lib/utils";

export default function GamesArcadePage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressMap, setProgressMap] = useState<Record<string, { completed: number; score: number }>>({});

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.topicProgress) {
          const map: Record<string, { completed: number; score: number }> = {};
          data.topicProgress.forEach((tp: any) => {
            map[tp.topic] = {
              completed: tp.missionsCompleted || 0,
              score: tp.scorePercentage || 0,
            };
          });
          setProgressMap(map);
        }
      })
      .catch(() => {});
  }, []);

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

  const getGameIcon = (slug: string) => {
    if (slug.includes("scam"))
      return (
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-xs">
          <Search className="w-6 h-6" />
        </div>
      );
    if (slug.includes("cyberbullying"))
      return (
        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 shadow-xs">
          <Shield className="w-6 h-6" />
        </div>
      );
    if (slug.includes("fake"))
      return (
        <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/20 shadow-xs">
          <Newspaper className="w-6 h-6" />
        </div>
      );
    if (slug.includes("privacy"))
      return (
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs">
          <Lock className="w-6 h-6" />
        </div>
      );
    if (slug.includes("ai"))
      return (
        <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 shadow-xs">
          <Bot className="w-6 h-6" />
        </div>
      );
    if (slug.includes("voice"))
      return (
        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-xs">
          <Radio className="w-6 h-6" />
        </div>
      );
    if (slug.includes("kindness"))
      return (
        <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-600 border border-pink-500/20 shadow-xs">
          <Heart className="w-6 h-6" />
        </div>
      );
    return (
      <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/20 shadow-xs">
        <Gamepad2 className="w-6 h-6" />
      </div>
    );
  };

  const getGameStatus = (topic: string, totalScenarios: number, idx: number) => {
    const p = progressMap[topic];
    if (p && p.completed >= totalScenarios) {
      return {
        label: "Completed",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        icon: CheckCircle2,
        actionText: "Replay Mission",
      };
    }
    if (p && p.completed > 0) {
      return {
        label: "Continue",
        badgeClass: "bg-sky-100 text-sky-800 border-sky-300",
        icon: Play,
        actionText: "Continue Mission",
      };
    }
    if (idx === 0 || idx === 1) {
      return {
        label: "Available",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        icon: Sparkles,
        actionText: "Play Mission",
      };
    }
    return {
      label: "Available",
      badgeClass: "bg-clicky-pale text-clicky-navy border-clicky-sky/40",
      icon: Sparkles,
      actionText: "Play Mission",
    };
  };

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
            onClick={() => {
              playSound("click");
              setSelectedTopic(t);
            }}
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

      {/* Games Grid - Visually balanced, no horizontal overflow, meaningful status badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.map((game, idx) => {
          const status = getGameStatus(game.topic, game.totalScenarios, idx);
          const StatusIcon = status.icon;

          return (
            <div
              key={game.slug}
              className="bg-white rounded-3xl p-5 border border-clicky-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {getGameIcon(game.slug)}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border shadow-2xs ${status.badgeClass}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span>{status.label}</span>
                  </span>
                </div>

                <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                  {game.topic}
                </span>
                <h3 className="text-base sm:text-lg font-black text-clicky-navy mt-0.5 leading-snug group-hover:text-clicky-orange transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-clicky-muted font-medium mt-1 leading-relaxed">
                  {game.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-clicky-border/60">
                <div className="flex items-center justify-between text-[11px] font-bold text-clicky-muted mb-3">
                  <span>{game.totalScenarios} Scenarios</span>
                  <span className="text-clicky-navy font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-clicky-yellow fill-clicky-yellow" />
                    <span>+{game.scenarios?.reduce((sum, s) => sum + (s.xpReward || 50), 0) || 150} XP</span>
                  </span>
                </div>

                <Link
                  href={`/child/games/${game.slug}`}
                  onClick={() => playSound("click")}
                  className="w-full py-2.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs transition-all shadow-fun-orange active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>{status.actionText}</span>
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
