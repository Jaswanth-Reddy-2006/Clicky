"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Link2,
  HeartHandshake,
  MessageSquare,
  BookOpen,
  Check,
  Gamepad2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { ParentOverviewData } from "@/types";
import { playSound } from "@/lib/utils";

export default function ParentDashboardPage() {
  const [data, setData] = useState<ParentOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Feature D: Family Missions state
  const [familyMissions, setFamilyMissions] = useState([
    {
      id: "fm-1",
      title: "Agree on a secret family verification phrase",
      desc: "Choose a memorable safe word (like 'Blue Kangaroo') to protect against AI voice-clone phone calls.",
      completed: true,
    },
    {
      id: "fm-2",
      title: "Discuss what to do after accidentally clicking a weird link",
      desc: "Reinforce that making an honest mistake is okay, and closing the tab + telling an adult immediately prevents account loss.",
      completed: true,
    },
    {
      id: "fm-3",
      title: "Identify 3 pieces of info that must never be public",
      desc: "Review why home address, school name, and current location tags should always remain off public profiles.",
      completed: false,
    },
    {
      id: "fm-4",
      title: "Practice muting and reporting a toxic gamer",
      desc: "Walk through how the built-in game mute button works so your child knows how to handle voice chat toxicity.",
      completed: false,
    },
  ]);

  useEffect(() => {
    setMounted(true);
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/parent/overview");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching parent overview:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMission = (id: string) => {
    playSound("click");
    setFamilyMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  if (!mounted || loading || !data) {
    return (
      <div className="p-8 text-center text-xs font-bold text-gray-500 animate-pulse">
        Loading parent insights & analytics...
      </div>
    );
  }

  const child = data.selectedChild;

  // Chart data formatted
  const topicChartData = (data.topicProgress || []).map((tp) => ({
    name: tp.topic.split(" ")[0], // Short name for clean axis
    fullName: tp.topic,
    score: tp.scorePercentage,
    missions: tp.missionsCompleted,
  }));

  const completedMissionsCount = familyMissions.filter((m) => m.completed).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Child Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
            Parent Guardian Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
            Family Safety Dashboard
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Monitoring learning progress and digital resilience for{" "}
            <strong className="text-gray-900">{child?.name || "Alex"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/pair-child"
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Link2 className="w-4 h-4 text-gray-400" />
            <span>Pair Another Child</span>
          </Link>

          <Link
            href="/child/dashboard"
            className="px-4 py-2 rounded-xl bg-clicky-yellow/30 text-clicky-navy-dark border border-clicky-yellow/60 font-black text-xs flex items-center gap-1.5 hover:bg-clicky-yellow/50 transition-colors"
          >
            <span>Open Child Adventure View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Child Profile & Level */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Active Child Profile
          </span>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-clicky-pale text-clicky-navy text-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-clicky-navy" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm">{child?.name}</h4>
              <span className="text-xs font-bold text-clicky-orange">
                Level {child?.level} • {child?.levelTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Total XP Earned */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Accumulated XP
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-clicky-navy">
              {data.totalXp}
            </span>
            <span className="text-xs font-bold text-gray-400">XP points</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
            +150 XP earned this week
          </span>
        </div>

        {/* Missions Completed */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Completed Scenarios
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              {data.totalCompletedMissions}
            </span>
            <span className="text-xs font-bold text-gray-400">of 48 missions</span>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 block mt-1">
            Across 8 safety domains
          </span>
        </div>

        {/* Estimated Learning Time */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Estimated Learning Time
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-clicky-orange">
              {data.estimatedLearningMinutes}
            </span>
            <span className="text-xs font-bold text-gray-400">minutes total</span>
          </div>
          <span className="text-[11px] font-semibold text-clicky-navy block mt-1">
            Avg ~15 min daily session
          </span>
        </div>
      </div>

      {/* FEATURE D: FAMILY DISCUSSION MISSIONS (Interactive Parent & Child checkoff) */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base">
                Family Safety Discussion Missions
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Short guided activities for parents and kids to complete together at dinner or in the car
              </p>
            </div>
          </div>

          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            {completedMissionsCount} of 4 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {familyMissions.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMission(m.id)}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 cursor-pointer transition-all ${
                m.completed
                  ? "bg-emerald-50/60 border-emerald-300 text-emerald-950"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  m.completed
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white border-gray-300 text-transparent"
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h5 className="font-black text-xs sm:text-sm leading-snug">{m.title}</h5>
                <p className="text-[11px] font-medium text-gray-500 mt-0.5 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Topic Mastery Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-gray-900 text-base">
                  Safety Topic Mastery Scores
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Percentage accuracy across all eight digital topics
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                Live Sync
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: "#6B7890" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7890" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #DCE6F5", fontSize: 12, fontWeight: 700 }}
                    formatter={(value: any) => [`${value}% Accuracy`, "Score"]}
                  />
                  <Bar dataKey="score" fill="#344D78" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Strongest: Privacy & Personal Data (90%)</span>
            <span className="text-clicky-orange font-bold">Practice Area: Voice Cloning (55%)</span>
          </div>
        </div>

        {/* Right: Weekly Learning Minutes Line Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-gray-900 text-base">
                  Weekly Practice Activity
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Minutes practiced per day this week
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.weeklyActivity} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: "#6B7890" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7890" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #DCE6F5", fontSize: 12, fontWeight: 700 }}
                    formatter={(value: any) => [`${value} mins`, "Time"]}
                  />
                  <Line type="monotone" dataKey="minutes" stroke="#E9A15A" strokeWidth={3} dot={{ r: 4, fill: "#E9A15A" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Total: ~185 minutes this week</span>
            <span className="text-emerald-600 font-bold">Consistent pace</span>
          </div>
        </div>
      </div>

      {/* Constructive Recommendations Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-gray-900 text-lg">
            Constructive Practice Recommendations
          </h3>
          <Link
            href="/parent/recommendations"
            className="text-xs font-bold text-clicky-orange hover:underline"
          >
            View All Prompts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {rec.topic}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      rec.priority === "HIGH" ? "text-red-600" : "text-gray-400"
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
                <h4 className="font-black text-gray-900 text-sm leading-snug">
                  {rec.title}
                </h4>
                <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              {rec.gameSlug && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400">
                    Suggested game
                  </span>
                  <Link
                    href={`/child/games/${rec.gameSlug}`}
                    className="text-xs font-bold text-clicky-navy hover:text-clicky-orange flex items-center gap-1"
                  >
                    <span>Inspect Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Learning Activity Timeline */}
      {data.recentActivities && data.recentActivities.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-900 text-base">
              Recent Child Mission Activity
            </h3>
            <span className="text-xs text-gray-400 font-bold">Live Synced</span>
          </div>

          <div className="divide-y divide-gray-100">
            {data.recentActivities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-clicky-pale border border-clicky-sky/30 text-clicky-navy">
                    <Gamepad2 className="w-5 h-5 text-clicky-navy" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs sm:text-sm text-gray-900">{act.gameTitle}</h5>
                    <span className="text-[11px] text-gray-500 font-medium">{act.topic}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 block">{act.score}% Score</span>
                  <span className="text-[10px] font-bold text-clicky-orange">+{act.xpEarned} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
