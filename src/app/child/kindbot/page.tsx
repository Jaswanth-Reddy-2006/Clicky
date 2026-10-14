import React from "react";
import { KindBotChat } from "@/components/kindbot/KindBotChat";
import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

export default function KindBotPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider border border-clicky-yellow/50">
              AI Learning Companion
            </span>
            <span className="text-xs font-bold text-clicky-mint-dark bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ● Kid-Safe Guardrails Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
            Talk with KindBot
          </h1>
          <p className="text-xs sm:text-sm text-clicky-muted font-bold">
            Ask any question about online games, weird messages, or how to stay safe on the internet
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-clicky-navy bg-white p-3 rounded-2xl border border-clicky-border shadow-xs">
          <HeartHandshake className="w-4 h-4 text-clicky-orange" />
          <span>Non-judgmental, calm support 24/7</span>
        </div>
      </div>

      {/* Main Interactive Chat Area */}
      <KindBotChat />
    </div>
  );
}
