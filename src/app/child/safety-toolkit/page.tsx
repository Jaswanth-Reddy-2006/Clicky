"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Sparkles,
  Key,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  Copy,
} from "lucide-react";

export default function SafetyToolkitPage() {
  const [safeWord, setSafeWord] = useState("Blue Kangaroo");
  const [copied, setCopied] = useState(false);

  const wordAdjectives = ["Blue", "Golden", "Silent", "Cosmic", "Speedy", "Secret", "Emerald", "Dancing"];
  const wordNouns = ["Kangaroo", "Falcon", "Otter", "Pineapple", "Spaceship", "Dolphin", "Comet", "Shield"];

  const generateNewSafeWord = () => {
    const adj = wordAdjectives[Math.floor(Math.random() * wordAdjectives.length)];
    const noun = wordNouns[Math.floor(Math.random() * wordNouns.length)];
    setSafeWord(`${adj} ${noun}`);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(safeWord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-black uppercase tracking-wider border border-clicky-sky/40">
          Emergency & Defense Arsenal
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
          Child Safety Toolkit
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Quick rules, scam cheat-sheets, and family protection tools
        </p>
      </div>

      {/* Interactive Family Safe Word Generator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-clicky-yellow-pale to-white border-2 border-clicky-yellow shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-clicky-yellow text-clicky-navy-dark flex items-center justify-center font-bold">
            <Key className="w-5 h-5 text-clicky-navy-dark" />
          </div>
          <div>
            <h2 className="text-lg font-black text-clicky-navy">
              Family Safe Word Generator
            </h2>
            <p className="text-xs text-clicky-muted font-medium">
              Protect against AI voice-clone phone scams! Agree on a secret phrase only your family knows.
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-clicky-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-clicky-muted tracking-wider block">
              Suggested Secret Phrase:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-clicky-navy tracking-tight mt-0.5">
              &ldquo;{safeWord}&rdquo;
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={generateNewSafeWord}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-clicky-pale hover:bg-clicky-sky-light text-clicky-navy font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Word</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Word"}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 font-semibold leading-relaxed">
          <strong>How to use it:</strong> If someone calls sounding like mom, dad, or grandma asking for urgent gift cards or money, ask them: &ldquo;What is our secret safe word?&rdquo; If they don&apos;t know it, hang up immediately!
        </p>
      </div>

      {/* The 4 Red Flags Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
          <div className="flex items-center gap-2 text-clicky-navy">
            <AlertTriangle className="w-5 h-5 text-clicky-orange" />
            <h3 className="font-black text-base">Top 4 Scam Red Flags</h3>
          </div>
          <ul className="space-y-2 text-xs font-semibold text-clicky-text">
            <li className="flex items-start gap-2 bg-clicky-bg p-2.5 rounded-xl">
              <span className="text-red-500 font-black">1.</span>
              <span><strong>False Urgency:</strong> &ldquo;Claim in 5 minutes or lose forever!&rdquo;</span>
            </li>
            <li className="flex items-start gap-2 bg-clicky-bg p-2.5 rounded-xl">
              <span className="text-red-500 font-black">2.</span>
              <span><strong>Asking for Codes:</strong> Demanding 6-digit SMS verification numbers.</span>
            </li>
            <li className="flex items-start gap-2 bg-clicky-bg p-2.5 rounded-xl">
              <span className="text-red-500 font-black">3.</span>
              <span><strong>Moving Off-App:</strong> &ldquo;Let&apos;s talk privately on Snapchat or Telegram.&rdquo;</span>
            </li>
            <li className="flex items-start gap-2 bg-clicky-bg p-2.5 rounded-xl">
              <span className="text-red-500 font-black">4.</span>
              <span><strong>Executable Downloads:</strong> Asking you to run .exe mod files or turn off antivirus.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
          <div className="flex items-center gap-2 text-clicky-navy">
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-base">Helplines & Support Numbers</h3>
          </div>
          <p className="text-xs text-clicky-muted font-medium">
            Keep these numbers saved in your phone or written on your study desk:
          </p>
          <div className="space-y-2 text-xs font-bold">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
              <span>Childhelp National Helpline:</span>
              <span className="font-black">1-800-422-4453</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-center justify-between">
              <span>Crisis Text Line:</span>
              <span className="font-black">Text HOME to 741741</span>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 flex items-center justify-between">
              <span>Emergency Physical Threat:</span>
              <span className="font-black">Call 911 (or local emergency)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
