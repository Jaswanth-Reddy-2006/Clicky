"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sparkles,
  RefreshCw,
  UserCheck,
  Shield,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  Gamepad2,
  Users,
} from "lucide-react";
import { SoundToggle } from "./SoundToggle";
import { playSound } from "@/lib/utils";

export const DemoBanner: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSession();
  }, [pathname]);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setCurrentUser({ name: data.user.name, role: data.user.role });
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
  };

  const handleSwitchDemo = async (role: "PARENT" | "CHILD") => {
    playSound("click");
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
        playSound("chime");
        setMessage(`Switched to ${role === "CHILD" ? "Alex (Child)" : "Sarah (Parent)"}!`);
        setTimeout(() => setMessage(null), 3000);
        router.push(data.redirectTo);
        router.refresh();
      }
    } catch (err) {
      console.error("Demo switch error:", err);
    }
  };

  const handleResetData = async () => {
    playSound("click");
    if (!confirm("Reset all demo progress, scores, and parent analytics to initial state?")) return;
    setIsResetting(true);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        playSound("badgeUnlocked");
        setMessage("Demo data reset to initial state!");
        setTimeout(() => setMessage(null), 3000);
        router.refresh();
      }
    } catch (err) {
      console.error("Reset error:", err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-clicky-navy-dark/95 backdrop-blur-md text-white border-b border-clicky-navy/80 px-3 sm:px-4 py-1.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Demo badge & active account */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clicky-yellow/20 text-clicky-yellow font-black text-[11px] border border-clicky-yellow/40 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-clicky-yellow shrink-0" />
            <span className="tracking-wide">JUDGES DEMO</span>
          </div>

          {currentUser ? (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-clicky-sky truncate font-medium">
              <span className="text-gray-400">Active:</span>
              <span className="font-extrabold text-white truncate">{currentUser.name}</span>
              <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-clicky-yellow uppercase font-black">
                {currentUser.role}
              </span>
            </div>
          ) : (
            <span className="hidden sm:inline text-xs text-gray-400">
              Preview Mode
            </span>
          )}

          {message && (
            <span className="hidden md:inline-flex items-center gap-1 bg-clicky-mint text-clicky-navy-dark px-2 py-0.5 rounded font-black text-xs animate-bounce shadow-xs">
              <Check className="w-3 h-3" />
              <span>{message}</span>
            </span>
          )}
        </div>

        {/* Right: Explicit Demo Switches, Reset, and Sound Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Child Switch */}
          <button
            onClick={() => handleSwitchDemo("CHILD")}
            className={`px-2.5 py-1 sm:py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-xs ${
              currentUser?.role === "CHILD"
                ? "bg-clicky-yellow text-clicky-navy-dark ring-2 ring-clicky-yellow/40"
                : "bg-clicky-navy hover:bg-clicky-navy-light text-white border border-white/10"
            }`}
            title="Switch to Alex Miller (Child Account with 8 Games, Quests & Friends)"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Child</span>
            <span className="hidden md:inline">Demo (Alex)</span>
          </button>

          {/* Parent Switch */}
          <button
            onClick={() => handleSwitchDemo("PARENT")}
            className={`px-2.5 py-1 sm:py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-xs ${
              currentUser?.role === "PARENT"
                ? "bg-clicky-yellow text-clicky-navy-dark ring-2 ring-clicky-yellow/40"
                : "bg-clicky-navy hover:bg-clicky-navy-light text-white border border-white/10"
            }`}
            title="Switch to Sarah Miller (Parent Account with Analytics & Insights)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Parent</span>
            <span className="hidden md:inline">Demo (Sarah)</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={handleResetData}
            disabled={isResetting}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/60 flex items-center gap-1 text-xs font-bold transition-colors shadow-xs"
            title="Reset demo progress, scores & achievements to seed state"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Sound Toggle */}
          <SoundToggle className="!p-1 sm:!p-1.5 !rounded-xl !border-clicky-navy-light/60 !bg-clicky-navy hover:!bg-clicky-navy-light text-clicky-sky" />
        </div>
      </div>
    </header>
  );
};

export default DemoBanner;
