"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, RefreshCw, UserCheck, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { SoundToggle } from "./SoundToggle";

export const DemoBanner: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
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
    if (!confirm("Reset all demo progress, scores, and parent analytics to initial state?")) return;
    setIsResetting(true);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMessage("Demo data reset to initial seed state!");
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
    <div className="bg-clicky-navy-dark text-white text-xs border-b border-clicky-navy px-3 py-1.5 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Demo badge & status */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-clicky-yellow/20 text-clicky-yellow font-bold text-[11px] border border-clicky-yellow/40">
            <Sparkles className="w-3 h-3 text-clicky-yellow" />
            JUDGES DEMO BAR
          </span>

          {currentUser ? (
            <span className="hidden sm:inline text-clicky-sky text-xs">
              Active: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
            </span>
          ) : (
            <span className="hidden sm:inline text-gray-300 text-xs">
              Guest preview mode
            </span>
          )}

          {message && (
            <span className="bg-clicky-mint text-clicky-navy-dark px-2 py-0.5 rounded font-bold animate-bounce">
              {message}
            </span>
          )}
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSwitchDemo("CHILD")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              currentUser?.role === "CHILD"
                ? "bg-clicky-yellow text-clicky-navy-dark shadow-sm"
                : "bg-clicky-navy hover:bg-clicky-navy-light text-white"
            }`}
            title="Switch to Alex Miller (Child Account: 480 XP, Level 2)"
          >
            <UserCheck className="w-3 h-3" />
            <span>Child Demo (Alex)</span>
          </button>

          <button
            onClick={() => handleSwitchDemo("PARENT")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              currentUser?.role === "PARENT"
                ? "bg-clicky-yellow text-clicky-navy-dark shadow-sm"
                : "bg-clicky-navy hover:bg-clicky-navy-light text-white"
            }`}
            title="Switch to Sarah Miller (Parent Account with Analytics)"
          >
            <Shield className="w-3 h-3" />
            <span>Parent Demo (Sarah)</span>
          </button>

          <button
            onClick={handleResetData}
            disabled={isResetting}
            className="px-2 py-1 rounded-lg bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-700/50 flex items-center gap-1 transition-colors"
            title="Reset demo progress & achievements"
          >
            <RefreshCw className={`w-3 h-3 ${isResetting ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          <SoundToggle className="!p-1 !rounded-lg !border-clicky-navy-light !bg-clicky-navy text-clicky-sky" />
        </div>
      </div>
    </div>
  );
};
