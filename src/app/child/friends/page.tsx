"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UsersRound,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Send,
  Trophy,
  Flame,
  Award,
  Gamepad2,
  Lock,
  Plus,
  RefreshCw,
  Heart,
  ArrowRight,
  Smile,
} from "lucide-react";
import { Friend, FriendChallenge, PredefinedReaction } from "@/types";
import { Mascot } from "@/components/common/Mascot";
import { playSound } from "@/lib/utils";

export default function ChildFriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [activeCode, setActiveCode] = useState<string>("HERO-4921");
  const [challenges, setChallenges] = useState<FriendChallenge[]>([]);
  const [reactions, setReactions] = useState<PredefinedReaction[]>([]);
  const [reactionOptions, setReactionOptions] = useState<
    { text: string; icon: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Add friend state
  const [inputCode, setInputCode] = useState("");
  const [addMessage, setAddMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Send cheer state
  const [selectedFriendForCheer, setSelectedFriendForCheer] = useState<Friend | null>(
    null
  );
  const [cheerSuccess, setCheerSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const fetchFriendsData = async () => {
    try {
      const res = await fetch("/api/friends");
      const data = await res.json();
      if (data.success) {
        setFriends(data.friends || []);
        if (data.activeCode?.code) setActiveCode(data.activeCode.code);
        setChallenges(data.challenges || []);
        setReactions(data.reactions || []);
        setReactionOptions(data.reactionOptions || []);
      }
    } catch (err) {
      console.error("Failed to fetch friends data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    playSound("click");
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleGenerateNewCode = async () => {
    playSound("click");
    try {
      const res = await fetch("/api/friends/code", { method: "POST" });
      const data = await res.json();
      if (data.success && data.codeRecord) {
        setActiveCode(data.codeRecord.code);
        playSound("celebrate");
      }
    } catch (err) {
      console.error("Error generating friend code:", err);
    }
  };

  const handleRedeemCode = async (codeToUse?: string) => {
    const code = (codeToUse || inputCode).trim().toUpperCase();
    if (!code) return;

    playSound("click");
    setIsSubmittingCode(true);
    setAddMessage(null);

    try {
      const res = await fetch("/api/friends/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.success) {
        playSound("celebrate");
        setAddMessage({ text: data.message, isError: false });
        setInputCode("");
        if (data.updatedFriends) setFriends(data.updatedFriends);
      } else {
        playSound("incorrect");
        setAddMessage({ text: data.message || "Failed to redeem code", isError: true });
      }
    } catch {
      setAddMessage({ text: "Network error trying to connect.", isError: true });
    } finally {
      setIsSubmittingCode(false);
    }
  };

  const handleSendCheer = async (reaction: { text: string; icon: string }) => {
    if (!selectedFriendForCheer) return;
    playSound("celebrate");

    try {
      const res = await fetch("/api/friends/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toFriendId: selectedFriendForCheer.id,
          reactionText: reaction.text,
          icon: reaction.icon,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCheerSuccess(`Sent "${reaction.icon} ${reaction.text}" to ${selectedFriendForCheer.name}!`);
        setTimeout(() => {
          setCheerSuccess(null);
          setSelectedFriendForCheer(null);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to send reaction:", err);
    }
  };

  const handleAcceptChallenge = async (challengeId: string) => {
    playSound("celebrate");
    try {
      await fetch("/api/friends/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, action: "accept" }),
      });
      setChallenges((prev) =>
        prev.map((c) => (c.id === challengeId ? { ...c, status: "ACCEPTED" } : c))
      );
    } catch (err) {
      console.error("Failed to accept challenge:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-indigo-700/50">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
              <span>100% Kid Safe & COPPA Protected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Safe Friends Circle
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm font-medium leading-relaxed">
              Connect with schoolmates and friends safely using expiring Friend Codes.
              Cheer each other on with positive stickers and friendly learning challenges!
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            <Mascot size="md" mood="cheer" />
            <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold text-white">
              <Lock className="w-3 h-3 text-indigo-300" />
              <span>Zero Stranger Chat</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: My Friend Code & Add Friend */}
        <div className="space-y-6">
          {/* My Code Card */}
          <div className="bg-white rounded-3xl border-2 border-clicky-border p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-clicky-yellow/30 text-clicky-navy flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-clicky-orange" />
                </div>
                <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                  My Safe Friend Code
                </h3>
              </div>
              <button
                type="button"
                onClick={handleGenerateNewCode}
                className="text-[11px] text-clicky-navy hover:text-clicky-orange font-bold flex items-center gap-1"
                title="Generate a fresh code"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New</span>
              </button>
            </div>

            {/* Display Code */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-clicky-pale to-white border-2 border-dashed border-clicky-sky text-center space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-clicky-muted">
                Share this with friends:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-clicky-navy">
                {activeCode}
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                Expires in 24 hours • Max 3 connections
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="w-full py-3 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Code Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Friend Code</span>
                </>
              )}
            </button>
          </div>

          {/* Add a Friend Card */}
          <div className="bg-white rounded-3xl border-2 border-clicky-border p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Plus className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                Connect With Friend
              </h3>
            </div>

            <p className="text-xs text-clicky-text font-medium leading-relaxed">
              Enter the 6-character code given to you by a classmate or parent:
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HERO-4921"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border-2 border-clicky-border focus:border-clicky-navy focus:outline-hidden text-sm font-bold font-mono tracking-wider uppercase"
                />
                <button
                  type="button"
                  onClick={() => handleRedeemCode()}
                  disabled={!inputCode || isSubmittingCode}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <span>Connect</span>
                </button>
              </div>

              {addMessage && (
                <div
                  className={`p-2.5 rounded-xl text-xs font-bold ${
                    addMessage.isError
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {addMessage.text}
                </div>
              )}
            </div>

            {/* Demo Quick Try Chips */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400">
                Demo Sample Codes to Try:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["PANDA-88", "WOLF-42", "STAR-77"].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleRedeemCode(code)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-clicky-pale text-clicky-navy font-mono text-[11px] font-bold border border-slate-200 transition-colors"
                  >
                    +{code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Columns: Friends List & Social Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Friends Shelf */}
          <div className="bg-white rounded-3xl border-2 border-clicky-border p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <UsersRound className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                    My Connected Friends ({friends.length})
                  </h3>
                  <span className="text-[11px] text-clicky-muted font-medium">
                    Verified kid safety connections
                  </span>
                </div>
              </div>
            </div>

            {/* Friends Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="p-4 rounded-2xl border-2 border-clicky-border hover:border-indigo-300 transition-all bg-gradient-to-br from-white to-slate-50/50 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-lg font-bold shadow-2xs">
                        {friend.avatar === "cyber-wolf"
                          ? "🐺"
                          : friend.avatar === "pixel-panda"
                          ? "🐼"
                          : friend.avatar === "star-coder"
                          ? "⭐"
                          : "🚀"}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black text-clicky-navy">
                            {friend.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            @{friend.handle}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-clicky-orange">
                          Level {friend.level} • {friend.levelTitle}
                        </p>
                      </div>
                    </div>

                    {/* Online status */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        friend.status === "online"
                          ? "bg-emerald-500 ring-2 ring-emerald-200"
                          : friend.status === "exploring"
                          ? "bg-amber-500 ring-2 ring-amber-200"
                          : "bg-slate-300"
                      }`}
                      title={`Status: ${friend.status}`}
                    />
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-2 py-1.5 rounded-xl bg-white border border-slate-200">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      <span>{friend.currentStreak}d Streak</span>
                    </div>
                    <div className="flex items-center gap-1 text-indigo-600">
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{friend.badgeCount} Badges</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setSelectedFriendForCheer(friend);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                      <span>Send Cheer</span>
                    </button>
                    <Link
                      href="/child/games"
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-colors flex items-center justify-center"
                      title="Challenge friend in arcade"
                    >
                      <Gamepad2 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Challenges & Encouragement Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Friend Challenges */}
            <div className="bg-white rounded-3xl border-2 border-clicky-border p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                  Friendly Challenges
                </h3>
              </div>

              {challenges.length === 0 ? (
                <p className="text-xs text-slate-400">No active challenges right now.</p>
              ) : (
                <div className="space-y-2.5">
                  {challenges.map((chal) => (
                    <div
                      key={chal.id}
                      className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                        <span>{chal.fromFriendName}</span>
                        <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-black">
                          +{chal.xpReward} XP
                        </span>
                      </div>
                      <p className="text-xs text-amber-900 font-medium">
                        Beat {chal.targetScore}% score in <strong>{chal.gameTitle}</strong>!
                      </p>
                      <div className="pt-1">
                        {chal.status === "ACCEPTED" ? (
                          <Link
                            href={`/child/games/${chal.gameSlug}`}
                            className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1 transition-colors"
                          >
                            <span>Play Mission Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAcceptChallenge(chal.id)}
                            className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                          >
                            <span>Accept Quest</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Encouragement Board */}
            <div className="bg-white rounded-3xl border-2 border-clicky-border p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <h3 className="text-xs font-black text-clicky-navy uppercase tracking-wider">
                  Encouragement Wall
                </h3>
              </div>

              {reactions.length === 0 ? (
                <p className="text-xs text-slate-400">No cheers received yet.</p>
              ) : (
                <div className="space-y-2">
                  {reactions.map((react) => (
                    <div
                      key={react.id}
                      className="p-3 rounded-2xl bg-pink-50/50 border border-pink-200 flex items-start gap-2.5"
                    >
                      <span className="text-lg">{react.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black text-pink-700 block">
                          From {react.fromFriendName}:
                        </span>
                        <p className="text-xs text-pink-950 font-bold mt-0.5">
                          &ldquo;{react.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cheer Picker Modal */}
      <AnimatePresence>
        {selectedFriendForCheer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border-2 border-clicky-border p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  <h3 className="text-sm font-black text-clicky-navy">
                    Send Cheer to {selectedFriendForCheer.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFriendForCheer(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Pick a positive encouragement sticker to brighten their day:
              </p>

              {cheerSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                  {cheerSuccess}
                </div>
              ) : (
                <div className="space-y-2">
                  {reactionOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendCheer(opt)}
                      className="w-full p-3 rounded-2xl border-2 border-clicky-border hover:border-indigo-400 hover:bg-indigo-50/50 text-left text-xs font-bold text-clicky-navy transition-all flex items-center gap-3 shadow-2xs"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
