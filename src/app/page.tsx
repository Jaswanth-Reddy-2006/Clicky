"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sparkles,
  Gamepad2,
  Bot,
  Award,
  Users,
  Compass,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  ChevronRight,
  Lock,
  Eye,
  Heart,
  Search,
  Radio,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Flame,
  CheckCircle2,
  PhoneCall,
  ShieldAlert,
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";
import { InteractiveHeroChallenge } from "@/components/landing/InteractiveHeroChallenge";
import { GAMES_DATA } from "@/lib/data/games-data";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What age group is Clicky designed for?",
      a: "Clicky is designed specifically for children ages 7 to 13. The reading level, cartoon themes, and interactive choices are tailored to young digital explorers, with age bands for Early Explorers (6-8), Digital Navigators (9-11), and Cyber Heroes (12-14).",
    },
    {
      q: "Does Clicky require an external AI API key to work?",
      a: "No! Clicky features a full built-in, child-safe scenario engine that provides immediate educational feedback, structured intent recognition, and KindBot responses without requiring any paid API keys. An optional external AI provider can be connected server-side if desired.",
    },
    {
      q: "How does the parent dashboard connect to the child's account?",
      a: "Parents generate a secure 6-character, one-time pairing code with a 15-minute countdown from the Parent Dashboard. When the child enters this code, their profiles link instantly so parents can track learning milestones, safety quotient, and discussion recommendations.",
    },
    {
      q: "Is any real personal child data collected or shared?",
      a: "Never! Clicky adheres strictly to privacy-by-design and COPPA principles. We do not require children to provide real names, birthdates, phone numbers, or addresses. All game chats and social interactions are safe, pre-scripted educational simulations.",
    },
    {
      q: "Can children talk to strangers inside Clicky?",
      a: "No! There are zero open public multiplayer chat rooms with strangers. All social situations and group chats are safe, pre-scripted educational simulations where children practice handling real-world scenarios without real-world risks.",
    },
    {
      q: "What happens if a child makes a mistake during a game?",
      a: "Incorrect answers never shame children! Clicky uses constructive, encouraging feedback that explains the 'why' behind the danger, awards partial XP for learning, and invites the child to try again to build muscle memory.",
    },
  ];

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans selection:bg-clicky-yellow selection:text-clicky-navy-dark">
      <DemoBanner />

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-clicky-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 font-extrabold text-sm text-clicky-navy">
            <Link href="#games" className="hover:text-clicky-orange transition-colors">
              Games
            </Link>
            <Link href="#how-it-works" className="hover:text-clicky-orange transition-colors">
              How It Works
            </Link>
            <Link href="#kindbot" className="hover:text-clicky-orange transition-colors">
              KindBot
            </Link>
            <Link href="#for-parents" className="hover:text-clicky-orange transition-colors">
              For Parents
            </Link>
            <Link href="#safety" className="hover:text-clicky-orange transition-colors">
              Safety
            </Link>
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-2xl text-clicky-navy font-black text-sm hover:bg-clicky-pale transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/child/dashboard"
              className="px-6 py-2.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm transition-all shadow-fun-orange active:translate-y-1 flex items-center gap-2"
            >
              <span>Start Adventure</span>
              <Sparkles className="w-4 h-4 text-clicky-yellow" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-clicky-navy hover:bg-clicky-pale transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-clicky-border px-4 py-6 space-y-4 shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col space-y-3 font-extrabold text-base text-clicky-navy">
                <Link
                  href="#games"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-clicky-orange"
                >
                  8 Safety Games
                </Link>
                <Link
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-clicky-orange"
                >
                  How It Works
                </Link>
                <Link
                  href="#kindbot"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-clicky-orange"
                >
                  KindBot AI Companion
                </Link>
                <Link
                  href="#for-parents"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-clicky-orange"
                >
                  For Parents
                </Link>
                <Link
                  href="#safety"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-clicky-orange"
                >
                  Safety & COPPA
                </Link>
              </nav>

              <div className="pt-4 border-t border-clicky-border flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-2xl bg-clicky-pale text-clicky-navy font-black text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/child/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-2xl bg-clicky-orange text-white font-black text-sm shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Start Adventure</span>
                  <Sparkles className="w-4 h-4 text-clicky-yellow" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1: HERO & INTERACTIVE CHALLENGE */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white">
        {/* Floating Cartoon Background Elements */}
        <div className="absolute top-12 left-10 text-clicky-sky/30 text-5xl select-none animate-float pointer-events-none">
          ☁️
        </div>
        <div className="absolute top-20 right-16 text-clicky-yellow/40 text-4xl select-none animate-pulse-subtle pointer-events-none">
          ⭐
        </div>
        <div className="absolute bottom-16 left-1/3 text-clicky-mint/30 text-3xl select-none animate-float pointer-events-none">
          ✨
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-clicky-yellow text-xs sm:text-sm font-black border border-white/20 shadow-sm backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-clicky-yellow" />
                <span>AI-Powered Child Online Safety Learning Platform</span>
              </div>

              {/* Exact Master Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Big Adventures. <br />
                <span className="text-clicky-yellow">Smarter Kids.</span> <br />
                Safer Online.
              </h1>

              {/* Exact Master Supporting Text */}
              <p className="text-base sm:text-lg text-clicky-sky-light font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Turn online safety into an adventure. Solve mysteries, spot digital tricks, and become a hero of the online world.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/child/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-base transition-all shadow-fun-orange active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Start Your Adventure</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="#games"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base border-2 border-white/30 transition-all flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="w-5 h-5 text-clicky-yellow" />
                  <span>Explore the Games</span>
                </Link>
              </div>

              {/* Floating Live Preview Micro-Cards */}
              <div className="pt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-2xl font-black text-clicky-yellow">8</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Safety Worlds</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-2xl font-black text-clicky-mint">48+</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Interactive Missions</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-2xl font-black text-clicky-orange">100%</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Kid-Safe & COPPA</div>
                </div>
              </div>
            </div>

            {/* Right Column: Playable Live Interactive Hero Challenge */}
            <div className="lg:col-span-5">
              <InteractiveHeroChallenge />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ADVENTURE WORLDS FEATURING ALL EIGHT GAMES */}
      <section id="games" className="py-16 sm:py-24 bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full bg-clicky-yellow-pale text-clicky-navy-dark font-black text-xs uppercase tracking-wider border border-clicky-yellow/60">
              The Clicky Safety Realm
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-clicky-navy mt-3 mb-3">
              Eight Epic Worlds. Eight Essential Skills.
            </h2>
            <p className="text-clicky-muted text-base sm:text-lg font-semibold leading-relaxed">
              Every world tackles a critical modern digital hazard through hands-on roleplay, authentic clues, and zero boring lectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES_DATA.map((game, idx) => {
              const icons = ["🕵️", "🛡️", "📰", "🔐", "🤖", "📻", "👑", "🕹️"];
              return (
                <div
                  key={game.slug}
                  className="bg-clicky-bg/60 rounded-3xl p-6 border-2 border-clicky-border/80 hover:border-clicky-navy shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl p-3 rounded-2xl bg-white border border-clicky-border shadow-xs">
                        {icons[idx]}
                      </span>
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark border border-clicky-yellow/40">
                        {game.totalScenarios} Scenarios
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider text-clicky-orange block mb-1">
                      {game.topic}
                    </span>
                    <h3 className="font-black text-xl text-clicky-navy group-hover:text-clicky-orange transition-colors leading-snug">
                      {game.title}
                    </h3>
                    <p className="text-xs font-bold text-clicky-muted mt-0.5 mb-2">
                      {game.subtitle}
                    </p>
                    <p className="text-xs text-clicky-text font-medium leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-clicky-border/60 flex items-center justify-between">
                    <div className="text-[11px] font-bold text-clicky-navy">
                      <span className="text-clicky-muted">Reward: </span>
                      <strong className="text-clicky-navy">{game.badgeName}</strong>
                    </div>

                    <Link
                      href={`/child/games/${game.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs transition-colors shadow-2xs"
                    >
                      <span>Play</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW CLICKY WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-clicky-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
              The Learning Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              How Clicky Builds Digital Resilience
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              Three simple steps that turn passive screen time into lifelong safety habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-clicky-border shadow-card relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-clicky-pale text-clicky-navy font-black text-2xl flex items-center justify-center mb-6 border border-clicky-sky/40 shadow-xs">
                  1
                </div>
                <h3 className="text-xl font-black text-clicky-navy mb-2">
                  Roleplay Realistic Scenarios
                </h3>
                <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
                  Children encounter authentic fictional game chats, viral videos, prize messages, and caller voices designed to test critical thinking in a safe sandbox.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-clicky-orange">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero real-world risk</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-clicky-border shadow-card relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-clicky-yellow-pale text-amber-800 font-black text-2xl flex items-center justify-center mb-6 border border-clicky-yellow/60 shadow-xs">
                  2
                </div>
                <h3 className="text-xl font-black text-clicky-navy mb-2">
                  Immediate Positive Feedback
                </h3>
                <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
                  Every decision reveals why an action is safe or dangerous. Mistakes earn encouraging tips and partial XP, transforming slip-ups into memorable learning moments.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>No shame, only growth</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-clicky-border shadow-card relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-2xl flex items-center justify-center mb-6 border border-emerald-200 shadow-xs">
                  3
                </div>
                <h3 className="text-xl font-black text-clicky-navy mb-2">
                  Sync & Celebrate with Parents
                </h3>
                <p className="text-xs sm:text-sm text-clicky-muted font-medium leading-relaxed">
                  Parents see strengths and practice recommendations on their private dashboard, giving families natural discussion topics for dinner or car rides.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-clicky-navy">
                <CheckCircle2 className="w-4 h-4" />
                <span>Meaningful family dialogue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KINDBOT INTRODUCTION WITH CHAT PREVIEW */}
      <section id="kindbot" className="py-16 sm:py-24 bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Description & Safety Pledge */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark font-black text-xs uppercase tracking-wider border border-clicky-yellow/50">
                AI Companion Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-clicky-navy leading-tight">
                Meet KindBot: Your Kid’s Safe Digital Buddy
              </h2>
              <p className="text-sm sm:text-base text-clicky-muted font-semibold leading-relaxed">
                When something online feels weird or uncomfortable, kids don&apos;t always know how to ask. KindBot gives calm, age-appropriate guidance and always directs children to trusted adults.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-clicky-pale text-clicky-navy shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-clicky-navy">100% Child-Safe Engine</h4>
                    <p className="text-xs text-clicky-muted font-medium">
                      Built-in safety intent engine recognizes scams, cyberbullying, photo pressure, and emergencies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-clicky-pale text-clicky-navy shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-clicky-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-clicky-navy">Zero Private Secret Storage</h4>
                    <p className="text-xs text-clicky-muted font-medium">
                      Never asks for passwords, real names, or addresses. Conversations remain completely private.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-clicky-pale text-clicky-navy shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-clicky-navy" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-clicky-navy">Always Empowers Humans</h4>
                    <p className="text-xs text-clicky-muted font-medium">
                      Encourages children that telling a parent or teacher is an act of bravery, not trouble.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/child/kindbot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm shadow-fun active:translate-y-1 transition-all"
                >
                  <Bot className="w-4 h-4 text-clicky-yellow" />
                  <span>Try KindBot in Child Portal</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Chat Simulation Preview Card */}
            <div className="lg:col-span-6">
              <div className="bg-clicky-bg rounded-3xl p-6 border-2 border-clicky-border shadow-card-hover space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-clicky-border">
                  <div className="flex items-center gap-2.5">
                    <Mascot size="sm" mood="happy" animate={false} />
                    <div>
                      <h4 className="font-black text-clicky-navy text-sm">KindBot</h4>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online & Safe
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-clicky-muted bg-white px-2.5 py-1 rounded-full border border-clicky-border">
                    Interactive Preview
                  </span>
                </div>

                {/* Sample Exchange */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 flex-row-reverse text-right">
                    <div className="w-7 h-7 rounded-full bg-clicky-navy text-white flex items-center justify-center text-xs font-black shrink-0">
                      👧
                    </div>
                    <div className="bg-clicky-navy text-white p-3 rounded-2xl rounded-tr-none text-xs font-semibold max-w-[80%]">
                      &ldquo;Someone in my game chat asked where I live and offered free skins. What should I do?&rdquo;
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="shrink-0 mt-0.5">
                      <Mascot size="sm" mood="detective" animate={false} />
                    </div>
                    <div className="bg-white border border-clicky-border text-clicky-navy p-3.5 rounded-2xl rounded-tl-none text-xs font-medium space-y-2 max-w-[85%] shadow-2xs">
                      <p className="font-bold text-clicky-navy">
                        Never give your address or city to anyone online!
                      </p>
                      <p className="text-clicky-muted">
                        Trading personal details for game skins is a common scam trick. Block the player right away and let a parent know.
                      </p>
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] font-black text-clicky-orange">
                        <span>Recommended Practice:</span>
                        <Link href="/child/games/gamer-safety-quest" className="underline hover:text-clicky-navy">
                          Gamer Safety Quest →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CHILD DASHBOARD & REWARDS PREVIEW */}
      <section className="py-16 sm:py-24 bg-clicky-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark font-black text-xs uppercase tracking-wider border border-clicky-yellow/50">
              Gamified Motivation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              XP, Badges, Streaks & Customization
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              Children earn real achievements as they master new safety concepts, keeping them excited to return every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-clicky-yellow-pale text-3xl flex items-center justify-center mx-auto mb-3 border border-clicky-yellow/60">
                ⭐
              </div>
              <h4 className="font-black text-clicky-navy text-lg mb-1">XP & Level Ranks</h4>
              <p className="text-xs text-clicky-muted font-medium">
                From Safety Scout to Cyber Guardian, level up through 48+ interactive missions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-3xl flex items-center justify-center mx-auto mb-3 border border-orange-200">
                🔥
              </div>
              <h4 className="font-black text-clicky-navy text-lg mb-1">Daily Safety Streaks</h4>
              <p className="text-xs text-clicky-muted font-medium">
                Reinforce daily habits with streak counters and daily mystery bonus challenges.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-clicky-pale text-3xl flex items-center justify-center mx-auto mb-3 border border-clicky-sky/40">
                🏆
              </div>
              <h4 className="font-black text-clicky-navy text-lg mb-1">13 Collectible Badges</h4>
              <p className="text-xs text-clicky-muted font-medium">
                Earn badges for phishing detection, empathy, fact-checking, and privacy mastery.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-3xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                🎩
              </div>
              <h4 className="font-black text-clicky-navy text-lg mb-1">Mascot Customization</h4>
              <p className="text-xs text-clicky-muted font-medium">
                Equip detective hats, cyber goggles, and custom armor colors in the Player Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PARENT DASHBOARD PREVIEW */}
      <section id="for-parents" className="py-16 sm:py-24 bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Parent Portal Features */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
                For Parents & Guardians
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-clicky-navy leading-tight">
                Clear Insights Without Being a Spy
              </h2>
              <p className="text-sm sm:text-base text-clicky-muted font-semibold leading-relaxed">
                Clicky isn&apos;t invasive monitoring software. It is an educational partnership that shows your child&apos;s real strengths and points out healthy topics to talk about together.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-clicky-bg border border-clicky-border">
                  <h4 className="font-black text-clicky-navy text-sm">Real-Time Progress Tracking</h4>
                  <p className="text-xs text-clicky-muted font-medium mt-0.5">
                    See accuracy percentages across scams, cyberbullying, voice cloning, and AI literacy.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-clicky-bg border border-clicky-border">
                  <h4 className="font-black text-clicky-navy text-sm">Supportive Recommendations</h4>
                  <p className="text-xs text-clicky-muted font-medium mt-0.5">
                    Constructive practice prompts (e.g. &ldquo;Practice family safe-words with Alex in VoiceGuard Rescue&rdquo;).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-clicky-bg border border-clicky-border">
                  <h4 className="font-black text-clicky-navy text-sm">1-Click Pairing Workflow</h4>
                  <p className="text-xs text-clicky-muted font-medium mt-0.5">
                    Generate secure 6-character pairing codes to link accounts in seconds.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/parent/dashboard"
                  className="px-6 py-3 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm shadow-fun-orange active:translate-y-1 transition-all"
                >
                  Explore Parent Dashboard
                </Link>
                <Link
                  href="/pair-child"
                  className="px-5 py-3 rounded-2xl bg-clicky-pale hover:bg-clicky-sky/30 text-clicky-navy font-black text-sm border border-clicky-sky/40 transition-colors"
                >
                  Pair a Child Profile
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Dashboard Snippet */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl bg-clicky-bg border-2 border-clicky-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-400">Child Monitored</span>
                    <h4 className="text-base font-black text-gray-900">Alex Miller (Age 10)</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    84% Safety Quotient
                  </span>
                </div>

                {/* Mini Metric Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Privacy & Data Protection</span>
                      <span className="text-emerald-700 font-black">90% Guardian</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Scam Awareness & Phishing</span>
                      <span className="text-emerald-700 font-black">85% Skilled</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-clicky-yellow rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Voice Cloning & Impersonation</span>
                      <span className="text-amber-700 font-black">55% Practice Opportunity</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-clicky-orange rounded-full w-[55%]" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-xs text-gray-700 font-medium">
                  <strong>💡 Practice Suggestion:</strong> Try VoiceGuard Rescue scenario 2 together to practice choosing a secret family verification word!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRIVACY & SAFETY PRINCIPLES */}
      <section id="safety" className="py-16 sm:py-24 bg-clicky-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
              Privacy by Design
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              Our Uncompromising Child Protection Pledge
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              We build tools to protect children online, which means holding ourselves to the highest ethical and legal standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-clicky-navy text-white flex items-center justify-center text-xl mb-4">
                  🔒
                </div>
                <h4 className="text-lg font-black text-clicky-navy mb-2">COPPA & Privacy First</h4>
                <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                  We never require children to provide real names, birthdays, home addresses, or phone numbers. Avatars and nicknames only.
                </p>
              </div>
              <span className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-emerald-600">
                ✓ Fully compliant
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-clicky-navy text-white flex items-center justify-center text-xl mb-4">
                  🚫
                </div>
                <h4 className="text-lg font-black text-clicky-navy mb-2">No Open Stranger Chats</h4>
                <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                  There are zero live public multiplayer chatrooms. All social situations are pre-scripted educational simulations.
                </p>
              </div>
              <span className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-emerald-600">
                ✓ 100% walled garden
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-clicky-navy text-white flex items-center justify-center text-xl mb-4">
                  🛡️
                </div>
                <h4 className="text-lg font-black text-clicky-navy mb-2">Zero Third-Party Advertising</h4>
                <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                  No ad networks, no tracking cookies, and no behavioral targeting. Educational content is always completely ad-free.
                </p>
              </div>
              <span className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-emerald-600">
                ✓ No marketing trackers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 bg-white border-b border-clicky-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy-dark font-black text-xs uppercase tracking-wider border border-clicky-yellow/50">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              Everything you need to know about Clicky, KindBot, and our family security approach.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-clicky-border bg-clicky-bg/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left font-black text-sm sm:text-base text-clicky-navy flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-lg bg-white border border-clicky-border text-clicky-navy">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 sm:px-5 pb-5 text-xs sm:text-sm font-medium text-clicky-muted leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-block mx-auto">
            <Mascot size="lg" mood="cheer" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to Become a Clicky Cyber Hero?
          </h2>

          <p className="text-sm sm:text-lg text-clicky-sky-light font-medium max-w-xl mx-auto leading-relaxed">
            Join thousands of kids practicing digital superpowers, spotting scam traps, and learning to navigate the online world with courage and kindness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-base shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Create Free Account</span>
              <Sparkles className="w-5 h-5 text-clicky-yellow" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base border-2 border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In with Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: COMPREHENSIVE FOOTER */}
      <footer className="bg-clicky-navy-dark text-white py-12 border-t border-clicky-navy text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <AppLogo size="sm" href="/" />
            <p className="text-gray-400 leading-relaxed">
              Clicky is an AI-powered gamified digital safety learning platform for children ages 7-13.
            </p>
            <div className="text-[11px] text-clicky-yellow font-bold">
              Built with Next.js, TypeScript & Tailwind CSS.
            </div>
          </div>

          <div>
            <h5 className="font-black text-white uppercase tracking-wider mb-3 text-xs">
              8 Safety Realms
            </h5>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li><Link href="/child/games/scam-detective" className="hover:text-white">Scam Detective</Link></li>
              <li><Link href="/child/games/cyberbullying-heroes" className="hover:text-white">Cyberbullying Heroes</Link></li>
              <li><Link href="/child/games/fake-or-fact" className="hover:text-white">Fake or Fact</Link></li>
              <li><Link href="/child/games/privacy-protector" className="hover:text-white">Privacy Protector</Link></li>
              <li><Link href="/child/games/safe-ai-explorer" className="hover:text-white">Safe AI Explorer</Link></li>
              <li><Link href="/child/games/voiceguard-rescue" className="hover:text-white">VoiceGuard Rescue</Link></li>
              <li><Link href="/child/games/kindness-kingdom" className="hover:text-white">Kindness Kingdom</Link></li>
              <li><Link href="/child/games/gamer-safety-quest" className="hover:text-white">Gamer Safety Quest</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-white uppercase tracking-wider mb-3 text-xs">
              Product Portals
            </h5>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li><Link href="/child/dashboard" className="hover:text-white">Child Adventure Hub</Link></li>
              <li><Link href="/child/kindbot" className="hover:text-white">KindBot Safety AI</Link></li>
              <li><Link href="/child/adventures" className="hover:text-white">World Quest Map</Link></li>
              <li><Link href="/child/safety-toolkit" className="hover:text-white">Safety Toolkit</Link></li>
              <li><Link href="/parent/dashboard" className="hover:text-white">Parent Guardian Portal</Link></li>
              <li><Link href="/parent/progress" className="hover:text-white">Topic Analytics</Link></li>
              <li><Link href="/pair-child" className="hover:text-white">Pair Child Device</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-white uppercase tracking-wider mb-3 text-xs">
              Child Protection & Helplines
            </h5>
            <div className="space-y-2 text-gray-400 leading-relaxed">
              <p>• Emergency: <strong>911</strong></p>
              <p>• Childhelp Hotline: <strong>1-800-422-4453</strong></p>
              <p>• Crisis Text Line: Text <strong>HOME to 741741</strong></p>
              <p className="text-[11px] text-gray-400 pt-2 border-t border-clicky-navy">
                COPPA compliant. No cookies for behavioral ad tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-clicky-navy flex flex-col sm:flex-row items-center justify-between text-gray-400 gap-4">
          <p>© 2026 Clicky. All rights reserved. Built for hackathon demonstration.</p>
          <div className="flex items-center gap-4 font-bold">
            <Link href="/safety" className="hover:text-white">Safety Principles</Link>
            <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
