"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight, Sparkles, Shield } from "lucide-react";
import { SafetyRecommendation } from "@/types";

export default function ParentRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<SafetyRecommendation[]>([]);

  useEffect(() => {
    fetch("/api/parent/overview")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.recommendations) {
          setRecommendations(d.data.recommendations);
        }
      })
      .catch(console.error);
  }, []);

  const discussionPrompts = [
    {
      topic: "Voice Cloning & Caller Verification",
      prompt:
        "&ldquo;If someone called our house pretending to be me in an emergency, what secret safe word would we ask them to say?&rdquo;",
      context:
        "Helps establish an agreed family safe word phrase (like &apos;Blue Kangaroo&apos;) to thwart AI audio scams.",
    },
    {
      topic: "Gaming Strangers & Private Apps",
      prompt:
        "&ldquo;Why do you think some gamers try to convince players to move from the game lobby into disappearing message apps like Snapchat?&rdquo;",
      context:
        "Opens an easy, non-threatening conversation about online grooming warning signs and keeping game friendships inside the game.",
    },
    {
      topic: "AI Chatbots & Mistakes",
      prompt:
        "&ldquo;Have you ever noticed an AI bot sounding totally confident while giving a funny or wrong fact? How do we double-check things?&rdquo;",
      context:
        "Reinforces that AI tools predict text and can hallucinate false claims without bad intentions.",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Guardian Guidance
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
          Recommendations & Family Discussion Starters
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Constructive, actionable tips and conversation prompts tailored to Alex&apos;s recent learning
        </p>
      </div>

      {/* Recommended Practice Activities */}
      <div>
        <h3 className="text-lg font-black text-gray-900 mb-4">
          Recommended Missions to Practice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {rec.topic}
                </span>
                <h4 className="font-black text-gray-900 text-sm mt-2 leading-snug">
                  {rec.title}
                </h4>
                <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              {rec.gameSlug && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400">
                    Recommended Quest
                  </span>
                  <Link
                    href={`/child/games/${rec.gameSlug}`}
                    className="text-xs font-bold text-clicky-orange hover:underline flex items-center gap-1"
                  >
                    <span>Launch Game</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dinner Table Discussion Prompts */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-clicky-pale to-white border border-clicky-sky/40 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-clicky-navy text-white flex items-center justify-center font-bold">
            <MessageSquare className="w-4 h-4 text-clicky-yellow" />
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-base">
              Family Conversation Starters
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Try asking these relaxed questions over dinner or on the drive to school
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {discussionPrompts.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-1.5"
            >
              <span className="text-[10px] font-black uppercase text-clicky-orange tracking-wider">
                {item.topic}
              </span>
              <p
                className="text-xs sm:text-sm font-bold text-clicky-navy"
                dangerouslySetInnerHTML={{ __html: item.prompt }}
              />
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                <strong>Why it helps:</strong> {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
