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
  Zap,
} from "lucide-react";
import { GameDefinition, ScenarioOption } from "@/types";
import { Mascot } from "../common/Mascot";
import { RewardCelebration } from "./RewardCelebration";
import { playSound } from "@/lib/utils";
import { ClueInspectorGame } from "./modes/ClueInspectorGame";
import { ChatSimulationGame } from "./modes/ChatSimulationGame";
import { EvidenceBoardGame } from "./modes/EvidenceBoardGame";
import { PrivacyLabGame } from "./modes/PrivacyLabGame";
import { AILabGame } from "./modes/AILabGame";
import { VoiceRescueGame } from "./modes/VoiceRescueGame";
import { KindnessStoryGame } from "./modes/KindnessStoryGame";
import { GamerInventoryGame } from "./modes/GamerInventoryGame";

interface GameEngineProps {
  game: GameDefinition;
  childProfileId?: string;
  onCompleteCallback?: (result: { score: number; xpEarned: number }) => void;
}

const GAME_THEMES: Record<
  string,
  {
    headerGradient: string;
    badgeLabel: string;
    badgeIcon: string;
    badgeBg: string;
    atmosphereName: string;
    accentColor: string;
  }
> = {
  "scam-detective": {
    headerGradient: "from-[#1E293B] via-[#334155] to-[#0F172A]",
    badgeLabel: "Detective HQ • Investigation Unit",
    badgeIcon: "🕵️",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    atmosphereName: "Crime Lab & Scam Dossier",
    accentColor: "border-amber-400",
  },
  "cyberbullying-heroes": {
    headerGradient: "from-[#312E81] via-[#4338CA] to-[#1E1B4B]",
    badgeLabel: "Hero Squad • Empathy Shield",
    badgeIcon: "🛡️",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    atmosphereName: "Kindness Citadel & Support Center",
    accentColor: "border-indigo-400",
  },
  "fake-or-fact": {
    headerGradient: "from-[#881337] via-[#9F1239] to-[#4C0519]",
    badgeLabel: "Newsroom Press Desk • Fact Check",
    badgeIcon: "📰",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    atmosphereName: "Investigative Newsroom Bureau",
    accentColor: "border-rose-400",
  },
  "privacy-protector": {
    headerGradient: "from-[#064E3B] via-[#047857] to-[#022C22]",
    badgeLabel: "Digital Vault • Security Terminal",
    badgeIcon: "🔐",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    atmosphereName: "High-Security Data Vault",
    accentColor: "border-emerald-400",
  },
  "safe-ai-explorer": {
    headerGradient: "from-[#0F172A] via-[#0E7490] to-[#083344]",
    badgeLabel: "Future AI Lab • Robot Safety",
    badgeIcon: "🤖",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    atmosphereName: "Cybernetic Neural Testing Facility",
    accentColor: "border-cyan-400",
  },
  "voiceguard-rescue": {
    headerGradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#172554]",
    badgeLabel: "Telecom Dispatch • Voice Analysis",
    badgeIcon: "📻",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    atmosphereName: "Audio Forensics Communications Unit",
    accentColor: "border-blue-400",
  },
  "kindness-kingdom": {
    headerGradient: "from-[#831843] via-[#BE185D] to-[#500724]",
    badgeLabel: "Kindness Realm • Social Citadel",
    badgeIcon: "💖",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    atmosphereName: "Empathy Sanctuary & Community Courtyard",
    accentColor: "border-pink-400",
  },
  "gamer-safety-quest": {
    headerGradient: "from-[#3B0764] via-[#581C87] to-[#2E1065]",
    badgeLabel: "Pixel Arcade • Inventory & Trade",
    badgeIcon: "🕹️",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    atmosphereName: "Arcade Chamber & Quest Marketplace",
    accentColor: "border-purple-400",
  },
};

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

  const theme =
    GAME_THEMES[game.slug] || {
      headerGradient: "from-clicky-navy via-clicky-navy to-clicky-navy-dark",
      badgeLabel: game.theme,
      badgeIcon: "🛡️",
      badgeBg: "bg-white/20 text-white border-white/30",
      atmosphereName: game.title,
      accentColor: "border-clicky-yellow",
    };

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
      // Partial XP for constructive effort
      setAccumulatedXp((prev) => prev + Math.round(scenario.xpReward * 0.3));
    }
  };

  const handleNext = async () => {
    playSound("click");
    // If more scenarios remain, go to next
    if (currentIndex + 1 < game.scenarios.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setShowClue(false);
    } else {
      // Game Complete!
      playSound("celebrate");
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
    playSound("click");
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

  const renderInteractiveMode = () => {
    const commonProps = {
      scenario,
      selectedOptionId,
      hasSubmitted,
      onSelectOption: handleSelectOption,
      onConfirm: handleConfirmAnswer,
    };

    switch (game.slug) {
      case "scam-detective":
        return <ClueInspectorGame {...commonProps} />;
      case "cyberbullying-heroes":
        return <ChatSimulationGame {...commonProps} />;
      case "fake-or-fact":
        return <EvidenceBoardGame {...commonProps} />;
      case "privacy-protector":
        return <PrivacyLabGame {...commonProps} />;
      case "safe-ai-explorer":
        return <AILabGame {...commonProps} />;
      case "voiceguard-rescue":
        return <VoiceRescueGame {...commonProps} />;
      case "kindness-kingdom":
        return <KindnessStoryGame {...commonProps} />;
      case "gamer-safety-quest":
        return <GamerInventoryGame {...commonProps} />;
      default:
        return null;
    }
  };

  const interactiveModeComponent = renderInteractiveMode();

  return (
    <div className="max-w-3xl mx-auto py-4 px-3 sm:px-6 space-y-4">
      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <Link
          href="/child/games"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-clicky-border text-clicky-navy text-xs font-black hover:bg-clicky-pale transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Realm</span>
        </Link>

        {/* Progress Tracker */}
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-bold text-clicky-navy mb-1">
            <span>Mission {currentIndex + 1} of {game.totalScenarios}</span>
            <span className="text-clicky-orange font-black">+{accumulatedXp} XP</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-clicky-yellow to-clicky-orange rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Themed Atmosphere Badge */}
        <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${theme.badgeBg}`}>
          <span>{theme.badgeIcon}</span>
          <span>{theme.badgeLabel.split("•")[0]}</span>
        </span>
      </div>

      {/* Main Gameplay Viewport */}
      {interactiveModeComponent ? (
        <div className="space-y-4">
          {interactiveModeComponent}

          {/* Feedback & Learning Lesson (after submit) */}
          <AnimatePresence>
            {hasSubmitted && chosenOption && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-3xl border-2 shadow-card ${
                  chosenOption.isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <Mascot
                      size="sm"
                      mood={chosenOption.isCorrect ? "cheer" : "thinking"}
                      animate={false}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 font-black text-xs uppercase">
                      {chosenOption.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">Excellent Decision! (+{scenario.xpReward} XP)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-800">Safety Lesson Learned! (+{Math.round(scenario.xpReward * 0.3)} XP)</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {chosenOption.feedback}
                    </p>

                    <div className="mt-2 pt-2 border-t border-current/20 text-xs font-bold">
                      <strong>💡 Safety Takeaway:</strong> {chosenOption.safetyLesson}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full py-3.5 rounded-2xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span>
                          {currentIndex + 1 < game.scenarios.length ? "Next Mission Scenario" : "Complete Mission Realm"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Fallback Scenario Card */
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl border-2 border-clicky-border shadow-card overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${theme.headerGradient} text-white p-5 sm:p-6 relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-wider uppercase text-clicky-yellow flex items-center gap-1.5">
                <span>{theme.badgeIcon}</span>
                <span>{game.title} • Mission #{currentIndex + 1}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[11px] border border-white/20">
                {scenario.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {scenario.title}
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
              {scenario.prompt}
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-3">
            <div className="space-y-2.5">
              {scenario.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${
                    selectedOptionId === option.id
                      ? "bg-clicky-pale border-clicky-navy"
                      : "bg-white border-clicky-border"
                  }`}
                >
                  <span className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 pt-0.5 leading-snug">{option.text}</span>
                </button>
              ))}
            </div>

            {!hasSubmitted && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleConfirmAnswer}
                  disabled={!selectedOptionId}
                  className="w-full py-3.5 rounded-2xl bg-clicky-orange text-white font-black text-sm"
                >
                  Confirm Decision
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

