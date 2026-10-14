"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  FileSearch,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface EvidenceBoardGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const EvidenceBoardGame: React.FC<EvidenceBoardGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  // 3 investigative evidence files
  const evidenceFiles = [
    {
      id: "source",
      category: "Source & Domain",
      title: "Domain Registry & Author",
      preview: "Who created and posted this?",
      verdict: "SUSPICIOUS",
      finding:
        "The site was registered only 4 days ago with hidden ownership. No verified editorial masthead or corrections policy exists.",
      icon: FileSearch,
    },
    {
      id: "media",
      category: "Media Forensics",
      title: "Reverse Image & Video Scan",
      preview: "Has this visual been manipulated?",
      verdict: "MANIPULATED",
      finding:
        "Digital forensics reveal pixel stretching around the edges, unnatural lighting shadows, and deepfake AI generation artifacts.",
      icon: Layers,
    },
    {
      id: "consensus",
      category: "Cross-Reference",
      title: "Consensus Fact Check",
      preview: "Do reputable news outlets report this?",
      verdict: "UNVERIFIED",
      finding:
        "Zero major scientific, governmental, or accredited news organizations have reported this extraordinary claim.",
      icon: ExternalLink,
    },
  ];

  const handleToggleCard = (id: string) => {
    playSound("click");
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((c) => c !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  const inspectedCount = flippedCards.length;

  return (
    <div className="space-y-4">
      {/* Fact-Check Pinboard */}
      <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 text-white p-5 rounded-3xl border-2 border-rose-800 shadow-xl space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                Newsroom Investigation Desk
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Fact-Check Dossier • Examine The 3 Clue Files
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-700 text-xs font-bold text-rose-200">
            <span>{inspectedCount} / 3 Files Examined</span>
          </div>
        </div>

        {/* Viral Headline Card */}
        <div className="bg-rose-900/40 p-4 rounded-2xl border border-rose-700/60 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Viral Claim
            </span>
            <span className="text-xs text-rose-200 font-mono">1.2M Shares • Trending</span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
            &ldquo;{scenario.prompt}&rdquo;
          </p>
          {scenario.characterMessage && (
            <p className="text-xs text-rose-200/90 italic bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/60">
              {scenario.characterMessage}
            </p>
          )}
        </div>

        {/* 3 Interactive Evidence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {evidenceFiles.map((file) => {
            const isFlipped = flippedCards.includes(file.id);
            const Icon = file.icon;

            return (
              <button
                key={file.id}
                type="button"
                onClick={() => handleToggleCard(file.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[140px] ${
                  isFlipped
                    ? "bg-slate-900 border-rose-400/80 ring-2 ring-rose-500/30 shadow-md"
                    : "bg-rose-950/60 border-rose-800 hover:border-rose-600/80 hover:bg-rose-900/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-rose-300">
                      {file.category}
                    </span>
                    <Icon className="w-4 h-4 text-rose-400" />
                  </div>
                  <h5 className="text-xs font-black text-white leading-tight mb-1">
                    {file.title}
                  </h5>

                  {isFlipped ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] text-slate-300 font-sans leading-relaxed mt-2"
                    >
                      {file.finding}
                    </motion.p>
                  ) : (
                    <p className="text-[11px] text-rose-200/70 mt-1">{file.preview}</p>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-rose-800/40 flex items-center justify-between text-[10px] font-bold">
                  {isFlipped ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{file.verdict}</span>
                    </span>
                  ) : (
                    <span className="text-rose-300/80">Click to Open File</span>
                  )}
                  <span className="text-slate-400">{isFlipped ? "Close" : "Inspect"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Verdict Decision */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Publish Your Editorial Fact-Check Verdict
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
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Publish Editorial Verdict</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
