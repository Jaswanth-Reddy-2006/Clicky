"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  Cpu,
  HelpCircle,
  Check,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface AILabGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const AILabGame: React.FC<AILabGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  // Safe vs Unsafe prompt tokens
  const promptTokens = [
    { id: "p1", text: "Explain how gravity works in space", isSafe: true },
    { id: "p2", text: "My name is Alex Miller and I live at 14 Oak St", isSafe: false },
    { id: "p3", text: "Give me creative ideas for a science fair volcano", isSafe: true },
    { id: "p4", text: "Here is my school password, fix my account", isSafe: false },
  ];

  const [selectedTokens, setSelectedTokens] = useState<string[]>(["p1"]);
  const [inspectedClaim, setInspectedClaim] = useState<string | null>(null);

  const handleToggleToken = (id: string) => {
    playSound("click");
    if (selectedTokens.includes(id)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== id));
    } else {
      setSelectedTokens([...selectedTokens, id]);
    }
  };

  const hasUnsafeToken = selectedTokens.some(
    (id) => promptTokens.find((t) => t.id === id)?.isSafe === false
  );

  return (
    <div className="space-y-4">
      {/* AI Testing Terminal */}
      <div className="bg-slate-950 text-white p-5 rounded-3xl border-2 border-cyan-800 shadow-xl space-y-4">
        {/* Lab Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                Future AI Sandbox & Prompt Lab
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Prompt Shield & AI Fact Verification
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700 text-xs font-bold text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Model v4.2 Active</span>
          </div>
        </div>

        {/* Prompt Builder Stage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-cyan-300 tracking-wider">
            <span>Step 1: Choose Safe Query Blocks (Zero Private Info):</span>
            {hasUnsafeToken && (
              <span className="text-red-400 font-bold flex items-center gap-1">
                <AlertOctagon className="w-3 h-3" />
                <span>Private Data Leak Detected!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {promptTokens.map((token) => {
              const isSelected = selectedTokens.includes(token.id);
              return (
                <button
                  key={token.id}
                  type="button"
                  onClick={() => handleToggleToken(token.id)}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? token.isSafe
                        ? "bg-cyan-950/60 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/40"
                        : "bg-red-950/60 border-red-500 text-red-200 ring-1 ring-red-500/50"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="flex-1">{token.text}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? token.isSafe
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-red-500 text-white"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Output Verification Stage */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-800/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 2: Inspect AI Chatbot Response for Hallucinations</span>
            </span>
            <span className="text-[10px] text-slate-400">Click highlighted text</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
            <p>
              &ldquo;
              {scenario.characterMessage ||
                "Sure! Here is the answer: Remember that gravity on the Moon is one-sixth of Earth's gravity. However, humans can easily jump to the Moon using a trampoline."}
              &rdquo;
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  playSound("clue");
                  setInspectedClaim(
                    "Hallucination Alert: AI models often sound very confident even when inventing completely impossible facts. Always double-check homework with real textbooks or teachers!"
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-amber-300" />
                <span>Test Accuracy of Claim</span>
              </button>
            </div>

            {inspectedClaim && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-[11px] text-amber-200 font-medium"
              >
                {inspectedClaim}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Safety Decision Selection */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Choose Your Responsible AI Decision
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
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Execute Safe AI Decision</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
