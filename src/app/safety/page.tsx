import React from "react";
import Link from "next/link";
import { Shield, Lock, EyeOff, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <header className="bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />
          <Link
            href="/child/dashboard"
            className="px-5 py-2.5 rounded-2xl bg-clicky-orange text-white font-black text-xs shadow-fun-orange"
          >
            Enter Platform
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-clicky-navy tracking-tight">
            Safety & Privacy Standards
          </h1>
          <p className="text-sm sm:text-base text-clicky-muted font-semibold max-w-xl mx-auto">
            Our commitment to child protection, data minimization, and safe AI engineering.
          </p>
        </div>

        {/* 4 Pillars of Clicky Safety */}
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
            <div className="flex items-center gap-2.5 text-clicky-navy">
              <Lock className="w-6 h-6 text-clicky-orange" />
              <h2 className="text-xl font-black">1. Zero Real-Data Collection</h2>
            </div>
            <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
              We never require children to provide real legal names, home street addresses, schools, birth dates, or phone numbers. Children use fun pseudonyms (such as &apos;PixelPanda&apos; or &apos;Alex&apos;). We believe the safest child data is data that is never collected in the first place.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
            <div className="flex items-center gap-2.5 text-clicky-navy">
              <EyeOff className="w-6 h-6 text-clicky-yellow" />
              <h2 className="text-xl font-black">2. No Open Stranger Chats</h2>
            </div>
            <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
              Clicky does not contain unmoderated multiplayer chat lobbies with real-world strangers. All group conversations and direct messages inside games are strictly scripted educational simulations designed to train decision-making safely.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
            <div className="flex items-center gap-2.5 text-clicky-navy">
              <Shield className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-black">3. Safe AI Companion Guardrails</h2>
            </div>
            <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
              KindBot is engineered with strict ethical safety guardrails:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-clicky-text font-medium list-disc list-inside">
              <li>It will never encourage secrecy from parents or trusted adults.</li>
              <li>It will never agree to meet a child in person or ask for physical location.</li>
              <li>It will never diagnose medical or mental health conditions.</li>
              <li>It will immediately prioritize contacting a trusted adult or emergency services if severe danger is detected.</li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-3">
            <div className="flex items-center gap-2.5 text-clicky-navy">
              <CheckCircle2 className="w-6 h-6 text-clicky-mint-dark" />
              <h2 className="text-xl font-black">4. Parent-First Transparency</h2>
            </div>
            <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
              Parents have complete visibility into their child&apos;s learning topics, progress percentages, and achievements. Rather than spying on private thoughts, Clicky provides educational insights and conversation starters for parents to talk with their children offline.
            </p>
          </div>
        </div>

        {/* Emergency Resources Box */}
        <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-black">Real-World Child Help Resources</h3>
          </div>
          <p className="text-xs font-semibold leading-relaxed">
            If you or a child you know is in immediate real-world danger, please do not rely solely on any online educational game. Contact your local emergency services (911 in the USA/Canada, 999 in the UK, 112 in the EU) or reach out to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold pt-1">
            <div className="p-3 bg-white rounded-xl border border-amber-200">
              <span className="block text-amber-800">Childhelp National Helpline:</span>
              <span className="text-clicky-navy text-sm font-black">1-800-422-4453</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200">
              <span className="block text-amber-800">Crisis Text Line:</span>
              <span className="text-clicky-navy text-sm font-black">Text HOME to 741741</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
