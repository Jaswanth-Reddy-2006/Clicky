"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getAudioMuted, toggleAudioMute, playSound } from "@/lib/utils";

export const SoundToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMuted(getAudioMuted());
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextState = toggleAudioMute();
    setIsMuted(nextState);
    if (!nextState) {
      playSound("chime");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-xl transition-all duration-200 border ${
        isMuted
          ? "bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200"
          : "bg-clicky-pale text-clicky-navy border-clicky-sky hover:bg-clicky-sky-light"
      } ${className}`}
      title={isMuted ? "Unmute game sound effects" : "Mute game sound effects"}
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};
