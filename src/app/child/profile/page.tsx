"use client";

import React, { useState, useEffect } from "react";
import { User, ShieldCheck, Star, Flame, CheckCircle, Save } from "lucide-react";
import { Mascot } from "@/components/common/Mascot";

export default function ChildProfilePage() {
  const [name, setName] = useState("Alex Miller");
  const [avatar, setAvatar] = useState("robot-shield");
  const [isSaved, setIsSaved] = useState(false);

  const avatars = [
    { id: "robot-shield", label: "Robot Shield", emoji: "🤖" },
    { id: "detective-panda", label: "Detective Panda", emoji: "🐼" },
    { id: "cyber-fox", label: "Cyber Fox", emoji: "🦊" },
    { id: "pixel-owl", label: "Pixel Owl", emoji: "🦉" },
    { id: "speed-tiger", label: "Speed Tiger", emoji: "🐯" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-black uppercase tracking-wider border border-clicky-sky/40">
          Player Profile
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
          Hero Settings
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          Customize your character, nickname, and view linked parent info
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-6">
        {/* Top Hero Showcase */}
        <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
          <Mascot size="lg" mood="cheer" />
          <div>
            <h2 className="text-xl font-black text-clicky-navy">{name}</h2>
            <p className="text-xs font-bold text-clicky-orange">
              Level 2: Safety Scout • 480 XP
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Linked to Sarah Miller (Parent)</span>
            </div>
          </div>
        </div>

        {isSaved && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Profile customizations saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {avatars.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setAvatar(av.id)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                    avatar === av.id
                      ? "bg-clicky-yellow-pale border-clicky-navy ring-2 ring-clicky-yellow scale-105"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-bold text-clicky-navy truncate w-full text-center">
                    {av.label.split(" ")[0]}
                  </span>
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
            className="w-full py-3.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </form>
      </div>
    </div>
  );
}
