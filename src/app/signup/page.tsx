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
  CheckCircle,
} from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"PARENT" | "CHILD">("CHILD");
  const [ageBand, setAgeBand] = useState<"EARLY_EXPLORER" | "DIGITAL_NAVIGATOR" | "CYBER_HERO">("DIGITAL_NAVIGATOR");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, ageBand }),
      });
      const data = await res.json();

      if (data.success) {
        router.push(data.redirectTo);
        router.refresh();
      } else {
        setErrorMessage(data.error || "Failed to create account.");
      }
    } catch {
      setErrorMessage("Network error creating account.");
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
              Join Clicky Today!
            </h1>
            <p className="text-xs text-clicky-muted font-bold">
              Start your child or parent digital safety adventure
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Account Role Selector */}
            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1.5">
                I am signing up as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("CHILD")}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-xs transition-all ${
                    role === "CHILD"
                      ? "bg-clicky-yellow-pale border-clicky-orange text-clicky-navy ring-2 ring-clicky-yellow"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-clicky-orange" />
                  <span>A Kid (Player)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("PARENT")}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-xs transition-all ${
                    role === "PARENT"
                      ? "bg-clicky-pale border-clicky-navy text-clicky-navy ring-2 ring-clicky-navy"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Shield className="w-4 h-4 text-clicky-navy" />
                  <span>A Parent / Guardian</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                Display Name or Nickname
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "CHILD" ? "e.g. PixelPanda" : "e.g. Sarah Miller"}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
                />
                <User className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            {role === "CHILD" && (
              <div>
                <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                  Age Group
                </label>
                <select
                  value={ageBand}
                  onChange={(e) => setAgeBand(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border text-sm font-bold text-clicky-navy outline-none"
                >
                  <option value="EARLY_EXPLORER">Early Explorer (Ages 6 - 8)</option>
                  <option value="DIGITAL_NAVIGATOR">Digital Navigator (Ages 9 - 11)</option>
                  <option value="CYBER_HERO">Cyber Hero (Ages 12 - 14)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
                />
                <Mail className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
                />
                <Lock className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "Creating Account..." : "Create My Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs font-bold text-clicky-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-clicky-navy hover:underline font-black">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
