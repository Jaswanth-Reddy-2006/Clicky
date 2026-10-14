"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck } from "lucide-react";
import { Mascot } from "../common/Mascot";
import { playSound } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

const HERO_OPTIONS: Option[] = [
  {
    id: "opt-1",
    text: "Click the link quickly and enter your game password so you don't lose the prize.",
    isCorrect: false,
    feedback:
      "Wait! That's a classic phishing scam. Real companies never ask for your password on random chat links!",
  },
  {
    id: "opt-2",
    text: "Ignore the link, do not enter passwords, and report the message for phishing.",
    isCorrect: true,
    feedback:
      "Spot on, Detective! You recognized the fake prize trap and protected your account!",
  },
  {
    id: "opt-3",
    text: "Send the link to 5 friends to see if they get a console too.",
    isCorrect: false,
    feedback:
      "Careful! Forwarding scam links spreads the danger to your friends' accounts too.",
  },
];

export const InteractiveHeroChallenge: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (option: Option) => {
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
    setSelectedId(null);
    setHasAnswered(false);
  };

  const selectedOption = HERO_OPTIONS.find((o) => o.id === selectedId);

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-2 border-clicky-yellow/60 shadow-card-hover max-w-lg mx-auto text-left">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black border border-clicky-yellow/50">
          <Sparkles className="w-3.5 h-3.5 text-clicky-orange" />
          <span>TRY A QUICK MISSION</span>
        </span>
        <span className="text-xs font-extrabold text-clicky-orange">
          No Login Required
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-black text-clicky-navy leading-snug">
        You receive a message saying you won a free gaming console. It asks you to click a strange link. What do you do?
      </h3>

      {/* Interactive Options */}
      <div className="mt-4 space-y-2.5">
        {HERO_OPTIONS.map((opt, i) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = "bg-clicky-bg hover:bg-clicky-pale/80 border-clicky-border text-clicky-text";

          if (hasAnswered) {
            if (opt.isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = "bg-red-50 border-red-300 text-red-950";
            } else {
              btnStyle = "bg-gray-50 border-gray-200 opacity-60";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              disabled={hasAnswered}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center font-black text-xs shrink-0 text-clicky-navy shadow-2xs">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Immediate Educational Feedback */}
      <AnimatePresence>
        {hasAnswered && selectedOption && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`mt-4 p-4 rounded-2xl border ${
              selectedOption.isCorrect
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-amber-50 border-amber-300 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">
                <Mascot size="sm" mood={selectedOption.isCorrect ? "happy" : "thinking"} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-black text-xs uppercase mb-1">
                  {selectedOption.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Awesome Detective Work!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span>Good Lesson to Know!</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {selectedOption.feedback}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-gray-200/50">
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-clicky-muted hover:text-clicky-navy flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>

                  <Link
                    href="/child/games/scam-detective"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-clicky-orange hover:bg-clicky-orange-hover text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <span>Play Full Game</span>
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
