import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Heart, Award, ArrowRight, Gamepad2, Lightbulb } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <header className="bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />
          <div className="flex items-center gap-3">
            <Link
              href="/child/dashboard"
              className="px-5 py-2.5 rounded-2xl bg-clicky-orange text-white font-black text-xs shadow-fun-orange"
            >
              Play Games
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-4">
          <Mascot size="lg" mood="cheer" />
          <h1 className="text-3xl sm:text-5xl font-black text-clicky-navy tracking-tight">
            About Clicky
          </h1>
          <p className="text-base sm:text-lg text-clicky-muted font-semibold max-w-2xl mx-auto leading-relaxed">
            We believe that online safety shouldn&apos;t feel like a scary lecture. It should feel like an empowering, fun adventure where kids discover their digital superpowers.
          </p>
        </div>

        {/* Mission Card */}
        <div className="p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-4">
          <span className="px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark text-xs font-black uppercase tracking-wider">
            Our Mission
          </span>
          <h2 className="text-2xl font-black text-clicky-navy">
            Building the Next Generation of Confident Digital Citizens
          </h2>
          <p className="text-sm text-clicky-muted font-medium leading-relaxed">
            Today&apos;s children navigate online games, AI chatbots, group chats, and viral social media earlier than any generation before them. Traditional safety pamphlets and warnings often fail because they don&apos;t match the interactive realities kids face every day.
          </p>
          <p className="text-sm text-clicky-muted font-medium leading-relaxed">
            Clicky bridges the gap through interactive simulations, playful game mechanics, constructive feedback, and KindBot—our child-safe AI companion. We teach children how to recognize red flags, reject manipulation, and ask trusted adults for help when they need it most.
          </p>
        </div>

        {/* 4 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-clicky-pale text-clicky-navy flex items-center justify-center font-bold shadow-xs">
              <Gamepad2 className="w-5 h-5 text-clicky-navy" />
            </div>
            <h3 className="font-black text-clicky-navy text-lg">Fun Over Fear</h3>
            <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
              We never use scare tactics. We build resilience, detective intuition, and healthy curiosity.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-clicky-yellow-pale text-clicky-orange flex items-center justify-center font-bold shadow-xs">
              <Lightbulb className="w-5 h-5 text-clicky-orange" />
            </div>
            <h3 className="font-black text-clicky-navy text-lg">Constructive Feedback</h3>
            <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
              Mistakes are valuable learning opportunities. We explain the why behind every choice without shame.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-black text-clicky-navy text-lg">Safe by Design</h3>
            <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
              Zero public stranger chat rooms. Zero advertising. Zero behavioral profiling of children.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold shadow-xs">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="font-black text-clicky-navy text-lg">Family Partnership</h3>
            <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
              We link children and parents logically so families can build trust and open communication lines.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link
            href="/child/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-clicky-orange text-white font-black text-sm shadow-fun-orange"
          >
            <span>Jump Into Clicky Adventures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
