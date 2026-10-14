"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
  ExternalLink,
  Lock,
  Flag,
  Sparkles,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface ClueInspectorGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const ClueInspectorGame: React.FC<ClueInspectorGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  // Extract or synthesize inspectable elements from scenario
  const message = scenario.characterMessage || scenario.prompt;
  const redFlags = scenario.redFlags || [
    "Urgent countdown pressure",
    "Suspicious unofficial link address",
    "Asking for private passwords/credentials",
  ];

  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [activeClueDetail, setActiveClueDetail] = useState<string | null>(null);

  // Parse simulated elements to click on
  const inspectables = [
    {
      id: "sender",
      label: "Sender ID",
      value: scenario.characterName || "Admin_Bonus_99",
      isRedFlag: true,
      hint: "Notice the name mimics an administrator, but real game staff never demand private credentials in DMs.",
      icon: ShieldAlert,
    },
    {
      id: "urgency",
      label: "Time Limit Alert",
      value: "Rushed Countdown / Urgent Action Required",
      isRedFlag: true,
      hint: "Scammers create false panic so you act quickly before thinking critically or asking an adult.",
      icon: AlertTriangle,
    },
    {
      id: "link",
      label: "Hyperlink / Web URL",
      value: "http://free-gems-claim-now.xyz/login",
      isRedFlag: true,
      hint: "Unverified domain (.xyz) designed to steal passwords. Never click unverified login links.",
      icon: ExternalLink,
    },
    {
      id: "credential",
      label: "Password Request",
      value: "'Enter your game password to claim'",
      isRedFlag: true,
      hint: "Absolute rule: Never share your account password with anyone online, ever.",
      icon: Lock,
    },
  ];

  const handleInspect = (id: string, hint: string) => {
    playSound("clue");
    if (!inspectedIds.includes(id)) {
      setInspectedIds([...inspectedIds, id]);
    }
    setActiveClueDetail(hint);
  };

  const allCluesInspected = inspectedIds.length >= 2;

  return (
    <div className="space-y-4">
      {/* Detective HUD Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-inner">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Interactive Clue Scanner
            </span>
            <p className="text-xs text-slate-300 font-medium">
              Tap the highlighted elements in the message to analyze suspicious red flags!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300">
          <Flag className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {inspectedIds.length} of {inspectables.length} Clues Inspected
          </span>
        </div>
      </div>

      {/* Simulated Message Inspector Viewport */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border-2 border-slate-800 text-white shadow-xl relative overflow-hidden">
        {/* Mock App Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse" />
            <span>INCOMING SUSPICIOUS TRANSMISSION</span>
          </span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">
            SECURITY SANDBOX
          </span>
        </div>

        {/* Message Card */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{scenario.characterName || "Unknown Contact"}</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono border border-red-500/30">
                  Unverified
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Direct Message</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
            {message}
          </p>
        </div>

        {/* Tap-To-Inspect Interactive Elements Grid */}
        <div className="mt-4 space-y-2">
          <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Detective Targets (Click each to examine evidence):</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {inspectables.map((item) => {
              const isInspected = inspectedIds.includes(item.id);
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInspect(item.id, item.hint)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                    isInspected
                      ? "bg-amber-950/40 border-amber-500/60 text-amber-200 ring-1 ring-amber-500/40"
                      : "bg-slate-900 border-slate-800 hover:border-amber-400/60 text-slate-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isInspected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{item.label}</span>
                      {isInspected && (
                        <span className="text-[10px] font-black text-amber-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>ANALYZED</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.value}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Clue Analysis Drawer */}
        <AnimatePresence>
          {activeClueDetail && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-amber-300 block mb-0.5">
                  Detective Analysis:
                </strong>
                <span>{activeClueDetail}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decision Selection Options */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
            Issue Your Detective Verdict
          </h3>
          {!allCluesInspected && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Tip: Inspect at least 2 clues above</span>
            </span>
          )}
        </div>

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
              className="w-full py-3.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover disabled:opacity-50 text-white font-black text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm Detective Verdict</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
