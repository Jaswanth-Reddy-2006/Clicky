"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Star, Award, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, Shield, Lightbulb } from "lucide-react";
import { ChildProfile, TopicProgress, Achievement, SafetyRecommendation } from "@/types";

export default function ChildDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recommendations, setRecommendations] = useState<SafetyRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const res = await fetch(`/api/children/${params.id}`);
        const data = await res.json();
        if (data.success && data.child) {
          setChild(data.child);
          setTopicProgress(data.topicProgress || []);
          setAchievements(data.recentAchievements || []);
          setRecommendations(data.recommendations || []);
        }
      } catch (err) {
        console.error("Error fetching child details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetails();
  }, [params.id]);

  if (loading || !child) {
    return (
      <div className="p-8 text-center text-xs font-bold text-gray-500 animate-pulse">
        Loading explorer profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <Link
          href="/parent/children"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Child Profile Details
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
            {child.name}&apos;s Safety Journey
          </h1>
        </div>
      </div>

      {/* Top Banner Card */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-clicky-pale text-clicky-navy flex items-center justify-center font-bold shadow-xs">
            <Shield className="w-8 h-8 text-clicky-navy" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-900">{child.name}</h2>
              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Linked Account
              </span>
            </div>
            <p className="text-xs font-bold text-clicky-orange mt-0.5">
              Level {child.level}: {child.levelTitle} • {child.xp} Total XP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 min-w-[90px]">
            <span className="text-gray-400 font-bold block text-[10px] uppercase">
              Streak
            </span>
            <span className="font-black text-orange-600 text-base">
              {child.currentStreak} Days
            </span>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 min-w-[90px]">
            <span className="text-gray-400 font-bold block text-[10px] uppercase">
              Badges
            </span>
            <span className="font-black text-clicky-navy text-base">
              {achievements.length}
            </span>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div>
        <h3 className="text-base font-black text-gray-900 mb-3">
          Topic Learning Accuracy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicProgress.map((tp) => (
            <div
              key={tp.topic}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-black text-gray-900">
                <span>{tp.topic}</span>
                <span className="text-clicky-navy font-black">{tp.scorePercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-clicky-navy rounded-full"
                  style={{ width: `${tp.scorePercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-1">
                <span>{tp.missionsCompleted} Missions Finished</span>
                <span className="text-gray-600 font-bold">{tp.masteryLevel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-base font-black text-gray-900 mb-3">
            Active Recommendations for {child.name}
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-3"
              >
                <div className="mt-0.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-amber-900">{rec.title}</h5>
                  <p className="font-medium mt-0.5 text-amber-950 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
