"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TopicProgress, ParentOverviewData } from "@/types";

export default function ParentProgressPage() {
  const [data, setData] = useState<ParentOverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      console.error("Error fetching overview:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-xs font-bold text-gray-500 animate-pulse">
        Loading progress data...
      </div>
    );
  }

  const topicChartData = (data.topicProgress || []).map((tp) => ({
    name: tp.topic.split(" ")[0],
    fullName: tp.topic,
    score: tp.scorePercentage,
    missions: tp.missionsCompleted,
  }));

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Safety Skills Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
          Learning Progress & Topic Mastery
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Comprehensive review of Alex&apos;s decision-making across all 8 safety curriculum topics
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs space-y-4">
        <h3 className="font-black text-gray-900 text-base">
          Topic Performance Comparison
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: "#6B7890" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7890" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #DCE6F5", fontSize: 12, fontWeight: 700 }}
                formatter={(val: any) => [`${val}% Score`, "Topic Accuracy"]}
              />
              <Bar dataKey="score" fill="#344D78" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Cards Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.topicProgress.map((tp) => (
          <div
            key={tp.topic}
            className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-gray-900">{tp.topic}</h4>
              <span className="text-xs font-black text-clicky-navy">
                {tp.scorePercentage}% Accuracy
              </span>
            </div>

            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-clicky-navy rounded-full"
                style={{ width: `${tp.scorePercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>{tp.missionsCompleted} Missions completed</span>
              <span className="text-gray-700 font-bold">Status: {tp.masteryLevel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
