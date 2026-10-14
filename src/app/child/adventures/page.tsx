"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  Search,
  Shield,
  Newspaper,
  Lock,
  Bot,
  Radio,
  Heart,
  Gamepad2,
  Award,
  Play,
  Footprints,
} from "lucide-react";
import { GAMES_DATA } from "@/lib/data/games-data";
import { playSound } from "@/lib/utils";

interface RealmConfig {
  realmName: string;
  worldNumber: number;
  slug: string;
  themeColor: string;
  cardBorder: string;
  gradientBg: string;
  icon: React.ElementType;
  iconBg: string;
  badgeName: string;
  stars: number;
  status: "Mastered" | "In Progress" | "Available";
  svgIllustration: React.ReactNode;
}

export default function AdventuresMapPage() {
  const [topicProgress, setTopicProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.topicProgress) {
          const map: Record<string, any> = {};
          data.topicProgress.forEach((tp: any) => {
            map[tp.topic] = tp;
          });
          setTopicProgress(map);
        }
      })
      .catch(() => {});
  }, []);

  const worlds: RealmConfig[] = [
    {
      worldNumber: 1,
      realmName: "Mystery City",
      slug: "scam-detective",
      themeColor: "text-amber-500",
      cardBorder: "border-amber-400 hover:border-amber-500",
      gradientBg: "from-slate-900 via-amber-950/40 to-slate-900",
      icon: Search,
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      badgeName: "Master Sleuth",
      stars: 3,
      status: "Mastered",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-slate-900 border border-amber-500/30">
          <rect width="200" height="120" fill="#0F172A" />
          {/* Skyline */}
          <rect x="15" y="45" width="28" height="75" fill="#1E293B" rx="2" />
          <rect x="50" y="30" width="36" height="90" fill="#334155" rx="3" />
          <rect x="95" y="55" width="30" height="65" fill="#1E293B" rx="2" />
          <rect x="135" y="20" width="45" height="100" fill="#334155" rx="3" />
          {/* Windows glowing */}
          <circle cx="60" cy="45" r="2.5" fill="#FCD34D" />
          <circle cx="75" cy="45" r="2.5" fill="#FCD34D" />
          <circle cx="60" cy="65" r="2.5" fill="#FCD34D" />
          <circle cx="150" cy="35" r="2.5" fill="#FCD34D" />
          <circle cx="165" cy="35" r="2.5" fill="#FCD34D" />
          {/* Streetlight & Magnifying glass */}
          <line x1="40" y1="90" x2="40" y2="120" stroke="#F59E0B" strokeWidth="3" />
          <circle cx="40" cy="88" r="6" fill="#FDE68A" />
          <circle cx="130" cy="70" r="20" stroke="#F59E0B" strokeWidth="4" fill="none" opacity="0.8" />
          <line x1="144" y1="84" x2="160" y2="100" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      worldNumber: 2,
      realmName: "Kindness Town",
      slug: "cyberbullying-heroes",
      themeColor: "text-indigo-500",
      cardBorder: "border-indigo-400 hover:border-indigo-500",
      gradientBg: "from-indigo-950 via-indigo-900/40 to-slate-900",
      icon: Shield,
      iconBg: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",
      badgeName: "Empathy Guardian",
      stars: 2,
      status: "In Progress",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-indigo-950 border border-indigo-500/30">
          <rect width="200" height="120" fill="#1E1B4B" />
          {/* Town Hall & Houses */}
          <polygon points="100,20 145,50 55,50" fill="#4338CA" />
          <rect x="65" y="50" width="70" height="70" fill="#312E81" />
          <rect x="88" y="75" width="24" height="45" fill="#6366F1" rx="12" />
          {/* Heart Emblem */}
          <circle cx="100" cy="62" r="10" fill="#EC4899" />
          <polygon points="100,56 104,52 108,56 100,64 92,56 96,52" fill="#FFFFFF" />
          {/* Empathy Shield side towers */}
          <rect x="20" y="60" width="30" height="60" fill="#3730A3" rx="4" />
          <rect x="150" y="60" width="30" height="60" fill="#3730A3" rx="4" />
        </svg>
      ),
    },
    {
      worldNumber: 3,
      realmName: "Truth Tower",
      slug: "fake-or-fact",
      themeColor: "text-rose-500",
      cardBorder: "border-rose-400 hover:border-rose-500",
      gradientBg: "from-rose-950 via-rose-900/40 to-slate-900",
      icon: Newspaper,
      iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/40",
      badgeName: "Truth Verifier",
      stars: 2,
      status: "In Progress",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-rose-950 border border-rose-500/30">
          <rect width="200" height="120" fill="#4C0519" />
          {/* Tower Skyscraper */}
          <polygon points="100,15 125,120 75,120" fill="#9F1239" />
          <line x1="100" y1="8" x2="100" y2="25" stroke="#FB7185" strokeWidth="3" />
          <circle cx="100" cy="8" r="4" fill="#FDA4AF" />
          {/* Searchlight beams */}
          <polygon points="100,15 180,0 150,0" fill="#F43F5E" opacity="0.3" />
          <polygon points="100,15 20,0 50,0" fill="#F43F5E" opacity="0.3" />
          {/* Windows */}
          <line x1="85" y1="50" x2="115" y2="50" stroke="#FECDD3" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="82" y1="75" x2="118" y2="75" stroke="#FECDD3" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="80" y1="100" x2="120" y2="100" stroke="#FECDD3" strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      ),
    },
    {
      worldNumber: 4,
      realmName: "Secret Vault",
      slug: "privacy-protector",
      themeColor: "text-emerald-500",
      cardBorder: "border-emerald-400 hover:border-emerald-500",
      gradientBg: "from-emerald-950 via-emerald-900/40 to-slate-900",
      icon: Lock,
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      badgeName: "Vault Keeper",
      stars: 3,
      status: "Mastered",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-emerald-950 border border-emerald-500/30">
          <rect width="200" height="120" fill="#022C22" />
          {/* Vault Round Door */}
          <circle cx="100" cy="60" r="45" fill="#065F46" stroke="#10B981" strokeWidth="4" />
          <circle cx="100" cy="60" r="32" fill="#047857" stroke="#34D399" strokeWidth="3" strokeDasharray="6,4" />
          {/* Central Vault Wheel Handle */}
          <circle cx="100" cy="60" r="14" fill="#064E3B" stroke="#6EE7B7" strokeWidth="3" />
          <line x1="100" y1="40" x2="100" y2="80" stroke="#A7F3D0" strokeWidth="4" />
          <line x1="80" y1="60" x2="120" y2="60" stroke="#A7F3D0" strokeWidth="4" />
          {/* Shield lock rivets */}
          <circle cx="70" cy="35" r="2.5" fill="#6EE7B7" />
          <circle cx="130" cy="35" r="2.5" fill="#6EE7B7" />
          <circle cx="70" cy="85" r="2.5" fill="#6EE7B7" />
          <circle cx="130" cy="85" r="2.5" fill="#6EE7B7" />
        </svg>
      ),
    },
    {
      worldNumber: 5,
      realmName: "AI Laboratory",
      slug: "safe-ai-explorer",
      themeColor: "text-cyan-500",
      cardBorder: "border-cyan-400 hover:border-cyan-500",
      gradientBg: "from-cyan-950 via-cyan-900/40 to-slate-900",
      icon: Bot,
      iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
      badgeName: "AI Navigator",
      stars: 2,
      status: "In Progress",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-cyan-950 border border-cyan-500/30">
          <rect width="200" height="120" fill="#083344" />
          {/* Neural Network Nodes */}
          <circle cx="45" cy="40" r="8" fill="#06B6D4" />
          <circle cx="45" cy="80" r="8" fill="#06B6D4" />
          <circle cx="100" cy="60" r="14" fill="#22D3EE" stroke="#67E8F9" strokeWidth="3" />
          <circle cx="155" cy="40" r="8" fill="#06B6D4" />
          <circle cx="155" cy="80" r="8" fill="#06B6D4" />
          {/* Circuits */}
          <line x1="45" y1="40" x2="100" y2="60" stroke="#67E8F9" strokeWidth="2.5" />
          <line x1="45" y1="80" x2="100" y2="60" stroke="#67E8F9" strokeWidth="2.5" />
          <line x1="100" y1="60" x2="155" y2="40" stroke="#67E8F9" strokeWidth="2.5" />
          <line x1="100" y1="60" x2="155" y2="80" stroke="#67E8F9" strokeWidth="2.5" />
          {/* Pulse ring */}
          <circle cx="100" cy="60" r="24" stroke="#A5F3FC" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6" />
        </svg>
      ),
    },
    {
      worldNumber: 6,
      realmName: "Signal Station",
      slug: "voiceguard-rescue",
      themeColor: "text-blue-500",
      cardBorder: "border-blue-400 hover:border-blue-500",
      gradientBg: "from-blue-950 via-blue-900/40 to-slate-900",
      icon: Radio,
      iconBg: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      badgeName: "Voice Guardian",
      stars: 1,
      status: "In Progress",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-blue-950 border border-blue-500/30">
          <rect width="200" height="120" fill="#172554" />
          {/* Telecom Radio Tower */}
          <polygon points="100,20 120,120 80,120" fill="none" stroke="#3B82F6" strokeWidth="3" />
          <line x1="88" y1="50" x2="112" y2="50" stroke="#60A5FA" strokeWidth="2" />
          <line x1="84" y1="80" x2="116" y2="80" stroke="#60A5FA" strokeWidth="2" />
          <line x1="82" y1="105" x2="118" y2="105" stroke="#60A5FA" strokeWidth="2" />
          {/* Antenna Beacon & Waves */}
          <circle cx="100" cy="18" r="5" fill="#EF4444" />
          <path d="M 80,18 A 20 20 0 0 1 120,18" stroke="#93C5FD" strokeWidth="2.5" fill="none" />
          <path d="M 65,18 A 35 35 0 0 1 135,18" stroke="#BFDBFE" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Audio Waveform Bars at Base */}
          <rect x="25" y="85" width="4" height="20" fill="#60A5FA" rx="2" />
          <rect x="33" y="70" width="4" height="35" fill="#3B82F6" rx="2" />
          <rect x="41" y="60" width="4" height="45" fill="#60A5FA" rx="2" />
          <rect x="49" y="80" width="4" height="25" fill="#3B82F6" rx="2" />
        </svg>
      ),
    },
    {
      worldNumber: 7,
      realmName: "Friendship Forest",
      slug: "kindness-kingdom",
      themeColor: "text-pink-500",
      cardBorder: "border-pink-400 hover:border-pink-500",
      gradientBg: "from-pink-950 via-pink-900/40 to-slate-900",
      icon: Heart,
      iconBg: "bg-pink-500/20 text-pink-400 border-pink-500/40",
      badgeName: "Kindness Monarch",
      stars: 3,
      status: "Mastered",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-pink-950 border border-pink-500/30">
          <rect width="200" height="120" fill="#500724" />
          {/* Enchanted Trees */}
          <circle cx="45" cy="50" r="22" fill="#BE185D" />
          <rect x="42" y="72" width="6" height="40" fill="#831843" rx="2" />
          <circle cx="155" cy="50" r="22" fill="#BE185D" />
          <rect x="152" y="72" width="6" height="40" fill="#831843" rx="2" />
          {/* Center Friendship Shrine with Floating Hearts */}
          <polygon points="100,35 125,75 75,75" fill="#F43F5E" />
          <rect x="85" y="75" width="30" height="40" fill="#BE185D" />
          <circle cx="100" cy="20" r="6" fill="#F472B6" />
          <circle cx="75" cy="30" r="3" fill="#FDA4AF" />
          <circle cx="125" cy="30" r="3" fill="#FDA4AF" />
        </svg>
      ),
    },
    {
      worldNumber: 8,
      realmName: "Pixel Dungeon",
      slug: "gamer-safety-quest",
      themeColor: "text-purple-500",
      cardBorder: "border-purple-400 hover:border-purple-500",
      gradientBg: "from-purple-950 via-purple-900/40 to-slate-900",
      icon: Gamepad2,
      iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      badgeName: "Gamer Champion",
      stars: 2,
      status: "In Progress",
      svgIllustration: (
        <svg viewBox="0 0 200 120" className="w-full h-28 rounded-2xl bg-purple-950 border border-purple-500/30">
          <rect width="200" height="120" fill="#2E1065" />
          {/* 8-bit Castle Battlements */}
          <rect x="30" y="40" width="140" height="75" fill="#581C87" />
          <rect x="30" y="25" width="20" height="20" fill="#7E22CE" />
          <rect x="70" y="25" width="20" height="20" fill="#7E22CE" />
          <rect x="110" y="25" width="20" height="20" fill="#7E22CE" />
          <rect x="150" y="25" width="20" height="20" fill="#7E22CE" />
          {/* Portcullis gate & Torch */}
          <rect x="85" y="70" width="30" height="45" fill="#1E0745" rx="15" />
          <circle cx="60" cy="65" r="4" fill="#F59E0B" />
          <circle cx="140" cy="65" r="4" fill="#F59E0B" />
          {/* Loot Chest */}
          <rect x="92" y="90" width="16" height="12" fill="#FCD34D" stroke="#D97706" strokeWidth="2" rx="2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Adventure Map</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-clicky-navy">
          The 8 Safety Worlds
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Follow the illustrated trail across all 8 cyber territories, defeat scammers, collect stars, and claim badges!
        </p>
      </div>

      {/* Progress Summary Ribbon */}
      <div className="max-w-4xl mx-auto p-4 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-wrap items-center justify-around gap-4 text-center">
        <div>
          <span className="text-2xl font-black text-clicky-navy">8 / 8</span>
          <span className="text-[11px] font-bold text-clicky-muted block">Realms Available</span>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" />
        <div>
          <span className="text-2xl font-black text-clicky-yellow flex items-center justify-center gap-1">
            <Star className="w-5 h-5 fill-clicky-yellow" />
            <span>18 / 24</span>
          </span>
          <span className="text-[11px] font-bold text-clicky-muted block">Stars Collected</span>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" />
        <div>
          <span className="text-2xl font-black text-clicky-orange flex items-center justify-center gap-1">
            <Award className="w-5 h-5" />
            <span>4 / 8</span>
          </span>
          <span className="text-[11px] font-bold text-clicky-muted block">Badges Claimed</span>
        </div>
      </div>

      {/* Illustrated Winding Trail Layout */}
      <div className="max-w-4xl mx-auto relative space-y-6">
        {worlds.map((world, idx) => {
          const game = GAMES_DATA.find((g) => g.slug === world.slug) || GAMES_DATA[0];
          const tp = topicProgress[game.topic];
          const isMastered = world.status === "Mastered";
          const Icon = world.icon;

          return (
            <React.Fragment key={world.slug}>
              {/* Connector Trail between Worlds */}
              {idx > 0 && (
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-clicky-pale/80 border border-clicky-sky/40 text-clicky-navy text-xs font-black shadow-xs">
                    <Footprints className="w-3.5 h-3.5 text-clicky-orange animate-pulse" />
                    <span>Trail to World #{world.worldNumber}: {world.realmName}</span>
                  </div>
                </div>
              )}

              {/* World Card Container */}
              <div
                className={`p-6 rounded-3xl bg-white border-2 ${world.cardBorder} shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group`}
              >
                {/* Visual Illustration Banner */}
                <div className="w-full md:w-56 shrink-0 overflow-hidden rounded-2xl shadow-sm">
                  {world.svgIllustration}
                </div>

                {/* World Information */}
                <div className="flex-1 min-w-0 space-y-2 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-clicky-orange bg-clicky-orange-light/30 px-2.5 py-0.5 rounded-full border border-clicky-orange/30">
                      World #{world.worldNumber} • {world.realmName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isMastered
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{world.status}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-clicky-navy group-hover:text-clicky-orange transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                    {game.description}
                  </p>

                  {/* Stars & Badge Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= world.stars
                              ? "text-clicky-yellow fill-clicky-yellow"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-clicky-muted ml-1">
                        {world.stars}/3 Stars
                      </span>
                    </div>

                    <div className="text-xs font-bold text-clicky-navy flex items-center gap-1 bg-clicky-pale px-2.5 py-1 rounded-xl border border-clicky-sky/30">
                      <Award className="w-3.5 h-3.5 text-clicky-navy" />
                      <span>Badge: {world.badgeName}</span>
                    </div>
                  </div>
                </div>

                {/* Action Play Button */}
                <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
                  <Link
                    href={`/child/games/${world.slug}`}
                    onClick={() => playSound("click")}
                    className="w-full md:w-auto px-6 py-3 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-fun active:translate-y-1 transition-all"
                  >
                    <span>Enter {world.realmName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
