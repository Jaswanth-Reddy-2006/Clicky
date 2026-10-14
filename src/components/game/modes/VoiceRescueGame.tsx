"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Play,
  Square,
  Key,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Activity,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface VoiceRescueGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const VoiceRescueGame: React.FC<VoiceRescueGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scanRevealed, setScanRevealed] = useState(false);
  const [safeWordTested, setSafeWordTested] = useState(false);

  const togglePlayback = () => {
    playSound("click");
    setIsPlaying(!isPlaying);
  };

  const handleRunScan = () => {
    playSound("click");
    setScanRevealed(true);
  };

  const handleTestSafeWord = () => {
    playSound("click");
    setSafeWordTested(true);
  };

  return (
    <div className="space-y-4">
      {/* Audio Forensics Receiver Terminal */}
      <div className="bg-slate-950 text-white p-5 rounded-3xl border-2 border-blue-800 shadow-xl space-y-4">
        {/* Terminal Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                Telecom Dispatch & Audio Forensics
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Voice-Clone Analysis & Safe-Word Challenge
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-700 text-xs font-bold text-blue-300">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Audio Stream Online</span>
          </div>
        </div>

        {/* Incoming Urgent Call Box */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/30">
                <PhoneCall className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{scenario.characterName || "Panicked Relative / Stranger"}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                    Urgent Audio Note
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">Duration: 0:14 • Caller ID Unknown</span>
              </div>
            </div>

            {/* Play Audio Button */}
            <button
              type="button"
              onClick={togglePlayback}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlaying
                  ? "bg-red-500 text-white shadow-md animate-pulse"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Stop Audio" : "Play Sample"}</span>
            </button>
          </div>

          {/* Animated Waveform Display */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-center gap-1 h-14 overflow-hidden">
            {[40, 75, 30, 90, 60, 45, 80, 20, 95, 70, 50, 85, 30, 65, 90, 40, 60, 80, 25, 70, 45, 85].map(
              (height, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isPlaying
                      ? "bg-gradient-to-t from-blue-500 to-cyan-300 animate-pulse"
                      : "bg-slate-700"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (idx % 2 === 0 ? 1 : 0.7))) }%` : "20%",
                  }}
                />
              )
            )}
          </div>

          {/* Audio Transcript */}
          <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800 leading-relaxed font-sans italic">
            &ldquo;{scenario.characterMessage || scenario.prompt}&rdquo;
          </p>
        </div>

        {/* Forensics Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Tool 1: Spectral Glitch Scan */}
          <button
            type="button"
            onClick={handleRunScan}
            className={`p-3 rounded-2xl border text-left transition-all ${
              scanRevealed
                ? "bg-amber-950/40 border-amber-500/80 text-amber-200"
                : "bg-slate-900 border-slate-800 hover:border-blue-500/60 text-slate-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>1. Run Acoustic Glitch Scan</span>
              </span>
              <span className="text-[10px] text-blue-300 font-mono">
                {scanRevealed ? "ANALYZED" : "RUN"}
              </span>
            </div>
            {scanRevealed ? (
              <p className="text-[11px] text-amber-300 font-medium">
                🚩 Synthesizer Artifacts Detected! Unnatural speech cadence and synthetic background noise match AI voice-cloning software.
              </p>
            ) : (
              <p className="text-[11px] text-slate-400">
                Click to scan for AI pitch stutter and synthetic audio cloning artifacts.
              </p>
            )}
          </button>

          {/* Tool 2: Secret Safe-Word Challenge */}
          <button
            type="button"
            onClick={handleTestSafeWord}
            className={`p-3 rounded-2xl border text-left transition-all ${
              safeWordTested
                ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-200"
                : "bg-slate-900 border-slate-800 hover:border-blue-500/60 text-slate-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>2. Ask Family Secret Safe-Word</span>
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">
                {safeWordTested ? "FAILED" : "CHALLENGE"}
              </span>
            </div>
            {safeWordTested ? (
              <p className="text-[11px] text-emerald-300 font-medium">
                🛡️ Caller hesitated and could NOT provide the family secret code! Proof of digital impersonation.
              </p>
            ) : (
              <p className="text-[11px] text-slate-400">
                Ask the caller for your pre-agreed family safe word before taking any action.
              </p>
            )}
          </button>
        </div>
      </div>

      {/* Decision Selection Options */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Execute VoiceGuard Rescue Protocol
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
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm Rescue Action</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
