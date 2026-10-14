"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Lightbulb,
  Lock,
  HeartHandshake,
  ShieldAlert,
  Zap,
  UsersRound,
  Radio,
  Pause,
  PhoneCall,
  Heart,
} from "lucide-react";
import { Mascot } from "@/components/common/Mascot";
import { GAMES_DATA } from "@/lib/data/games-data";
import { getLevelProgress, playSound } from "@/lib/utils";

// Power-Up Definitions
const POWER_UPS = [
  {
    id: "pw-pause",
    name: "Pause Before You Click",
    desc: "Take 3 seconds to examine weird links and sender URLs.",
    icon: Pause,
    unlocked: true,
  },
  {
    id: "pw-adult",
    name: "Check With a Trusted Adult",
    desc: "Always ask when an app asks for credit cards or money.",
    icon: HeartHandshake,
    unlocked: true,
  },
  {
    id: "pw-password",
    name: "Never Share Passwords",
    desc: "Keep your secret codes locked even from best friends.",
    icon: Lock,
    unlocked: true,
  },
  {
    id: "pw-verify",
    name: "Verify Through Another Channel",
    desc: "Call a family member directly if someone claims an emergency.",
    icon: PhoneCall,
    unlocked: true,
  },
  {
    id: "pw-kindness",
    name: "Be Kind Online",
    desc: "Support victims of cyberbullying and don't forward hate.",
    icon: Heart,
    unlocked: false,
  },
];

