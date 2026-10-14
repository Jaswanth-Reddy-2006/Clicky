import React from "react";
import Link from "next/link";
import { Compass, Sparkles, CheckCircle2, Shield, Bot, ArrowRight, Star } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Interactive Game Worlds",
      desc: "Children enter 8 distinct cartoon game realms, from detective crime-solving to futuristic AI laboratories. Each world simulates authentic digital interactions such as direct messages, voice calls, viral videos, and multiplayer lobbies.",
      icon: "🎮",
    },
    {
      num: "02",
      title: "Clue Inspection & Red Flags",
      desc: "Before making a decision, kids can tap to inspect detective clues. They examine URL spellings, artificial urgency tactics, requests for passwords, and unusual background details.",
      icon: "🔍",
    },
    {
      num: "03",
      title: "Immediate Golden Rules",
      desc: "Every choice produces instant educational feedback. If an answer is unsafe, the game explains why without punishment and reinforces a memorable Golden Safety Rule.",
      icon: "💡",
    },
    {
      num: "04",
      title: "XP, Badges & Level Ups",
      desc: "Safe decisions earn XP and unlock badges like 'Scam Spotter' and 'Vault Guardian'. Children progress from Curious Explorer to Clicky Champion as their skills grow.",
      icon: "🏆",
    },
    {
      num: "05",
      title: "KindBot Safety Companion",
      desc: "Children can consult KindBot anytime. KindBot is a supportive AI companion that helps think through concerns, offers suggested next steps, and directs kids to trusted adults.",
      icon: "🤖",
    },
    {
      num: "06",
      title: "Parent Guardian Linkage",
      desc: "Parents use a single-use pairing code to connect their dashboard. Parents see topic mastery, estimated practice time, and constructive conversation prompts.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <header className="bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />
          <Link
            href="/child/games"
            className="px-5 py-2.5 rounded-2xl bg-clicky-navy text-white font-black text-xs hover:bg-clicky-navy-dark"
          >
            Explore the Games
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark font-black text-xs uppercase tracking-wider">
            Architecture of Learning
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-clicky-navy tracking-tight">
            How Clicky Works
          </h1>
          <p className="text-sm sm:text-base text-clicky-muted font-semibold max-w-xl mx-auto">
            A complete gamified curriculum designed to make cyber safety intuitive, engaging, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-clicky-pale text-2xl flex items-center justify-center shrink-0 border border-clicky-sky/30 shadow-xs">
                {step.icon}
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-black text-clicky-orange uppercase tracking-wider block">
                  Step {step.num}
                </span>
                <h3 className="text-lg font-black text-clicky-navy mt-0.5 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-r from-clicky-navy to-clicky-navy-dark text-white text-center space-y-4">
          <h2 className="text-2xl font-black text-white">
            Ready to Try a Scenario Yourself?
          </h2>
          <p className="text-xs sm:text-sm text-clicky-sky-light max-w-md mx-auto font-medium">
            Jump directly into Scam Detective or Cyberbullying Heroes and experience the interactive choices firsthand.
          </p>
          <div className="pt-2">
            <Link
              href="/child/games/scam-detective"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-clicky-orange text-white font-black text-sm shadow-fun-orange active:translate-y-1"
            >
              <span>Launch Scam Detective</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
