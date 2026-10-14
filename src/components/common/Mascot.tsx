"use client";

import React from "react";
import { motion } from "framer-motion";

interface MascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: "happy" | "detective" | "warning" | "thinking" | "cheer";
  className?: string;
  animate?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  size = "md",
  mood = "happy",
  className = "",
  animate = true,
}) => {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-36 h-36",
  };

  const getEyeExpression = () => {
    switch (mood) {
      case "detective":
        return (
          <>
            {/* Left Eye: Squinting slightly */}
            <circle cx="38" cy="46" r="5" fill="#25344D" />
            <circle cx="40" cy="44" r="2" fill="#FFFFFF" />
            {/* Right Eye: Magnifying Glass Monocle */}
            <circle cx="62" cy="46" r="9" fill="none" stroke="#F6D84A" strokeWidth="3" />
            <circle cx="62" cy="46" r="6" fill="#8FC8F2" fillOpacity="0.5" />
            <line x1="68" y1="52" x2="76" y2="60" stroke="#F6D84A" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "warning":
        return (
          <>
            {/* Wide Alert Eyes */}
            <circle cx="38" cy="46" r="6" fill="#25344D" />
            <circle cx="40" cy="44" r="2.5" fill="#FFFFFF" />
            <circle cx="62" cy="46" r="6" fill="#25344D" />
            <circle cx="64" cy="44" r="2.5" fill="#FFFFFF" />
            {/* Eyebrows angled */}
            <line x1="33" y1="38" x2="43" y2="40" stroke="#25344D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="67" y1="38" x2="57" y2="40" stroke="#25344D" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "thinking":
        return (
          <>
            <circle cx="38" cy="43" r="5" fill="#25344D" />
            <circle cx="40" cy="41" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="43" r="5" fill="#25344D" />
            <circle cx="64" cy="41" r="2" fill="#FFFFFF" />
            {/* Raised eyebrow */}
            <line x1="33" y1="36" x2="43" y2="34" stroke="#25344D" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "cheer":
        return (
          <>
            {/* Happy Curved Cheerful Eyes ^ ^ */}
            <path d="M 33 48 Q 38 40 43 48" fill="none" stroke="#25344D" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 57 48 Q 62 40 67 48" fill="none" stroke="#25344D" strokeWidth="3.5" strokeLinecap="round" />
          </>
        );
      case "happy":
      default:
        return (
          <>
            <circle cx="38" cy="46" r="5.5" fill="#25344D" />
            <circle cx="40" cy="44" r="2" fill="#FFFFFF" />
            <circle cx="62" cy="46" r="5.5" fill="#25344D" />
            <circle cx="64" cy="44" r="2" fill="#FFFFFF" />
          </>
        );
    }
  };

  const getMouthExpression = () => {
    switch (mood) {
      case "warning":
        return <path d="M 44 60 Q 50 56 56 60" fill="none" stroke="#25344D" strokeWidth="2.5" strokeLinecap="round" />;
      case "thinking":
        return <line x1="45" y1="59" x2="55" y2="58" stroke="#25344D" strokeWidth="2.5" strokeLinecap="round" />;
      case "cheer":
        return (
          <path
            d="M 40 56 Q 50 68 60 56 Z"
            fill="#E9A15A"
            stroke="#25344D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        );
      default:
        return <path d="M 42 56 Q 50 64 58 56" fill="none" stroke="#25344D" strokeWidth="3" strokeLinecap="round" />;
    }
  };

  const content = (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Friendly Shield Body */}
      <path
        d="M 50 8 C 72 8 88 18 88 42 C 88 68 50 92 50 92 C 50 92 12 68 12 42 C 12 18 28 8 50 8 Z"
        fill="#344D78"
      />
      {/* Shield Inner Face Plate */}
      <path
        d="M 50 14 C 68 14 82 22 82 43 C 82 64 50 85 50 85 C 50 85 18 64 18 43 C 18 22 32 14 50 14 Z"
        fill="#EDF4FF"
      />
      {/* Antenna / Golden Star Crest */}
      <circle cx="50" cy="9" r="6" fill="#F6D84A" stroke="#25344D" strokeWidth="1.5" />
      <path
        d="M 50 4 L 51.5 7.5 L 55 8 L 52.5 10.5 L 53 14 L 50 12 L 47 14 L 47.5 10.5 L 45 8 L 48.5 7.5 Z"
        fill="#FFFFFF"
      />
      {/* Ear Discs / Radio Ears */}
      <circle cx="14" cy="42" r="5" fill="#8FC8F2" stroke="#344D78" strokeWidth="2" />
      <circle cx="86" cy="42" r="5" fill="#8FC8F2" stroke="#344D78" strokeWidth="2" />

      {/* Cheeks */}
      <ellipse cx="30" cy="54" rx="4" ry="2.5" fill="#A9DCCB" fillOpacity="0.8" />
      <ellipse cx="70" cy="54" rx="4" ry="2.5" fill="#A9DCCB" fillOpacity="0.8" />

      {/* Eyes & Mouth */}
      {getEyeExpression()}
      {getMouthExpression()}

      {/* Detective Hat or Sparkles if applicable */}
      {mood === "detective" && (
        <path
          d="M 28 20 Q 50 8 72 20 L 76 24 Q 50 18 24 24 Z"
          fill="#E9A15A"
          stroke="#25344D"
          strokeWidth="2"
        />
      )}
    </svg>
  );

  if (!animate) return content;

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {content}
    </motion.div>
  );
};