export default function ChildDashboardPage() {
  const [profile, setProfile] = useState<{
    name: string;
    level: number;
    levelTitle: string;
    xp: number;
    currentStreak: number;
    mascotAccessory?: any;
    mascotColorTheme?: any;
  }>({
    name: "Alex",
    level: 2,
    levelTitle: "Safety Scout",
    xp: 480,
    currentStreak: 3,
    mascotAccessory: "detective-cap",
    mascotColorTheme: "classic-blue",
  });

  const [loading, setLoading] = useState(true);

  // Daily Mystery State
  const [dailyAnswered, setDailyAnswered] = useState(false);
  const [dailyChoice, setDailyChoice] = useState<number | null>(null);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);

  useEffect(() => {
    fetchProfile();
    // Load local customization preferences if present
    const savedAccessory = localStorage.getItem("clicky_mascot_accessory");
    const savedTheme = localStorage.getItem("clicky_mascot_theme");
    if (savedAccessory || savedTheme) {
      setProfile((prev) => ({
        ...prev,
        mascotAccessory: savedAccessory || prev.mascotAccessory,
        mascotColorTheme: savedTheme || prev.mascotColorTheme,
      }));
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.success && data.childProfile) {
        setProfile((prev) => ({
          ...prev,
          name: data.childProfile.name,
          level: data.childProfile.level,
          levelTitle: data.childProfile.levelTitle,
          xp: data.childProfile.xp,
          currentStreak: data.childProfile.currentStreak,
        }));
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  const handleDailyAnswer = (index: number) => {
    if (dailyAnswered) return;
    setDailyChoice(index);
    setDailyAnswered(true);
    if (index === 1) {
      playSound("correct");
      setDailyBonusClaimed(true);
      setProfile((prev) => ({ ...prev, xp: prev.xp + 50 }));
    } else {
      playSound("incorrect");
    }
  };

  const progress = getLevelProgress(profile.xp);
  const featuredGame = GAMES_DATA[0]; // Scam Detective
  const recommendedGame = GAMES_DATA[5]; // VoiceGuard Rescue

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Adventure Hero Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white relative overflow-hidden shadow-card">
        {/* Animated Custom Mascot Preview in Corner */}
        <div className="absolute right-3 -bottom-5 sm:right-6 sm:-bottom-4 opacity-90 select-none">
          <Mascot
            size="xl"
            mood="cheer"
            accessory={profile.mascotAccessory || "detective-cap"}
            colorTheme={profile.mascotColorTheme || "classic-blue"}
          />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-clicky-yellow text-xs font-black border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-clicky-yellow" />
            <span>LEVEL {profile.level} • {profile.levelTitle.toUpperCase()}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Hey, {profile.name}! Ready for today&apos;s adventure?
          </h1>

          <p className="text-xs sm:text-sm text-clicky-sky-light font-medium leading-relaxed max-w-lg">
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

            <Link
              href="/child/profile"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-clicky-yellow font-black text-xs sm:text-sm border border-white/30 transition-all flex items-center gap-1.5"
            >
              <span>Customize Outfit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Level XP Progress Card */}
        <div className="p-5 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-clicky-navy tracking-wider">
                Hero Level Progress
              </span>
              <span className="w-7 h-7 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4 text-clicky-orange" />
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
              Awesome consistency! Completing one mission every day builds lifelong safety reflexes.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-clicky-border/60 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Today&apos;s goal active</span>
            </span>
            <span className="text-clicky-orange font-black">+25 XP streak bonus</span>
          </div>
        </div>

        {/* World Quest Map Quick Entry Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-clicky-pale to-white border border-clicky-sky/50 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-clicky-navy bg-clicky-sky/30 px-2 py-0.5 rounded-full">
                Interactive Journey
              </span>
              <Compass className="w-4 h-4 text-clicky-navy" />
            </div>

            <h4 className="font-black text-clicky-navy text-sm mt-1">
              The 8 Realm World Map
            </h4>
            <p className="text-xs text-clicky-muted font-semibold mt-1 leading-relaxed">
              Explore all 8 safety worlds, view stars earned, and conquer each cyber territory!
            </p>
          </div>

          <Link
            href="/child/adventures"
            className="mt-4 w-full py-2.5 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Open Adventure Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* FEATURE C: DAILY SAFETY MYSTERY (Interactive directly on dashboard) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-clicky-yellow-pale via-white to-amber-50/50 border-2 border-clicky-yellow/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-clicky-yellow text-clicky-navy-dark flex items-center justify-center text-xl font-black shadow-xs">
              <Zap className="w-5 h-5 text-clicky-navy-dark" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                Daily Mystery Challenge
              </span>
              <h3 className="text-base sm:text-lg font-black text-clicky-navy leading-snug">
                The Tricky &ldquo;Account Verification&rdquo; Pop-Up
              </h3>
            </div>
          </div>

          <span className="text-xs font-black px-3 py-1 rounded-full bg-clicky-orange text-white shadow-2xs self-start sm:self-auto">
            +50 Bonus XP
          </span>
        </div>

        <p className="text-xs sm:text-sm text-clicky-text font-semibold mb-4 leading-relaxed bg-white/80 p-3 rounded-2xl border border-amber-200">
          A pop-up in your browser flashes: &ldquo;WARNING! Your account will be banned in 60 seconds unless you type your parent&apos;s phone number here.&rdquo; What is the safe hero choice?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleDailyAnswer(0)}
            disabled={dailyAnswered}
            className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all ${
              dailyAnswered
                ? dailyChoice === 0
                  ? "bg-red-50 border-red-300 text-red-950 font-black"
                  : "bg-gray-50 border-gray-200 opacity-60"
                : "bg-white border-clicky-border hover:border-clicky-navy hover:bg-clicky-pale/40 text-clicky-navy"
            }`}
          >
            A: Type the number fast to save your account before the timer expires.
          </button>

          <button
            onClick={() => handleDailyAnswer(1)}
            disabled={dailyAnswered}
            className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all ${
              dailyAnswered
                ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-300"
                : "bg-white border-clicky-border hover:border-clicky-navy hover:bg-clicky-pale/40 text-clicky-navy"
            }`}
          >
            B: Close the browser tab immediately; countdown timers are fake scare tricks.
          </button>
        </div>

        {dailyAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`mt-4 p-3.5 rounded-2xl text-xs font-semibold leading-relaxed border ${
              dailyChoice === 1
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-amber-50 border-amber-300 text-amber-950"
            }`}
          >
            {dailyChoice === 1 ? (
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Brilliant move! You spotted the urgency scare scam and earned +50 XP!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Good lesson! Real companies never use scary countdown timers to pressure you into typing numbers.</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* FEATURE B: COLLECTIBLE SAFETY POWER-UPS RACK */}
      <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-clicky-yellow fill-clicky-yellow" />
              <h3 className="text-lg font-black text-clicky-navy">
                Your Safety Power-Ups
              </h3>
            </div>
            <p className="text-xs text-clicky-muted font-bold mt-0.5">
              Collectible learning shields unlocked through your mission choices
            </p>
          </div>
          <span className="text-xs font-black text-clicky-orange bg-clicky-orange-light/30 px-3 py-1 rounded-full border border-clicky-orange/30">
            4 / 5 Collected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {POWER_UPS.map((pw) => {
            const Icon = pw.icon;
            return (
              <div
                key={pw.id}
                className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                  pw.unlocked
                    ? "bg-gradient-to-b from-clicky-pale/80 to-white border-clicky-sky/60 shadow-2xs"
                    : "bg-gray-50 border-dashed border-gray-200 opacity-60"
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-clicky-yellow/30 flex items-center justify-center text-clicky-navy mb-2 border border-clicky-yellow/40">
                    <Icon className="w-4 h-4 text-clicky-navy" />
                  </div>
                  <h5 className="font-black text-clicky-navy text-xs leading-snug">
                    {pw.name}
                  </h5>
                  <p className="text-[11px] text-clicky-muted font-medium mt-1 leading-tight">
                    {pw.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] font-black uppercase">
                  {pw.unlocked ? (
                    <span className="text-emerald-600">✓ Active Power</span>
                  ) : (
                    <span className="text-gray-400">Locked in Kingdom</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURE C: SAFE FRIENDS CIRCLE PREVIEW */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-card flex flex-col sm:flex-row items-center justify-between gap-5 border border-indigo-700/60">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0 shadow-xs">
            <UsersRound className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider">
                Safe Friends Circle
              </span>
              <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                3 Friends Online
              </span>
            </div>
            <h3 className="text-lg font-black text-white leading-snug">
              Maya & Leo are on active safety streaks!
            </h3>
            <p className="text-xs text-indigo-200 font-medium mt-0.5">
              Send an encouragement cheer sticker or accept friend quests in your Safe Friends Circle.
            </p>
          </div>
        </div>

        <Link
          href="/child/friends"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-black text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Open Friends Circle</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recommended Next Mission Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-clicky-pale border border-clicky-sky/40 flex items-center justify-center text-clicky-navy shrink-0 shadow-xs">
            <Radio className="w-7 h-7 text-clicky-navy" />
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

      {/* Safety Realms Quick Arcade Grid */}
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
            <span>View All 8 Games</span>
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
