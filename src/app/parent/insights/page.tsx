"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lightbulb, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { ParentOverviewData } from "@/types";

export default function ParentInsightsPage() {
  const [data, setData] = useState<ParentOverviewData | null>(null);

  useEffect(() => {
    fetch("/api/parent/overview")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setData(d.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Digital Safety Insights
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
          Strengths & Growth Areas
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Personalized behavioral analysis based on real choices made in safety scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Strengths */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base">Key Strengths</h3>
              <p className="text-xs text-gray-400 font-medium">Areas where Alex consistently excels</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs font-medium space-y-1">
              <div className="flex items-center justify-between font-black text-emerald-900">
                <span>Privacy & Personal Data Protection</span>
                <span>90% Score</span>
              </div>
              <p className="text-emerald-950 text-xs">
                Alex consistently refuses to share physical location, school jerseys in photos, and rejects overreaching mobile app permissions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs font-medium space-y-1">
              <div className="flex items-center justify-between font-black text-emerald-900">
                <span>Scam & Phishing Spotting</span>
                <span>85% Score</span>
              </div>
              <p className="text-emerald-950 text-xs">
                Alex detects fake urgency timers, suspicious .xyz links, and requests for passwords in chat messages.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs font-medium space-y-1">
              <div className="flex items-center justify-between font-black text-emerald-900">
                <span>Kindness & Community Empathy</span>
                <span>80% Score</span>
              </div>
              <p className="text-emerald-950 text-xs">
                Alex regularly welcomes beginners and supports classmates experiencing group chat exclusion.
              </p>
            </div>
          </div>
        </div>

        {/* Growth & Practice Opportunities */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base">Practice Opportunities</h3>
              <p className="text-xs text-gray-400 font-medium">Topics where reinforcement helps</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs font-medium space-y-1">
              <div className="flex items-center justify-between font-black text-amber-900">
                <span>AI Voice Cloning Scams</span>
                <span>55% Score</span>
              </div>
              <p className="text-amber-950 text-xs">
                Alex hesitated when presented with an urgent call from an unfamiliar number imitating a relative. Practicing family safe words will build instant confidence.
              </p>
              <div className="pt-2">
                <Link
                  href="/child/games/voiceguard-rescue"
                  className="text-xs font-bold text-clicky-orange hover:underline inline-flex items-center gap-1"
                >
                  <span>Practice VoiceGuard Rescue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs font-medium space-y-1">
              <div className="flex items-center justify-between font-black text-amber-900">
                <span>In-Game Downloads & Mods</span>
                <span>60% Score</span>
              </div>
              <p className="text-amber-950 text-xs">
                Alex encountered a challenge involving double file extensions (.zip.exe). Reinforce that game mods should only come from official platforms with parent approval.
              </p>
              <div className="pt-2">
                <Link
                  href="/child/games/gamer-safety-quest"
                  className="text-xs font-bold text-clicky-orange hover:underline inline-flex items-center gap-1"
                >
                  <span>Practice Gamer Safety Quest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
