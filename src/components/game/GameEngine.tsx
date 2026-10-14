"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Star,
  Flag,
  Sparkles,
} from "lucide-react";
import { GameDefinition, ScenarioOption } from "@/types";
import { Mascot } from "../common/Mascot";
import { RewardCelebration } from "./RewardCelebration";
import { playSound } from "@/lib/utils";

interface GameEngineProps {
  game: GameDefinition;
  childProfileId?: string;
  onCompleteCallback?: (result: { score: number; xpEarned: number }) => void;
}

export const GameEngine: React.FC<GameEngineProps> = ({
  game,
  childProfileId,
  onCompleteCallback,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [correctFirstTries, setCorrectFirstTries] = useState(0);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalXp, setFinalXp] = useState(0);
  const [isSubmittingToBackend, setIsSubmittingToBackend] = useState(false);

  const scenario = game.scenarios[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + (hasSubmitted ? 1 : 0)) / game.totalScenarios) * 100
  );

  const handleSelectOption = (option: ScenarioOption) => {
    if (hasSubmitted) return;
    playSound("click");
    setSelectedOptionId(option.id);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId || hasSubmitted) return;

    const chosen = scenario.options.find((opt) => opt.id === selectedOptionId);
    if (!chosen) return;

    setHasSubmitted(true);

    if (chosen.isCorrect) {
      playSound("correct");
      setCorrectFirstTries((prev) => prev + 1);
      setAccumulatedXp((prev) => prev + scenario.xpReward);
    } else {
      playSound("incorrect");
      // Partial XP for learning effort
      setAccumulatedXp((prev) => prev + Math.round(scenario.xpReward * 0.3));
    }
  };

  const handleNext = async () => {
    // If more scenarios remain, go to next
    if (currentIndex + 1 < game.scenarios.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setShowClue(false);
    } else {
      // Game Complete!
      const finalAccuracy = Math.round(
        ((correctFirstTries + (scenario.options.find((o) => o.id === selectedOptionId)?.isCorrect ? 1 : 0)) /
          game.totalScenarios) *
          100
      );
      const completionBonusXp = 50;
      const totalEarnedXp = accumulatedXp + completionBonusXp;

      setFinalScore(finalAccuracy);
      setFinalXp(totalEarnedXp);
      setIsCompleted(true);

      // Persist to backend API
      setIsSubmittingToBackend(true);
      try {
        await fetch(`/api/games/${game.slug}/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score: finalAccuracy,
            xpEarned: totalEarnedXp,
            correctAnswersCount: correctFirstTries,
            totalScenarios: game.totalScenarios,
            childProfileId,
          }),
        });

        if (onCompleteCallback) {
          onCompleteCallback({ score: finalAccuracy, xpEarned: totalEarnedXp });
        }
      } catch (err) {
        console.error("Failed to submit game completion:", err);
      } finally {
        setIsSubmittingToBackend(false);
      }
    }
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowClue(false);
    setCorrectFirstTries(0);
    setAccumulatedXp(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <RewardCelebration
        gameTitle={game.title}
        score={finalScore}
        xpEarned={finalXp}
        badgeName={game.badgeName}
        badgeUnlocked={game.badgeSlug}
        onReplay={handleReplay}
        returnUrl="/child/games"
      />
    );
  }

  const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="max-w-3xl mx-auto py-4 px-3 sm:px-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link
          href="/child/games"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-clicky-border text-clicky-navy text-xs font-black hover:bg-clicky-pale transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </Link>

        {/* Progress Tracker */}
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-bold text-clicky-navy mb-1">
            <span>Scenario {currentIndex + 1} of {game.totalScenarios}</span>
            <span className="text-clicky-orange font-black">+{accumulatedXp} XP</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-clicky-yellow to-clicky-orange rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Topic Badge */}
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-bold border border-clicky-sky/40">
          {game.topic}
        </span>
      </div>

      {/* Main Scenario Card */}
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border border-clicky-border shadow-card overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black tracking-wider uppercase text-clicky-yellow flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-clicky-yellow" />
              {game.title} • Challenge #{currentIndex + 1}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[11px]">
              {scenario.difficulty}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {scenario.title}
          </h2>
          <p className="text-clicky-sky-light text-sm mt-1.5 font-medium leading-relaxed">
            {scenario.prompt}
          </p>
        </div>

        {/* Fictional Message / Dialogue Box */}
        {scenario.characterMessage && (
          <div className="p-5 sm:p-6 bg-clicky-bg border-b border-clicky-border/60">
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border-2 border-dashed border-clicky-sky/60 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-clicky-pale text-2xl flex items-center justify-center shrink-0 shadow-xs border border-clicky-sky/40">
                {scenario.characterAvatar || "💬"}
              </div>
              <div className="flex-1">
                <div className="text-xs font-extrabold text-clicky-navy flex items-center justify-between">
                  <span>{scenario.characterName || "Online Message"}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Simulation</span>
                </div>
                <p className="text-clicky-text text-sm font-semibold mt-1 leading-relaxed bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/80">
                  {scenario.characterMessage}
                </p>
              </div>
            </div>

            {/* Clue & Red Flags Button */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowClue(!showClue)}
                className="text-xs font-bold text-clicky-navy hover:text-clicky-orange flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-clicky-yellow fill-clicky-yellow" />
                <span>{showClue ? "Hide Detective Clue" : "Inspect Detective Clue"}</span>
              </button>

              {scenario.redFlags && scenario.redFlags.length > 0 && (
                <span className="text-[11px] text-clicky-muted font-bold flex items-center gap-1">
                  <Flag className="w-3.5 h-3.5 text-clicky-orange" />
                  {scenario.redFlags.length} Red Flags present
                </span>
              )}
            </div>

            {/* Expanded Clue & Red Flags Drawer */}
            <AnimatePresence>
              {showClue && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2 overflow-hidden"
                >
                  <p className="font-bold flex items-center gap-1.5">
                    <span>💡 Hint:</span>
                    <span>{scenario.clue}</span>
                  </p>
                  {scenario.redFlags && (
                    <div>
                      <span className="font-extrabold text-[11px] uppercase tracking-wide text-amber-800">
                        Notice these warning signs:
                      </span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-950 font-medium">
                        {scenario.redFlags.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Options Section */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-sm font-black text-clicky-navy uppercase tracking-wider mb-2">
            What is the safest decision?
          </h3>

          <div className="space-y-2.5">
            {scenario.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.isCorrect;

              let cardStyle = "bg-white border-clicky-border hover:border-clicky-navy hover:bg-clicky-pale/40";

              if (hasSubmitted) {
                if (isCorrect) {
                  cardStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300";
                } else if (isSelected && !isCorrect) {
                  cardStyle = "bg-red-50 border-red-300 text-red-950";
                } else {
                  cardStyle = "bg-gray-50 border-gray-200 opacity-60";
                }
              } else if (isSelected) {
                cardStyle = "bg-clicky-pale border-clicky-navy ring-2 ring-clicky-navy shadow-xs";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 select-none ${cardStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                      hasSubmitted
                        ? isCorrect
                          ? "bg-emerald-500 text-white"
                          : isSelected
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-500"
                        : isSelected
                        ? "bg-clicky-navy text-white"
                        : "bg-clicky-pale text-clicky-navy"
                    }`}
                  >
                    {hasSubmitted ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isSelected ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <span className="text-sm font-bold leading-snug flex-1">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Button: Confirm Answer or Next */}
          <div className="pt-4 flex items-center justify-end">
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleConfirmAnswer}
                disabled={!selectedOptionId}
                className={`px-7 py-3 rounded-2xl font-black text-sm transition-all shadow-md ${
                  selectedOptionId
                    ? "bg-clicky-orange hover:bg-clicky-orange-hover text-white shadow-fun-orange active:translate-y-1 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm My Choice
              </button>
            ) : null}
          </div>
        </div>

        {/* Feedback Panel */}
        <AnimatePresence>
          {hasSubmitted && chosenOption && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 sm:p-6 border-t-2 ${
                chosenOption.isCorrect
                  ? "bg-emerald-50/70 border-emerald-300"
                  : "bg-amber-50/80 border-amber-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Mascot
                    size="sm"
                    mood={chosenOption.isCorrect ? "happy" : "thinking"}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        chosenOption.isCorrect
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-amber-200 text-amber-900"
                      }`}
                    >
                      {chosenOption.isCorrect ? "Great Choice!" : "Learning Moment"}
                    </span>
                    <span className="text-xs font-bold text-clicky-muted">
                      {chosenOption.isCorrect ? `+${scenario.xpReward} XP` : `+${Math.round(scenario.xpReward * 0.3)} XP`}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-clicky-navy leading-relaxed">
                    {chosenOption.feedback}
                  </p>

                  <div className="mt-2.5 p-3 rounded-xl bg-white border border-gray-200/80 text-xs text-clicky-text font-semibold flex items-start gap-2">
                    <span className="font-black text-clicky-orange shrink-0">
                      Golden Safety Rule:
                    </span>
                    <span>{scenario.safetyConcept}</span>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-sm transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>
                        {currentIndex + 1 < game.scenarios.length
                          ? "Next Scenario"
                          : "View My Rewards"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
