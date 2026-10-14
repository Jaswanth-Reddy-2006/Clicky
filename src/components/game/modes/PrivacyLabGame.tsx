"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  MapPin,
  Camera,
  Mic,
  Users,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface PrivacyLabGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const PrivacyLabGame: React.FC<PrivacyLabGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  // Configurable app permissions for the scenario
  const [permissions, setPermissions] = useState([
    {
      id: "loc",
      name: "Precise GPS Location",
      desc: "Shares your exact home and street coordinates with remote servers.",
      icon: MapPin,
      enabled: true, // starts dangerously enabled
      isEssential: false,
      riskLevel: "HIGH",
    },
    {
      id: "cam",
      name: "Camera Access",
      desc: "Allows app to stream video and capture photos at any time.",
      icon: Camera,
      enabled: true,
      isEssential: false,
      riskLevel: "HIGH",
    },
    {
      id: "contacts",
      name: "Personal Contacts Book",
      desc: "Uploads phone numbers and names of your family and classmates.",
      icon: Users,
      enabled: true,
      isEssential: false,
      riskLevel: "CRITICAL",
    },
    {
      id: "mic",
      name: "Microphone Access",
      desc: "Record ambient audio while app runs in the background.",
      icon: Mic,
      enabled: false,
      isEssential: false,
      riskLevel: "HIGH",
    },
    {
      id: "notif",
      name: "Game Level Notifications",
      desc: "Sends reminders when energy refills (low risk, standard utility).",
      icon: Bell,
      enabled: true,
      isEssential: true,
      riskLevel: "LOW",
    },
  ]);

  const handleToggle = (id: string) => {
    playSound("click");
    setPermissions(
      permissions.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  // Safe score: +25% for every unnecessary high-risk permission disabled
  const riskyDisabled = permissions.filter((p) => !p.isEssential && !p.enabled).length;
  const safetyPercent = Math.min(100, Math.round((riskyDisabled / 4) * 100));

  return (
    <div className="space-y-4">
      {/* Smartphone Security Vault Terminal */}
      <div className="bg-slate-950 text-white p-5 rounded-3xl border-2 border-emerald-800 shadow-xl space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                Data Vault & Permissions Console
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Inspect and Lockdown Excessive App Permissions
              </h4>
            </div>
          </div>

          {/* Safety Gauge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-bold">Privacy Shield:</span>
            <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all duration-300 ${
                  safetyPercent >= 75
                    ? "bg-emerald-400"
                    : safetyPercent >= 50
                    ? "bg-amber-400"
                    : "bg-red-400"
                }`}
                style={{ width: `${safetyPercent}%` }}
              />
            </div>
            <span
              className={`text-xs font-mono font-black ${
                safetyPercent >= 75 ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {safetyPercent}%
            </span>
          </div>
        </div>

        {/* Target App Info */}
        <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg border border-emerald-500/40 shadow-2xs">
            <Lock className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black text-white">
                {scenario.characterName || "New App / Profile Installation"}
              </h5>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                Permission Audit
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{scenario.prompt}</p>
          </div>
        </div>

        {/* Permissions Switchboard */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-emerald-400 tracking-wider">
            <span>Toggle Permissions (Turn off risky data access):</span>
            <span className="text-[10px] text-slate-400 font-normal">
              Click switch to toggle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {permissions.map((perm) => {
              const Icon = perm.icon;
              return (
                <div
                  key={perm.id}
                  onClick={() => handleToggle(perm.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    perm.enabled
                      ? perm.isEssential
                        ? "bg-slate-900 border-slate-700 text-slate-300"
                        : "bg-red-950/40 border-red-800/80 text-red-200"
                      : "bg-emerald-950/50 border-emerald-700/80 text-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        perm.enabled
                          ? perm.isEssential
                            ? "bg-slate-800 text-slate-300"
                            : "bg-red-500 text-white"
                          : "bg-emerald-500 text-slate-950"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate">{perm.name}</span>
                        {!perm.enabled && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-mono font-bold">
                            PROTECTED
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{perm.desc}</p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                      perm.enabled ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        perm.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safety Decision Selection */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Apply Your Safe Privacy Decision
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
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Lock Down Privacy Settings</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
