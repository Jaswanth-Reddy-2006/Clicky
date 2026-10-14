"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-clicky-border shadow-card p-6 sm:p-8 text-center">
          <AppLogo size="lg" href="/" />

          {!submitted ? (
            <>
              <h1 className="text-2xl font-black text-clicky-navy mt-4 mb-1">
                Reset Your Password
              </h1>
              <p className="text-xs text-clicky-muted font-bold mb-6">
                Enter your account email and we&apos;ll send you a recovery link
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-black text-clicky-navy uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@clicky.demo"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
                    />
                    <Mail className="w-4 h-4 text-clicky-muted absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm shadow-md transition-all active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Send Recovery Instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="py-4 space-y-4 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-clicky-navy">
                Reset Link Dispatched!
              </h2>
              <p className="text-xs text-clicky-muted font-semibold leading-relaxed max-w-xs mx-auto">
                We sent password recovery instructions to <strong>{email}</strong>. For the demo, you can always use the 1-Click Demo Login button on the login screen!
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-block px-6 py-2.5 rounded-xl bg-clicky-orange text-white font-black text-xs shadow-md"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-clicky-muted">
            Remember your credentials?{" "}
            <Link href="/login" className="text-clicky-orange hover:underline font-black">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
