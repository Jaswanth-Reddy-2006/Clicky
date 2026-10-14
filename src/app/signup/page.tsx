"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Gamepad2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Mascot } from "@/components/common/Mascot";
import { DemoBanner } from "@/components/common/DemoBanner";
import { playSound } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"PARENT" | "CHILD">("CHILD");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ageBand, setAgeBand] = useState<"EARLY_EXPLORER" | "DIGITAL_NAVIGATOR" | "CYBER_HERO">("DIGITAL_NAVIGATOR");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "Enter password", color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: "Weak (add letters/numbers)", color: "bg-red-500" };
      case 2:
        return { score: 2, label: "Fair (add symbols)", color: "bg-amber-500" };
      case 3:
        return { score: 3, label: "Good", color: "bg-clicky-yellow" };
      case 4:
      default:
        return { score: 4, label: "Strong & Safe!", color: "bg-emerald-500" };
    }
  };

  const strength = getPasswordStrength();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      playSound("incorrect");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("Please acknowledge the terms, privacy policy, and parental consent.");
      playSound("incorrect");
      return;
    }

    setIsLoading(true);
    playSound("click");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, ageBand }),
      });
      const data = await res.json();

      if (data.success) {
        playSound("celebrate");
        router.push(data.redirectTo);
        router.refresh();
      } else {
        playSound("incorrect");
        setErrorMessage(data.error || "Failed to create account.");
      }
    } catch {
      playSound("incorrect");
      setErrorMessage("Network error creating account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-clicky-border shadow-card p-6 sm:p-9">
          <div className="text-center mb-6">
            <AppLogo size="md" href="/" />
            <h1 className="text-2xl sm:text-3xl font-black text-clicky-navy mt-3 mb-1">
              Join the Clicky Adventure
            </h1>
            <p className="text-xs text-clicky-muted font-bold">
              Build your digital safety superpowers or monitor family progress
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Account Role Selection with Descriptions */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-2">
                1. Select Account Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("CHILD")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    role === "CHILD"
                      ? "bg-clicky-yellow-pale border-clicky-orange ring-2 ring-clicky-yellow shadow-xs"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Gamepad2 className="w-5 h-5 text-clicky-orange" />
                    <span className="font-black text-sm text-clicky-navy">Kid Player</span>
                  </div>
                  <p className="text-[11px] text-clicky-muted font-semibold leading-snug">
                    Play 8 safety games, unlock badges, customize mascot, ask KindBot.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("PARENT")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    role === "PARENT"
                      ? "bg-clicky-pale border-clicky-navy ring-2 ring-clicky-navy shadow-xs"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-clicky-navy" />
                    <span className="font-black text-sm text-clicky-navy">Parent / Guardian</span>
                  </div>
                  <p className="text-[11px] text-clicky-muted font-semibold leading-snug">
                    View safety scores, topic analytics, pair child devices, get tips.
                  </p>
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                {role === "CHILD" ? "Hero Nickname (No real names needed)" : "Full Name"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "CHILD" ? "e.g. PixelPanda or CyberScout" : "e.g. Sarah Miller"}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
                />
                <User className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Age Band Selector for Kids */}
            {role === "CHILD" && (
              <div>
                <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                  Age Group
                </label>
                <select
                  value={ageBand}
                  onChange={(e) => setAgeBand(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border text-xs sm:text-sm font-bold text-clicky-navy outline-none"
                >
                  <option value="EARLY_EXPLORER">Early Explorer (Ages 6 - 8)</option>
                  <option value="DIGITAL_NAVIGATOR">Digital Navigator (Ages 9 - 11)</option>
                  <option value="CYBER_HERO">Cyber Hero (Ages 12 - 14)</option>
                </select>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                {role === "CHILD" ? "Account Email (or Parent's Email)" : "Parent Email Address"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "CHILD" ? "alex@clicky.demo" : "parent@clicky.demo"}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
                />
                <Mail className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-bold">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-clicky-muted">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
                />
                <Lock className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Terms & Parental Consent Acknowledgement */}
            <div className="p-3.5 rounded-2xl bg-clicky-pale border border-clicky-sky/40 space-y-2">
              <label className="flex items-start gap-2.5 text-xs font-semibold text-clicky-navy cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-clicky-navy focus:ring-clicky-yellow accent-clicky-navy cursor-pointer"
                />
                <span className="leading-snug">
                  I agree to the <strong>Terms of Service</strong> and <strong>COPPA Child Privacy Policy</strong>.
                  {role === "CHILD" && " My parent or guardian has given permission to play."}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Setting up account...</span>
              ) : (
                <>
                  <span>Create Account & Start Quest</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs font-bold text-clicky-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-clicky-navy hover:underline font-black">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
