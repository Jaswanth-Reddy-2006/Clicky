"use client";

import React, { useState, useEffect } from "react";
import { User, ShieldCheck, Star, Flame, CheckCircle, Save, Sparkles, Palette, Crown } from "lucide-react";
import { Mascot } from "@/components/common/Mascot";
import { playSound } from "@/lib/utils";

export default function ChildProfilePage() {
  const [name, setName] = useState("Alex Miller");
  const [accessory, setAccessory] = useState<"none" | "detective-cap" | "superhero-cape" | "cyber-goggles" | "space-helmet">("detective-cap");
  const [colorTheme, setColorTheme] = useState<"classic-blue" | "mint-green" | "sunny-yellow" | "sunset-orange">("classic-blue");
  const [previewMood, setPreviewMood] = useState<"happy" | "detective" | "warning" | "thinking" | "cheer">("cheer");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedAccessory = localStorage.getItem("clicky_mascot_accessory");
    const savedTheme = localStorage.getItem("clicky_mascot_theme");
    const savedName = localStorage.getItem("clicky_child_name");

    if (savedAccessory) setAccessory(savedAccessory as any);
    if (savedTheme) setColorTheme(savedTheme as any);
    if (savedName) setName(savedName);
  }, []);

  const accessories = [
    { id: "none", label: "Classic Shield", icon: "🛡️" },
    { id: "detective-cap", label: "Detective Cap", icon: "🕵️" },
    { id: "superhero-cape", label: "Hero Cape", icon: "🦸" },
    { id: "cyber-goggles", label: "Cyber Visor", icon: "🥽" },
    { id: "space-helmet", label: "Cosmic Dome", icon: "🚀" },
  ];

  const colorThemes = [
    { id: "classic-blue", label: "Royal Blue", bg: "bg-[#344D78]", border: "border-[#344D78]" },
    { id: "mint-green", label: "Mint Shield", bg: "bg-[#25634D]", border: "border-[#25634D]" },
    { id: "sunny-yellow", label: "Solar Gold", bg: "bg-[#9A7312]", border: "border-[#9A7312]" },
    { id: "sunset-orange", label: "Sunset Blaze", bg: "bg-[#9C4215]", border: "border-[#9C4215]" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playSound("celebrate");
    localStorage.setItem("clicky_mascot_accessory", accessory);
    localStorage.setItem("clicky_mascot_theme", colorTheme);
    localStorage.setItem("clicky_child_name", name);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
          Hero Customization Studio
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
          Customize Your Clicky Mascot
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Equip legendary gear, customize your armor paint, and save your hero identity
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-6">
        {/* Interactive Live Mascot Showcase Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          <div className="p-4 rounded-3xl bg-white/10 border border-white/20 shrink-0 shadow-md">
            <Mascot
              size="xl"
              mood={previewMood}
              accessory={accessory}
              colorTheme={colorTheme}
            />
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-clicky-yellow text-xs font-black border border-white/20">
              <Crown className="w-3.5 h-3.5 text-clicky-yellow" />
              <span>LEVEL 2 SAFETY SCOUT</span>
            </div>
            <h2 className="text-2xl font-black text-white">{name}</h2>
            <p className="text-xs text-clicky-sky-light font-medium">
              Equipped: <strong className="text-white capitalize">{accessory.replace("-", " ")}</strong> • Theme: <strong className="text-white capitalize">{colorTheme.replace("-", " ")}</strong>
            </p>

            {/* Test Mood Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] font-bold">
              <span className="text-gray-300 mr-1 text-[10px] uppercase">Reaction:</span>
              {(["happy", "detective", "thinking", "warning", "cheer"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setPreviewMood(m);
                  }}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    previewMood === m
                      ? "bg-clicky-yellow text-clicky-navy-dark font-black"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Mascot outfit and hero profile saved! Clicky will now wear this outfit across all adventures.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Gear / Accessory Picker */}
          <div>
            <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-clicky-orange" />
              <span>Select Mascot Headgear & Gear</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {accessories.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setAccessory(acc.id as any);
                  }}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                    accessory === acc.id
                      ? "bg-clicky-yellow-pale border-clicky-navy ring-2 ring-clicky-yellow scale-105 shadow-xs"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{acc.icon}</span>
                  <span className="text-xs font-black text-clicky-navy text-center">
                    {acc.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme Picker */}
          <div>
            <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-clicky-navy" />
              <span>Armor Paint Theme</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colorThemes.map((thm) => (
                <button
                  key={thm.id}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setColorTheme(thm.id as any);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all ${
                    colorTheme === thm.id
                      ? "bg-clicky-pale border-clicky-navy ring-2 ring-clicky-navy shadow-xs font-black"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 font-bold"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full ${thm.bg} shrink-0 shadow-2xs`} />
                  <span className="text-xs text-clicky-navy">{thm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
              Hero Nickname
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Mascot & Outfit</span>
          </button>
        </form>
      </div>
    </div>
  );
}
