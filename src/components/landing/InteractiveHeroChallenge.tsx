"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Mail,
} from "lucide-react";
import { Mascot } from "../common/Mascot";
import { playSound } from "@/lib/utils";

interface HeroOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

const HERO_OPTIONS: HeroOption[] = [
  {
    id: "opt-a",
    text: "Click the link immediately to claim the 10,000 coins before time expires.",
    isCorrect: false,
    explanation:
      "Wait! That's a classic phishing trap. Scammers create fake urgency so kids click without thinking. Real games never hand out free currency through suspicious chat links!",
  },
  {
    id: "opt-b",
    text: "Never click strange prize links; report the message and warn your friends about the scam.",
    isCorrect: true,
    explanation:
      "Spot on, Detective! You spotted the fake reward trap, protected your account credentials, and helped keep the whole community safe!",
  },
  {
    id: "opt-c",
    text: "Ask for the sender's account password first before giving them yours.",
    isCorrect: false,
    explanation:
      "Careful! You should never trade passwords with anyone, and engaging with scammers can lead to more spam and phishing attempts.",
  },
];

export const InteractiveHeroChallenge: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (option: HeroOption) => {
    if (hasAnswered) return;
    playSound("click");
    setSelectedId(option.id);
    setHasAnswered(true);
    if (option.isCorrect) {
      playSound("correct");
    } else {
      playSound("incorrect");
    }
  };

  const handleReset = () => {
    playSound("click");
    setSelectedId(null);
    setHasAnswered(false);
  };

  const selectedOption = HERO_OPTIONS.find((o) => o.id === selectedId);

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-2 border-clicky-yellow/60 shadow-card-hover max-w-lg mx-auto text-left relative overflow-hidden">
      {/* Decorative Corner Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-clicky-yellow/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black border border-clicky-yellow/50">
          <Sparkles className="w-3.5 h-3.5 text-clicky-orange" />
          <span>INSTANT SAFETY CHALLENGE</span>
        </span>
        <span className="text-[11px] font-extrabold text-clicky-orange bg-clicky-orange-light/40 px-2.5 py-0.5 rounded-full border border-clicky-orange/30">
          Playable without login
        </span>
      </div>

      {/* Challenge Scenario Prompt */}
      <div className="p-3.5 rounded-2xl bg-clicky-pale/80 border border-clicky-sky/40 mb-4">
        <div className="text-[11px] font-black uppercase tracking-wider text-clicky-navy/70 mb-1 flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-clicky-orange" />
          <span>Mystery Message Received:</span>
        </div>
        <p className="text-sm sm:text-base font-black text-clicky-navy leading-snug">
          &ldquo;You found a message offering 10,000 free game coins. It asks you to click a strange link. What should you do?&rdquo;
        </p>
      </div>

      {/* Interactive Option Cards */}
      <div className="space-y-2.5">
        {HERO_OPTIONS.map((opt, i) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = "bg-clicky-bg hover:bg-clicky-pale border-clicky-border text-clicky-text";

          if (hasAnswered) {
            if (opt.isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 font-bold";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = "bg-red-50 border-red-300 text-red-950 font-bold";
            } else {
              btnStyle = "bg-gray-50 border-gray-200 opacity-60 text-gray-500";
            }
          } else if (isSelected) {
            btnStyle = "bg-clicky-pale border-clicky-navy ring-2 ring-clicky-navy";
          }

          return (
            <motion.button
              key={opt.id}
              whileHover={!hasAnswered ? { scale: 1.015, x: 2 } : {}}
              whileTap={!hasAnswered ? { scale: 0.985 } : {}}
              onClick={() => handleSelect(opt)}
              disabled={hasAnswered}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${btnStyle}`}
            >
              <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs transition-colors ${
                hasAnswered && opt.isCorrect
                  ? "bg-emerald-500 text-white"
                  : hasAnswered && isSelected && !opt.isCorrect
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300 text-clicky-navy"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 pt-0.5 leading-snug">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Immediate Animated Educational Feedback */}
      <AnimatePresence>
        {hasAnswered && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`mt-4 p-4 rounded-2xl border-2 shadow-xs ${
              selectedOption.isCorrect
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-amber-50 border-amber-300 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <Mascot size="sm" mood={selectedOption.isCorrect ? "detective" : "warning"} animate={false} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-black text-xs uppercase mb-1">
                  {selectedOption.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Correct Safe Choice! (+25 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-800">Safety Lesson Learned!</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {selectedOption.explanation}
                </p>

                {/* Golden Safety Takeaway */}
                <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-current/20 text-[11px] font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-clicky-orange shrink-0" />
                  <span>
                    <strong>Golden Takeaway:</strong> Real game companies never distribute free currency via private chat links!
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-3.5 flex items-center justify-between gap-2 pt-2 border-t border-gray-200/60">
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-clicky-muted hover:text-clicky-navy flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>

                  <Link
                    href="/child/games/scam-detective"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-clicky-orange hover:bg-clicky-orange-hover text-white text-xs font-black shadow-fun-orange active:translate-y-0.5 transition-all"
                  >
                    <span>Play Scam Detective Full Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
