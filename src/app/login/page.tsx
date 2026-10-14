"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Shield,
  Bot,
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";
import { playSound } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    playSound("click");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json();

      if (data.success) {
        playSound("correct");
        router.push(data.redirectTo || "/child/dashboard");
        router.refresh();
      } else {
        playSound("incorrect");
        setErrorMessage(data.error || "Login failed. Check your credentials.");
      }
    } catch {
      playSound("incorrect");
      setErrorMessage("Network error connecting to login service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle1ClickDemo = async (role: "PARENT" | "CHILD") => {
    setIsLoading(true);
    setErrorMessage(null);
    playSound("click");
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
        playSound("correct");
        router.push(data.redirectTo);
        router.refresh();
      } else {
        playSound("incorrect");
        setErrorMessage("Demo login failed.");
      }
    } catch {
      playSound("incorrect");
      setErrorMessage("Error launching demo account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-4xl bg-white rounded-3xl border border-clicky-border shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (Desktop): Mascot Illustration, Welcome & Product Benefits */}
          <div className="lg:col-span-5 bg-gradient-to-br from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle decorative circles */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-clicky-yellow/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-clicky-sky/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <AppLogo size="md" href="/" />

              <div className="pt-6">
                <div className="inline-block p-4 rounded-3xl bg-white/10 border border-white/20 mb-4 shadow-xs">
                  <Mascot size="lg" mood="cheer" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                  Welcome Back, Cyber Hero!
                </h2>
                <p className="text-xs sm:text-sm text-clicky-sky-light font-medium mt-2 leading-relaxed">
                  Continue your quest to spot scams, defeat digital tricksters, and build your digital shield.
                </p>
              </div>

              {/* Bulleted Benefits */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-clicky-sky-light font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-clicky-yellow shrink-0" />
                  <span>48+ playable safety missions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-clicky-mint shrink-0" />
                  <span>KindBot AI companion guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-clicky-orange shrink-0" />
                  <span>Linked parent progress portal</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 text-[11px] text-gray-400 font-bold">
              100% Kid-Safe & COPPA Compliant Platform
            </div>
          </div>

          {/* Right Column: Clean Login Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-clicky-navy">
                  Sign In to Clicky
                </h1>
                <p className="text-xs text-clicky-muted font-bold mt-1">
                  Access your player adventure world or parent portal
                </p>
              </div>

              {/* 1-Click Demo Access Box for Judges */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-clicky-yellow-pale to-clicky-pale border-2 border-clicky-yellow/60">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-clicky-navy">
                    <Sparkles className="w-4 h-4 text-clicky-orange" />
                    <span>JUDGES 1-CLICK DEMO ACCESS:</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-clicky-muted">Instant Login</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handle1ClickDemo("CHILD")}
                    disabled={isLoading}
                    className="py-2.5 px-3 rounded-xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs shadow-fun-orange active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Alex (Child)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handle1ClickDemo("PARENT")}
                    disabled={isLoading}
                    className="py-2.5 px-3 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs shadow-fun active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-clicky-yellow" />
                    <span>Sarah (Parent)</span>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 animate-in fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Standard Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@clicky.demo or parent@clicky.demo"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
                    />
                    <Mail className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-clicky-orange hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
                    />
                    <Lock className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-clicky-muted hover:text-clicky-navy"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-clicky-navy focus:ring-clicky-yellow accent-clicky-navy cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs font-bold text-clicky-navy cursor-pointer">
                    Remember session on this device
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm shadow-md transition-all active:translate-y-1 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs font-bold text-clicky-muted">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="text-clicky-orange hover:underline font-black">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
