"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Smile,
  Frown,
  Meh,
  Shield,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface KindnessStoryGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const KindnessStoryGame: React.FC<KindnessStoryGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  const [empathyScore, setEmpathyScore] = useState(50);
  const [branchChoice, setBranchChoice] = useState<number | null>(null);

  const handleBranchSelect = (choiceIdx: number, delta: number) => {
    playSound("click");
    setBranchChoice(choiceIdx);
    setEmpathyScore((prev) => Math.max(10, Math.min(100, prev + delta)));
  };

  const branchChoices = [
    {
      text: "Step in and invite them to your team lobby with a warm welcome.",
      delta: 40,
      reaction:
        "The player's face lights up! They reply: 'Thank you so much! I was really nervous nobody would want to play with me.'",
      outcome: "HIGH_EMPATHY",
    },
    {
      text: "Send a private encouraging direct message so they don't feel alone.",
      delta: 30,
      reaction:
        "They whisper back: 'Thanks for noticing. That group was really mean, I feel way better now.'",
      outcome: "SUPPORTIVE",
    },
    {
      text: "Stay completely quiet and just watch what happens next.",
      delta: -15,
      reaction:
        "The player feels isolated and leaves the lobby sadly. Being a passive bystander can prolong bullying.",
      outcome: "PASSIVE",
    },
  ];

  const currentBranch = branchChoice !== null ? branchChoices[branchChoice] : null;

  return (
    <div className="space-y-4">
      {/* Kindness Sanctuary Theater */}
      <div className="bg-gradient-to-br from-pink-950 via-pink-900 to-slate-950 text-white p-5 rounded-3xl border-2 border-pink-700 shadow-xl space-y-4">
        {/* Theater Header */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-300">
                Empathy Sanctuary & Social Story
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Branching Kindness Narrative
              </h4>
            </div>
          </div>

          {/* Empathy Heart Gauge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-pink-200 font-bold">Empathy Realm:</span>
            <div className="w-24 h-2.5 bg-pink-950 rounded-full overflow-hidden border border-pink-800">
              <div
                className={`h-full transition-all duration-500 ${
                  empathyScore >= 80
                    ? "bg-gradient-to-r from-pink-400 to-rose-400"
                    : empathyScore >= 50
                    ? "bg-pink-500"
                    : "bg-slate-500"
                }`}
                style={{ width: `${empathyScore}%` }}
              />
            </div>
            <span className="text-xs font-black font-mono text-pink-300">
              {empathyScore}%
            </span>
          </div>
        </div>

        {/* Narrative Scene Setup */}
        <div className="bg-pink-900/40 p-4 rounded-2xl border border-pink-700/60 space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-2xl border transition-all ${
                empathyScore >= 80
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-105"
                  : empathyScore >= 50
                  ? "bg-pink-500/20 border-pink-400 text-pink-300"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}
            >
              {empathyScore >= 80 ? (
                <Smile className="w-6 h-6 text-emerald-400" />
              ) : empathyScore >= 50 ? (
                <Meh className="w-6 h-6 text-pink-300" />
              ) : (
                <Frown className="w-6 h-6 text-rose-400" />
              )}
            </div>
            <div>
              <h5 className="text-sm font-black text-white flex items-center gap-2">
                <span>{scenario.characterName || "New Player in Lobby"}</span>
                <span className="text-[10px] bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded-full border border-pink-500/40 font-mono">
                  Social Scene
                </span>
              </h5>
              <p className="text-xs text-pink-200/90 mt-0.5">{scenario.prompt}</p>
            </div>
          </div>

          {scenario.characterMessage && (
            <p className="text-xs sm:text-sm bg-pink-950/60 p-3 rounded-xl border border-pink-800/80 leading-relaxed text-pink-100 font-sans italic">
              &ldquo;{scenario.characterMessage}&rdquo;
            </p>
          )}
        </div>

        {/* Interactive Story Branches */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase text-pink-300 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Interactive Story Branch (How do you intervene?):</span>
          </span>

          <div className="space-y-2">
            {branchChoices.map((choice, idx) => {
              const isSelected = branchChoice === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleBranchSelect(idx, choice.delta)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? "bg-pink-950/80 border-pink-400 text-pink-100 ring-2 ring-pink-500/40 shadow-md"
                      : "bg-pink-900/30 border-pink-800 hover:border-pink-600/80 text-pink-200"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-pink-800 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="flex-1 leading-snug">{choice.text}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Story Consequence */}
          <AnimatePresence>
            {currentBranch && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3.5 rounded-2xl bg-pink-950/90 border border-pink-500/60 text-xs text-pink-100 space-y-1"
              >
                <span className="font-extrabold text-pink-300 uppercase tracking-wide text-[10px] block">
                  Outcome Consequence:
                </span>
                <p className="font-medium leading-relaxed">{currentBranch.reaction}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decision Selection Options */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Complete Your Kindness Mission
        </h3>

        <div className="space-y-2.5">
          {scenario.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.isCorrect;

            let cardStyle =
              "bg-white border-clicky-border hover:border-clicky-navy hover:bg-clicky-pale/40 text-clicky-text";

            if (hasSubmitted) {
              if (isCorrect) {
                cardStyle =
                  "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 font-bold";
              } else if (isSelected && !isCorrect) {
                cardStyle = "bg-red-50 border-red-300 text-red-950 font-bold";
              } else {
                cardStyle = "bg-gray-50 border-gray-200 opacity-60 text-gray-500";
              }
            } else if (isSelected) {
              cardStyle =
                "bg-clicky-pale border-clicky-navy ring-2 ring-clicky-navy shadow-xs font-semibold";
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectOption(option)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${cardStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                    hasSubmitted && isCorrect
                      ? "bg-emerald-500 text-white"
                      : hasSubmitted && isSelected && !isCorrect
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-clicky-navy text-white"
                      : "bg-white border border-gray-300 text-clicky-navy"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5 leading-snug">{option.text}</span>
              </button>
            );
          })}
        </div>

        {!hasSubmitted && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onConfirm}
              disabled={!selectedOptionId}
              className="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Seal Kindness Decision</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
