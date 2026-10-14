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
  CheckCircle,
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push(data.redirectTo || "/child/dashboard");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Login failed. Check your credentials.");
      }
    } catch {
      setErrorMessage("Network error connecting to login service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle1ClickDemo = async (role: "PARENT" | "CHILD") => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(data.redirectTo);
        router.refresh();
      } else {
        setErrorMessage("Demo login failed.");
      }
    } catch {
      setErrorMessage("Error launching demo account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-clicky-border shadow-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <AppLogo size="lg" href="/" />
            <h1 className="text-2xl font-black text-clicky-navy mt-4 mb-1">
              Welcome Back!
            </h1>
            <p className="text-xs text-clicky-muted font-bold">
              Sign in to continue your safety quests and dashboard
            </p>
          </div>

          {/* 1-Click Demo Access Box for Judges */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-clicky-yellow-pale to-clicky-pale border-2 border-clicky-yellow/60">
            <div className="flex items-center gap-1.5 text-xs font-black text-clicky-navy mb-2">
              <Sparkles className="w-4 h-4 text-clicky-orange" />
              <span>JUDGES 1-CLICK DEMO ACCESS:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
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
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
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
                  placeholder="name@clicky.demo"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
                />
                <Mail className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-clicky-orange hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm shadow-md transition-all active:translate-y-1 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "Signing in..." : "Sign In to Clicky"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs font-bold text-clicky-muted">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-clicky-orange hover:underline font-black">
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
