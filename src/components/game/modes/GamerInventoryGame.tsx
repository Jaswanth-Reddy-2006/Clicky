"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Sword,
  Shield,
  Coins,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Scenario, ScenarioOption } from "@/types";
import { playSound } from "@/lib/utils";

interface GamerInventoryGameProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  onSelectOption: (option: ScenarioOption) => void;
  onConfirm: () => void;
}

export const GamerInventoryGame: React.FC<GamerInventoryGameProps> = ({
  scenario,
  selectedOptionId,
  hasSubmitted,
  onSelectOption,
  onConfirm,
}) => {
  const [inspectedItem, setInspectedItem] = useState<string | null>("i1");

  const tradeItems = [
    {
      id: "i1",
      name: "Legendary Shadow Blade",
      rarity: "Mythic",
      icon: Sword,
      suspicious: true,
      tag: "FLAGGED LINK",
      detail:
        "Tooltip warning: Description says 'Redeem code at claim-skins-free.biz/trade'. This is an off-platform phishing link designed to hijack your game credentials!",
    },
    {
      id: "i2",
      name: "Unlimited Gem Generator Key",
      rarity: "Illegal Hack",
      icon: Coins,
      suspicious: true,
      tag: "MALWARE RISK",
      detail:
        "Trojan Warning: Requires downloading an 'auto-clicker.exe' script. Downloading cheat software almost always infects your computer with info-stealing malware.",
    },
    {
      id: "i3",
      name: "Guardian Armor Plate",
      rarity: "Rare In-Game",
      icon: Shield,
      suspicious: false,
      tag: "OFFICIAL ITEM",
      detail:
        "Standard in-game equipment traded inside the secure game marketplace without external links or downloads.",
    },
  ];

  const handleInspectItem = (id: string) => {
    playSound("clue");
    setInspectedItem(id);
  };

  const activeItemData = tradeItems.find((i) => i.id === inspectedItem);

  return (
    <div className="space-y-4">
      {/* RPG Trade Chamber Viewport */}
      <div className="bg-slate-950 text-white p-5 rounded-3xl border-2 border-purple-800 shadow-xl space-y-4">
        {/* Marketplace Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                Pixel Arcade • Secure Trade Window
              </span>
              <h4 className="text-xs font-bold text-slate-200">
                Inspect Trader Items Before Approving
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700 text-xs font-bold text-purple-300">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Escrow Sandbox</span>
          </div>
        </div>

        {/* Trade Partner Box */}
        <div className="bg-purple-950/40 p-3.5 rounded-2xl border border-purple-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-lg border border-purple-500/40 shadow-2xs">
              <Gamepad2 className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">
                  {scenario.characterName || "TradePartner_X"}
                </span>
                <span className="text-[9px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono border border-red-500/30">
                  Suspicious Trade
                </span>
              </div>
              <p className="text-[11px] text-purple-200 mt-0.5">{scenario.prompt}</p>
            </div>
          </div>
          <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
        </div>

        {/* Offered Items Shelf */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Click Items to Inspect Metadata & Hidden Scams:</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {tradeItems.map((item) => {
              const isSelected = inspectedItem === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInspectItem(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-purple-900/60 border-purple-400 text-white ring-2 ring-purple-500/40 shadow-md"
                      : "bg-slate-900 border-slate-800 hover:border-purple-600/60 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-800 text-purple-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        item.suspicious
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <h6 className="text-xs font-bold truncate">{item.name}</h6>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.rarity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Inspection Inspector Drawer */}
        <AnimatePresence>
          {activeItemData && (
            <motion.div
              key={activeItemData.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                activeItemData.suspicious
                  ? "bg-red-950/40 border-red-500/60 text-red-200"
                  : "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between font-extrabold uppercase text-[10px]">
                <span>Inspection Dossier: {activeItemData.name}</span>
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{activeItemData.tag}</span>
                </span>
              </div>
              <p className="font-medium">{activeItemData.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decision Selection Options */}
      <div className="bg-white p-5 rounded-3xl border-2 border-clicky-border shadow-card space-y-3">
        <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
          Safeguard Your Gaming Account
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
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-sm shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm Trade Decision</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
