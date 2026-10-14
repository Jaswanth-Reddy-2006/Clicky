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

export default function ParentDashboardPage() {
  const [data, setData] = useState<ParentOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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
              🛡️
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

        {/* Completed Missions */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Missions Completed
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              {data.totalCompletedMissions}
            </span>
            <span className="text-xs font-bold text-gray-400">Scenarios</span>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 block mt-1">
            Across 8 safety categories
          </span>
        </div>

        {/* Estimated Learning Time */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
              Learning Practice
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Estimated</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              ~{data.estimatedLearningMinutes}
            </span>
            <span className="text-xs font-bold text-gray-400">Minutes</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
            Active 3 days this week
          </span>
        </div>
      </div>

      {/* Safety Topic Mastery Chart & Weekly Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bar Chart of Topic Scores */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-gray-900 text-base">
                  Safety Topic Accuracy & Mastery
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Average accuracy percentage across each online safety realm
                </p>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Avg: 75%
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

      {/* Recommendations & Discussion Prompts Section */}
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
    </div>
  );
}
