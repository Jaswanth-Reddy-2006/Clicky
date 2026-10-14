"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Link2, Sparkles, Key, CheckCircle2, ArrowRight, Copy, RefreshCw } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function PairChildPage() {
  const [activeTab, setActiveTab] = useState<"parent" | "child">("parent");
  const [generatedCode, setGeneratedCode] = useState<string>("CLICKY-7890");
  const [expiresAt, setExpiresAt] = useState<string>("In 24 Hours");
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // Child redeem state
  const [inputCode, setInputCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionResult, setRedemptionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/pairing-codes", { method: "POST" });
      const data = await res.json();
      if (data.success && data.code) {
        setGeneratedCode(data.code);
        setExpiresAt("In 24 Hours");
      }
    } catch {
      // Fallback generator
      const random = Math.floor(1000 + Math.random() * 9000);
      setGeneratedCode(`CLICKY-${random}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim() || isRedeeming) return;

    setIsRedeeming(true);
    setRedemptionResult(null);

    try {
      const res = await fetch("/api/pairing-codes/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setRedemptionResult({
          success: true,
          message: data.message || "Successfully paired with parent account!",
        });
        setInputCode("");
      } else {
        setRedemptionResult({
          success: false,
          message: data.error || "Failed to redeem code. Please double-check with parent.",
        });
      }
    } catch {
      setRedemptionResult({
        success: false,
        message: "Network error validating pairing code.",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />

      <header className="bg-white border-b border-clicky-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <AppLogo size="md" href="/" />
          <Link
            href="/parent/dashboard"
            className="text-xs font-bold text-clicky-navy hover:text-clicky-orange"
          >
            Return to Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 my-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-clicky-pale text-clicky-navy flex items-center justify-center mx-auto mb-1">
            <Link2 className="w-6 h-6 text-clicky-navy" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-clicky-navy">
            Parent-Child Pairing
          </h1>
          <p className="text-xs sm:text-sm text-clicky-muted font-bold">
            Connect a child explorer profile to a parent guardian dashboard using a secure one-time code
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="p-1 rounded-2xl bg-white border border-clicky-border shadow-2xs grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveTab("parent")}
            className={`py-2.5 rounded-xl font-black text-xs transition-all ${
              activeTab === "parent"
                ? "bg-clicky-navy text-white shadow-xs"
                : "text-clicky-muted hover:text-clicky-navy"
            }`}
          >
            Parent: Generate Code
          </button>

          <button
            onClick={() => setActiveTab("child")}
            className={`py-2.5 rounded-xl font-black text-xs transition-all ${
              activeTab === "child"
                ? "bg-clicky-orange text-white shadow-xs"
                : "text-clicky-muted hover:text-clicky-navy"
            }`}
          >
            Child: Enter Code
          </button>
        </div>

        {/* Parent Tab Content */}
        {activeTab === "parent" ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                Step 1 of 2
              </span>
              <h2 className="text-lg font-black text-clicky-navy">
                Give This Code to Your Child
              </h2>
              <p className="text-xs text-clicky-muted font-medium">
                Your child enters this single-use code in their account to link with your dashboard.
              </p>
            </div>

            <div className="p-5 bg-clicky-bg rounded-2xl border-2 border-dashed border-clicky-sky text-center space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                Single-Use Pairing Code
              </span>
              <div className="text-3xl sm:text-4xl font-black text-clicky-navy tracking-widest font-mono">
                {generatedCode}
              </div>
              <span className="text-[11px] text-gray-400 font-bold block">
                Valid for {expiresAt}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 py-3 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                {codeCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{codeCopied ? "Copied Code!" : "Copy Code"}</span>
              </button>

              <button
                onClick={handleGenerateCode}
                disabled={isGenerating}
                className="px-4 py-3 rounded-xl bg-clicky-pale hover:bg-clicky-sky-light text-clicky-navy font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span>New Code</span>
              </button>
            </div>
          </div>
        ) : (
          /* Child Tab Content */
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clicky-border shadow-card space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                Step 2 of 2
              </span>
              <h2 className="text-lg font-black text-clicky-navy">
                Link to Parent Guardian
              </h2>
              <p className="text-xs text-clicky-muted font-medium">
                Type the pairing code your parent or guardian shared with you.
              </p>
            </div>

            {redemptionResult && (
              <div
                className={`p-4 rounded-2xl border text-xs font-bold ${
                  redemptionResult.success
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                {redemptionResult.message}
              </div>
            )}

            <form onSubmit={handleRedeemCode} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-clicky-navy uppercase mb-1">
                  Enter 8-Digit Pairing Code
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="e.g. CLICKY-7890"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border text-center font-mono text-xl font-black text-clicky-navy uppercase tracking-wider outline-none focus:border-clicky-navy"
                />
              </div>

              <button
                type="submit"
                disabled={isRedeeming || !inputCode.trim()}
                className="w-full py-3.5 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover text-white font-black text-xs sm:text-sm shadow-fun-orange active:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <span>{isRedeeming ? "Validating Code..." : "Pair With Parent"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
