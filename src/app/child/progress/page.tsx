"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Star,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Gamepad2,
} from "lucide-react";
import { TopicProgress, ChildProfile } from "@/types";
import { getLevelProgress } from "@/lib/utils";

export default function ChildProgressPage() {
  const [profile, setProfile] = useState<ChildProfile>({
    id: "profile-alex-demo",
    name: "Alex",
    avatar: "robot-shield",
    ageBand: "DIGITAL_NAVIGATOR",
    level: 2,
    levelTitle: "Safety Scout",
    xp: 480,
    currentStreak: 3,
    lastActiveAt: new Date().toISOString(),
  });

  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.success) {
        if (data.childProfile) setProfile(data.childProfile);
        if (data.topicProgress) setTopicProgress(data.topicProgress);
        if (data.recentActivities) setRecentActivities(data.recentActivities);
      }
    } catch (err) {
      console.error("Progress fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const progress = getLevelProgress(profile.xp);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-black uppercase tracking-wider border border-clicky-sky/40">
          My Learning Report
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-clicky-navy mt-1">
          Alex&apos;s Safety Progress
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold">
          See your digital safety mastery level across every topic
        </p>
      </div>

      {/* Top Level Summary Card */}
      <div className="p-6 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-clicky-yellow/30 text-clicky-navy flex items-center justify-center font-black shadow-xs">
            <Shield className="w-8 h-8 text-clicky-navy" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-clicky-navy">
                Level {profile.level}: {profile.levelTitle}
              </h2>
            </div>
            <p className="text-xs text-clicky-muted font-bold">
              Total XP Earned: <span className="text-clicky-orange font-black">{profile.xp} XP</span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-64">
          <div className="flex justify-between text-xs font-black text-clicky-navy mb-1.5">
            <span>Next Level</span>
            <span className="text-clicky-orange">{progress.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-clicky-yellow to-clicky-orange rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-[11px] text-clicky-muted font-bold mt-1 block text-right">
            {progress.xpToNext} XP to Level {profile.level + 1}
          </span>
        </div>
      </div>

      {/* Topic Mastery Grid */}
      <div>
        <h3 className="text-lg font-black text-clicky-navy mb-4">
          Safety Topic Mastery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicProgress.map((tp) => {
            const masteryBadgeColor =
              tp.masteryLevel === "Guardian"
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : tp.masteryLevel === "Skilled"
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-800 border-amber-200";

            return (
              <div
                key={tp.topic}
                className="p-5 rounded-3xl bg-white border border-clicky-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-clicky-navy text-sm">
                      {tp.topic}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${masteryBadgeColor}`}
                    >
                      {tp.masteryLevel}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-black text-clicky-navy">
                      {tp.scorePercentage}%
                    </span>
                    <span className="text-xs text-clicky-muted font-bold">
                      Accuracy Score
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-clicky-yellow to-clicky-mint rounded-full"
                      style={{ width: `${tp.scorePercentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-clicky-border/60 flex items-center justify-between text-xs font-bold text-clicky-muted">
                  <span>{tp.missionsCompleted} Missions Finished</span>
                  <span className="text-clicky-navy">
                    {tp.totalAttempts} Challenges Attempted
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity List */}
      <div>
        <h3 className="text-lg font-black text-clicky-navy mb-3">
          Recent Activity
        </h3>

        <div className="bg-white rounded-3xl border border-clicky-border shadow-card overflow-hidden divide-y divide-gray-100">
          {recentActivities.length > 0 ? (
            recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-clicky-pale text-clicky-navy flex items-center justify-center font-bold">
                    <Gamepad2 className="w-5 h-5 text-clicky-navy" />
                  </div>
                  <div>
                    <h5 className="font-black text-clicky-navy text-sm leading-tight">
                      {act.gameTitle}
                    </h5>
                    <span className="text-[11px] text-clicky-muted font-bold">
                      {act.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-black text-emerald-600 text-sm block">
                      {act.score}%
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Score
                    </span>
                  </div>
                  <div>
                    <span className="font-black text-clicky-orange text-sm block">
                      +{act.xpEarned} XP
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Reward
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs font-bold text-clicky-muted">
              Complete a mission in the Arcade to see your recent activities!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
