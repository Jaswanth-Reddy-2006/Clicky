"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Shield,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  Check,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface ChatSimulationGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const ChatSimulationGame: React.FC<ChatSimulationGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  // Available response block tokens
  const responseTokens = [
    { id: "t1", text: "Hey everyone, let's keep it friendly here.", safe: true, type: "deescalate" },
    { id: "t2", text: "That was hurtful and not cool to say.", safe: true, type: "boundary" },
    { id: "t3", text: "I'm sending you a private message to check in on you.", safe: true, type: "support" },
    { id: "t4", text: "Let's focus on enjoying the game together.", safe: true, type: "redirect" },
    { id: "t5", text: "You're just being way too sensitive!", safe: false, type: "dismissive" },
    { id: "t6", text: "Whatever, this chat is boring anyway.", safe: false, type: "unhelpful" },
  ];

  const [assembledTokens, setAssembledTokens] = useState<typeof responseTokens>([]);

  const handleAddToken = (token: (typeof responseTokens)[0]) => {
    if (assembledTokens.some((t) => t.id === token.id)) return;
    playSound("click");
    setAssembledTokens([...assembledTokens, token]);
  };

  const handleRemoveToken = (tokenId: string) => {
    playSound("click");
    setAssembledTokens(assembledTokens.filter((t) => t.id !== tokenId));
  };

  const handleClear = () => {
    playSound("click");
    setAssembledTokens([]);
  };

  // Calculate empathy meter
  const safeTokensCount = assembledTokens.filter((t) => t.safe).length;
  const hasUnsafe = assembledTokens.some((t) => !t.safe);
  const empathyLevel = hasUnsafe ? 20 : Math.min(100, safeTokensCount * 35);

  return (
    <div className="space-y-4">
      {/* Simulation Chat Box */}
      <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-card overflow-hidden">
        {/* Chat Room Top Bar */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/30 flex items-center justify-center font-bold text-indigo-200 border border-indigo-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                <span>Team Gamer & Class Chat</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              </h3>
              <p className="text-[11px] text-indigo-200 font-medium">5 players active</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-700/60 text-xs font-bold text-indigo-300">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Upstander Mode</span>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="p-4 bg-slate-50 space-y-3 min-h-[160px]">
          {/* Prior benign message */}
          <div className="flex items-start gap-2.5 max-w-[80%]">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
              M
            </div>
            <div className="bg-white p-2.5 rounded-2xl rounded-tl-xs border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 block">Maya</span>
              <p className="text-xs text-slate-800">Good game everyone! That last round was super close.</p>
            </div>
          </div>

          {/* Hurtful / Provocative message from scenario */}
          <div className="flex items-start gap-2.5 max-w-[85%]">
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600 shadow-2xs">
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <div className="bg-red-50/80 p-3 rounded-2xl rounded-tl-xs border-2 border-red-200 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-black text-red-700 uppercase tracking-wide">
                  {scenario.characterName || "Trolling Player"}
                </span>
                <span className="text-[9px] font-bold bg-red-200 text-red-800 px-1.5 py-0.2 rounded">
                  Hurtful
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-red-950 leading-relaxed">
                {scenario.characterMessage || scenario.prompt}
              </p>
            </div>
          </div>

          {/* User's Assembled Response Bubble (Live Preview) */}
          {assembledTokens.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-end gap-2.5"
            >
              <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-xs shadow-md max-w-[85%] space-y-1">
                <span className="text-[10px] font-black text-indigo-200 block">
                  Alex (You) • Live Upstander Draft
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {assembledTokens.map((t) => t.text).join(" ")}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
            </motion.div>
          )}
        </div>

        {/* Response Block Assembly Workshop */}
        <div className="p-4 border-t border-indigo-100 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">
                Assemble Safe Response Tokens:
              </span>
            </div>

            {/* Empathy Meter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500">Empathy Power:</span>
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    hasUnsafe
                      ? "bg-red-500"
                      : empathyLevel >= 70
                      ? "bg-emerald-500"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${empathyLevel}%` }}
                />
              </div>
              <Heart
                className={`w-3.5 h-3.5 ${
                  hasUnsafe
                    ? "text-red-400"
                    : empathyLevel >= 70
                    ? "text-emerald-500 fill-emerald-500"
                    : "text-indigo-400"
                }`}
              />
            </div>
          </div>

          {/* Tokens Shelf */}
          <div className="flex flex-wrap gap-2">
            {responseTokens.map((token) => {
              const isUsed = assembledTokens.some((t) => t.id === token.id);
              return (
                <button
                  key={token.id}
                  type="button"
                  onClick={() => (isUsed ? handleRemoveToken(token.id) : handleAddToken(token))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isUsed
                      ? "bg-indigo-50 border-indigo-400 text-indigo-700 opacity-60 line-through"
                      : token.safe
                      ? "bg-white border-indigo-200 text-indigo-950 hover:bg-indigo-50 hover:border-indigo-400 shadow-2xs"
                      : "bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-700"
                  }`}
                >
                  {isUsed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  )}
                  <span>{token.text}</span>
                </button>
              );
            })}
          </div>

          {assembledTokens.length > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Tokens</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upstander Action Decision Options */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Select Your Hero Upstander Action
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
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Take Upstander Action</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
