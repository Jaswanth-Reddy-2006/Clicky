"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Star, ArrowRight, RotateCcw, Award, CheckCircle } from "lucide-react";
import { Mascot } from "../common/Mascot";
import { playSound } from "@/lib/utils";

interface RewardCelebrationProps {
  gameTitle: string;
  score: number;
  xpEarned: number;
  badgeName?: string;
  badgeUnlocked?: string;
  onReplay: () => void;
  returnUrl?: string;
}

export const RewardCelebration: React.FC<RewardCelebrationProps> = ({
  gameTitle,
  score,
  xpEarned,
  badgeName = "Safety Badge",
  onReplay,
  returnUrl = "/child/games",
}) => {
  useEffect(() => {
    playSound("celebrate");

    // Confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#F6D84A", "#E9A15A", "#8FC8F2", "#A9DCCB", "#344D78"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="max-w-xl mx-auto my-6 p-6 sm:p-8 bg-white rounded-3xl border-2 border-clicky-yellow shadow-card-hover text-center"
    >
      {/* Top Mascot and Trophy */}
      <div className="relative inline-block mb-3">
        <Mascot size="lg" mood="cheer" />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-clicky-yellow flex items-center justify-center shadow-md text-clicky-navy-dark"
        >
          <Trophy className="w-5 h-5 text-clicky-navy-dark" />
        </motion.div>
      </div>

      <span className="inline-block px-3 py-1 rounded-full bg-clicky-mint-light text-clicky-navy-dark font-black text-xs uppercase tracking-wider mb-2">
        Mission Accomplished!
      </span>

      <h2 className="text-2xl sm:text-3xl font-black text-clicky-navy mb-1">
        {gameTitle}
      </h2>
      <p className="text-clicky-muted text-sm font-semibold max-w-md mx-auto mb-6">
        Sensational work! You spotted the red flags, made the safe choices, and protected the Clicky universe!
      </p>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Score Card */}
        <div className="p-4 rounded-2xl bg-clicky-pale border border-clicky-sky/50 text-center">
          <div className="text-xs font-bold text-clicky-muted uppercase tracking-wide mb-1">
            Accuracy Score
          </div>
          <div className="text-3xl sm:text-4xl font-black text-clicky-navy flex items-center justify-center gap-1">
            <span>{score}%</span>
            <CheckCircle className="w-6 h-6 text-emerald-500 fill-emerald-100" />
          </div>
          <div className="text-[11px] font-bold text-clicky-navy-light mt-1">
            {score >= 90 ? "Flawless Detective!" : score >= 70 ? "Great Safe Decisions!" : "Good Effort, Keep Practicing!"}
          </div>
        </div>

        {/* XP Earned Card */}
        <div className="p-4 rounded-2xl bg-clicky-yellow-pale border border-clicky-yellow/60 text-center">
          <div className="text-xs font-bold text-clicky-muted uppercase tracking-wide mb-1">
            XP Earned
          </div>
          <div className="text-3xl sm:text-4xl font-black text-clicky-orange flex items-center justify-center gap-1">
            <span>+{xpEarned}</span>
            <Star className="w-6 h-6 text-clicky-yellow fill-clicky-yellow" />
          </div>
          <div className="text-[11px] font-bold text-clicky-navy-light mt-1">
            Added to your level!
          </div>
        </div>
      </div>

      {/* Badge Unlocked Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-6 flex items-center gap-4 text-left">
        <div className="w-12 h-12 rounded-2xl bg-clicky-yellow flex items-center justify-center shrink-0 shadow-sm text-clicky-navy">
          <Award className="w-6 h-6 text-clicky-navy" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
            Badge Unlocked!
          </div>
          <h4 className="font-black text-clicky-navy text-base leading-tight">
            {badgeName}
          </h4>
          <p className="text-xs text-clicky-muted mt-0.5">
            Added to your profile achievements showcase and parent dashboard!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <button
          onClick={onReplay}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 text-clicky-navy font-black text-sm border-2 border-gray-200 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <Link
          href={returnUrl}
          className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm transition-all shadow-fun-orange active:translate-y-1 flex items-center justify-center gap-2"
        >
          <span>Continue Adventures</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
