"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";
import { InteractiveHeroChallenge } from "@/components/landing/InteractiveHeroChallenge";
import { GAMES_DATA } from "@/lib/data/games-data";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What age group is Clicky designed for?",
      a: "Clicky is designed specifically for children ages 7 to 13. The reading level, cartoon themes, and scenarios are tailored to young digital explorers, with age bands for early explorers through cyber champions.",
    },
    {
      q: "Does Clicky require an external AI API key to work?",
      a: "No! Clicky features a full built-in, child-safe scenario engine that provides immediate educational feedback, structured intent recognition, and KindBot responses without requiring any paid API keys. An optional external AI provider can be connected server-side if desired.",
    },
    {
      q: "How does the parent dashboard connect to the child's account?",
      a: "Parents can generate a secure, one-time pairing code from the Parent Dashboard. When the child profile enters this code, the accounts link instantly so parents can see learning progress, topic scores, and practice recommendations.",
    },
    {
      q: "Is any real personal child data collected or shared?",
      a: "Never! Clicky adheres strictly to privacy-by-design and COPPA principles. We do not require children to provide real names, birthdates, phone numbers, or addresses. All game chats and interactions are fictional simulations.",
    },
    {
      q: "Can children talk to strangers inside Clicky?",
      a: "No! There are zero open public multiplayer chat rooms with strangers. All social situations and group chats are safe, pre-scripted educational simulations where children practice handling real-world scenarios without real-world risks.",
    },
  ];

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans selection:bg-clicky-yellow selection:text-clicky-navy-dark">
      <DemoBanner />

      {/* Main Navigation */}
      <header className="sticky top-8 z-40 bg-white/90 backdrop-blur-md border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 font-bold text-sm text-clicky-navy">
            <Link href="/" className="hover:text-clicky-orange transition-colors">
              Home
            </Link>
            <Link href="#games" className="hover:text-clicky-orange transition-colors">
              Adventures
            </Link>
            <Link href="#how-it-works" className="hover:text-clicky-orange transition-colors">
              How It Works
            </Link>
            <Link href="#for-parents" className="hover:text-clicky-orange transition-colors">
              For Parents
            </Link>
            <Link href="/safety" className="hover:text-clicky-orange transition-colors">
              Safety
            </Link>
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
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
            className="md:hidden p-2 rounded-xl text-clicky-navy hover:bg-clicky-pale"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-clicky-border px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3 font-extrabold text-base text-clicky-navy">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-clicky-orange"
              >
                Home
              </Link>
              <Link
                href="#games"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-clicky-orange"
              >
                Adventures & Games
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-clicky-orange"
              >
                How It Works
              </Link>
              <Link
                href="#for-parents"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-clicky-orange"
              >
                For Parents
              </Link>
              <Link
                href="/safety"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-clicky-orange"
              >
                Safety & Privacy
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
                className="w-full text-center py-3 rounded-2xl bg-clicky-orange text-white font-black text-sm shadow-md"
              >
                Start Adventure
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white">
        {/* Floating Cartoon Clouds and Stars */}
        <div className="absolute top-10 left-10 text-clicky-sky/30 text-4xl select-none animate-float">
          ☁️
        </div>
        <div className="absolute top-24 right-16 text-clicky-yellow/40 text-3xl select-none animate-pulse-subtle">
          ⭐
        </div>
        <div className="absolute bottom-12 left-1/4 text-clicky-mint/30 text-2xl select-none animate-float">
          ✨
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-clicky-yellow text-xs sm:text-sm font-black border border-white/20 shadow-sm backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-clicky-yellow" />
                <span>AI-Powered Child Online Safety Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Big Adventures. <br />
                <span className="text-clicky-yellow">Smarter Kids.</span> <br />
                Safer Online.
              </h1>

              <p className="text-base sm:text-lg text-clicky-sky-light font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Turn online safety into an adventure. Learn to spot scams, stand up to cyberbullying, protect your privacy, and explore the digital world with confidence.
              </p>

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
                  <span>Explore 8 Games</span>
                </Link>
              </div>

              {/* Demo Metric Badges (Clearly Identified as Demo Showcase) */}
              <div className="pt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-clicky-yellow">8</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Interactive Worlds</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-clicky-mint">48+</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Safety Scenarios</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-clicky-orange">100%</div>
                  <div className="text-[11px] font-bold text-clicky-sky-light">Kid-Safe Design</div>
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

      {/* Trust-Building Value Props */}
      <section className="py-12 bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-3xl bg-clicky-pale border border-clicky-sky/40 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-navy text-clicky-yellow flex items-center justify-center mb-3 shadow-xs">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-clicky-navy text-base mb-1">Play to Learn</h3>
              <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
                Forget boring textbook lectures. Kids learn by making real decisions in vibrant game worlds.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-clicky-yellow-pale border border-clicky-yellow/60 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-yellow text-clicky-navy-dark flex items-center justify-center mb-3 shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-black text-clicky-navy text-base mb-1">KindBot Companion</h3>
              <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
                A supportive AI buddy that helps children think critically without storing private secrets.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-mint text-clicky-navy-dark flex items-center justify-center mb-3 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-black text-clicky-navy text-base mb-1">Linked Parent Portal</h3>
              <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
                Real-time visibility into your child’s safety skills, strengths, and recommended topics to practice.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-orange-50 border border-orange-200 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-orange text-white flex items-center justify-center mb-3 shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-black text-clicky-navy text-base mb-1">Privacy First</h3>
              <p className="text-xs text-clicky-muted font-semibold leading-relaxed">
                Zero open stranger chats. Zero collection of personal child messages or sensitive location data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Playable Safety Games Showcase */}
      <section id="games" className="py-16 sm:py-20 bg-clicky-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
              The Clicky Arcade
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              Explore the Eight Safety Games
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              Every game features authentic scenarios, red-flag clues, constructive feedback, XP rewards, and collectible badges!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES_DATA.map((game, idx) => (
              <div
                key={game.slug}
                className="bg-white rounded-3xl p-5 border border-clicky-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-3 rounded-2xl bg-clicky-pale border border-clicky-sky/30 shadow-xs">
                      {idx === 0
                        ? "🕵️"
                        : idx === 1
                        ? "🛡️"
                        : idx === 2
                        ? "📰"
                        : idx === 3
                        ? "🔐"
                        : idx === 4
                        ? "🤖"
                        : idx === 5
                        ? "🎙️"
                        : idx === 6
                        ? "👑"
                        : "🎮"}
                    </span>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-gray-100 text-clicky-muted">
                      {game.totalScenarios} Scenarios
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                    {game.topic}
                  </span>
                  <h3 className="text-lg font-black text-clicky-navy mt-0.5 leading-snug group-hover:text-clicky-orange transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-clicky-muted font-medium mt-1.5 leading-relaxed line-clamp-3">
                    {game.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-clicky-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-clicky-navy flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-clicky-yellow fill-clicky-yellow" />
                    <span>Badge: {game.badgeName.split(" ")[0]}</span>
                  </span>

                  <Link
                    href={`/child/games/${game.slug}`}
                    className="px-3.5 py-1.5 rounded-xl bg-clicky-navy hover:bg-clicky-orange text-white text-xs font-black transition-colors flex items-center gap-1"
                  >
                    <span>Play</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Clicky Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-y border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-clicky-yellow/30 text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-yellow/50">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              How Cyber Safety Becomes Second Nature
            </h2>
            <p className="text-clicky-muted text-sm sm:text-base font-semibold">
              A four-step cycle that turns digital dilemmas into confidence and lifelong habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-clicky-bg border border-clicky-border text-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-navy text-clicky-yellow font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                1
              </div>
              <h3 className="font-black text-clicky-navy text-lg mb-2">Engage in Quests</h3>
              <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                Children face simulated online encounters: suspicious game links, mean messages, and fake news posts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-clicky-bg border border-clicky-border text-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-yellow text-clicky-navy-dark font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                2
              </div>
              <h3 className="font-black text-clicky-navy text-lg mb-2">Analyze Clues</h3>
              <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                Kids tap detective clues to spot urgency tactics, mismatched URLs, and overreaching app permissions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-clicky-bg border border-clicky-border text-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-orange text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                3
              </div>
              <h3 className="font-black text-clicky-navy text-lg mb-2">Earn XP & Badges</h3>
              <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                Safe decisions reward children with XP, level advancements, and collectible shield badges for their profile.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-clicky-bg border border-clicky-border text-center">
              <div className="w-12 h-12 rounded-2xl bg-clicky-mint text-clicky-navy-dark font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                4
              </div>
              <h3 className="font-black text-clicky-navy text-lg mb-2">Parent Insights</h3>
              <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                Parents view mastery charts and receive actionable discussion prompts to practice together offline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet KindBot Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-clicky-yellow/20 text-clicky-yellow font-black text-xs uppercase tracking-wider border border-clicky-yellow/40">
                <Bot className="w-4 h-4" />
                <span>MEET KINDBOT</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                The Friendly AI Safety Companion for Curious Kids
              </h2>

              <p className="text-clicky-sky-light text-sm sm:text-base font-medium leading-relaxed">
                Whenever children feel unsure about a message, a game problem, or a suspicious request, KindBot offers calm, non-judgmental guidance and suggests safe next steps.
              </p>

              <div className="space-y-3 pt-2 text-left">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <CheckCircle className="w-5 h-5 text-clicky-mint shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-clicky-pale font-medium">
                    <strong className="text-white">Empathetic & Non-Blaming:</strong> Normalizes that mistakes happen and guides the child to constructive solutions.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <CheckCircle className="w-5 h-5 text-clicky-mint shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-clicky-pale font-medium">
                    <strong className="text-white">Secrecy-Free Rule:</strong> Never encourages keeping secrets from parents or meeting strangers in person.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <CheckCircle className="w-5 h-5 text-clicky-mint shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-clicky-pale font-medium">
                    <strong className="text-white">Emergency Awareness:</strong> Detects immediate physical dangers and directs children to trusted adults or emergency lines.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/child/kindbot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-clicky-yellow hover:bg-clicky-yellow-hover text-clicky-navy-dark font-black text-sm shadow-md transition-all active:translate-y-1"
                >
                  <span>Chat with KindBot Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-white/95 rounded-3xl p-6 text-clicky-navy border-2 border-clicky-yellow shadow-card-hover max-w-md w-full">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <Mascot size="sm" mood="happy" />
                  <div>
                    <h4 className="font-black text-sm text-clicky-navy">KindBot Chat Preview</h4>
                    <span className="text-[10px] text-emerald-600 font-bold">● Active & Ready to Assist</span>
                  </div>
                </div>

                <div className="my-4 space-y-3 text-xs leading-relaxed">
                  <div className="bg-clicky-navy text-white p-3 rounded-2xl rounded-tr-xs font-semibold ml-auto max-w-[85%]">
                    Someone in my game said they would give me free gems if I tell them my secret password. Should I?
                  </div>

                  <div className="bg-clicky-pale text-clicky-navy p-3 rounded-2xl rounded-tl-xs border border-clicky-sky/40 font-medium mr-auto max-w-[90%]">
                    <span className="font-black text-clicky-orange block mb-1">KindBot says:</span>
                    Definitely not! That is a phishing trick. Legitimate game admins will NEVER ask for your password in chat. Mute the user and keep your account safe!
                  </div>
                </div>

                <Link
                  href="/child/kindbot"
                  className="w-full py-2.5 rounded-xl bg-clicky-pale hover:bg-clicky-sky-light text-clicky-navy font-black text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Try It in the KindBot Playground</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section id="for-parents" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              {/* Illustrated Parent Dashboard Mockup Card */}
              <div className="bg-gradient-to-br from-clicky-bg to-white p-6 rounded-3xl border border-clicky-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-clicky-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-clicky-navy text-white flex items-center justify-center font-bold text-xs">
                      SM
                    </div>
                    <div>
                      <h4 className="font-bold text-clicky-navy text-xs">Sarah Miller</h4>
                      <span className="text-[10px] text-gray-500">Child: Alex (Level 2 Scout)</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Linked & Synced
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-white rounded-xl border border-gray-150">
                    <div className="text-lg font-black text-clicky-navy">85%</div>
                    <div className="text-[10px] text-gray-500 font-bold">Scam Spotting</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-150">
                    <div className="text-lg font-black text-clicky-orange">90%</div>
                    <div className="text-[10px] text-gray-500 font-bold">Privacy Vault</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-150">
                    <div className="text-lg font-black text-clicky-mint-dark">480</div>
                    <div className="text-[10px] text-gray-500 font-bold">Total XP</div>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block mb-0.5">Parent Recommendation:</span>
                  Alex aced Scam Detective! Try VoiceGuard Rescue next to practice establishing secret family safe words against cloned caller scams.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
                Guardian Oversight
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy leading-tight">
                Meaningful Progress, Not Invasive Surveillance
              </h2>

              <p className="text-clicky-muted text-sm sm:text-base font-semibold leading-relaxed">
                Clicky gives parents transparent insights into which digital safety concepts their children have mastered and where they could benefit from extra practice.
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-clicky-yellow/40 flex items-center justify-center font-bold text-clicky-navy shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-bold text-clicky-navy">
                    Skill breakdown across 8 key cyber safety categories.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-clicky-mint/50 flex items-center justify-center font-bold text-clicky-navy shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-bold text-clicky-navy">
                    Weekly practice tracking and estimated learning time.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-clicky-orange/30 flex items-center justify-center font-bold text-clicky-navy shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-bold text-clicky-navy">
                    Constructive, positive recommendations without alarming labels.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/parent/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm shadow-md transition-all active:translate-y-1"
                >
                  <span>Explore Parent Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-clicky-bg border-t border-clicky-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full bg-clicky-pale text-clicky-navy font-black text-xs uppercase tracking-wider border border-clicky-sky/40">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-clicky-navy mt-3 mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-clicky-border overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-black text-sm sm:text-base text-clicky-navy flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="text-clicky-orange font-black text-lg">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-clicky-muted font-semibold leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Mascot size="lg" mood="cheer" />
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Begin Your Online Safety Adventure?
          </h2>
          <p className="text-clicky-sky-light text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Join thousands of kids and families becoming confident digital citizens today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/child/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-base shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Play as Child (Alex)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/parent/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-gray-100 text-clicky-navy font-black text-base transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Users className="w-5 h-5" />
              <span>View Parent Portal (Sarah)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-clicky-border py-12 text-clicky-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <AppLogo size="md" href="/" />
              <p className="text-xs text-clicky-muted font-medium leading-relaxed">
                Clicky is an AI-powered child digital safety learning platform transforming online awareness into playful, memorable adventures.
              </p>
            </div>

            <div>
              <h4 className="font-black text-clicky-navy text-xs uppercase tracking-wider mb-3">
                Child Adventures
              </h4>
              <ul className="space-y-2 text-xs font-bold text-clicky-muted">
                <li><Link href="/child/games/scam-detective" className="hover:text-clicky-orange">Scam Detective</Link></li>
                <li><Link href="/child/games/cyberbullying-heroes" className="hover:text-clicky-orange">Cyberbullying Heroes</Link></li>
                <li><Link href="/child/games/privacy-protector" className="hover:text-clicky-orange">Privacy Protector</Link></li>
                <li><Link href="/child/kindbot" className="hover:text-clicky-orange">KindBot AI Companion</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-clicky-navy text-xs uppercase tracking-wider mb-3">
                For Families
              </h4>
              <ul className="space-y-2 text-xs font-bold text-clicky-muted">
                <li><Link href="/parent/dashboard" className="hover:text-clicky-orange">Parent Dashboard</Link></li>
                <li><Link href="/parent/progress" className="hover:text-clicky-orange">Learning Progress</Link></li>
                <li><Link href="/pair-child" className="hover:text-clicky-orange">Pair a Child Profile</Link></li>
                <li><Link href="/safety" className="hover:text-clicky-orange">Safety Principles</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-clicky-navy text-xs uppercase tracking-wider mb-3">
                Safety & Standards
              </h4>
              <p className="text-xs text-clicky-muted font-medium leading-relaxed mb-2">
                Built strictly with privacy-by-design principles, zero commercial advertisements, and no public stranger chat rooms.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>COPPA & Child Safety Compliant</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-clicky-border text-center text-xs text-clicky-muted font-semibold flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Clicky. All rights reserved. Designed for child online safety.</span>
            <div className="flex items-center gap-4">
              <Link href="/safety" className="hover:text-clicky-navy">Privacy Policy</Link>
              <Link href="/how-it-works" className="hover:text-clicky-navy">How It Works</Link>
              <Link href="/about" className="hover:text-clicky-navy">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
