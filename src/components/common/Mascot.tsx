"use client";

import React from "react";
import { motion } from "framer-motion";

export interface MascotProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  mood?: "happy" | "detective" | "warning" | "thinking" | "cheer";
  accessory?: "none" | "detective-cap" | "superhero-cape" | "cyber-goggles" | "space-helmet";
  colorTheme?: "classic-blue" | "mint-green" | "sunny-yellow" | "sunset-orange";
  className?: string;
  animate?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  size = "md",
  mood = "happy",
  accessory = "none",
  colorTheme = "classic-blue",
  className = "",
  animate = true,
}) => {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-36 h-36",
    "2xl": "w-48 h-48",
  };

  const themeColors = {
    "classic-blue": {
      outer: "#344D78",
      inner: "#EDF4FF",
      ears: "#8FC8F2",
      cheeks: "#A9DCCB",
    },
    "mint-green": {
      outer: "#25634D",
      inner: "#D8F3EB",
      ears: "#A9DCCB",
      cheeks: "#8FC8F2",
    },
    "sunny-yellow": {
      outer: "#9A7312",
      inner: "#FEF9E2",
      ears: "#F6D84A",
      cheeks: "#E9A15A",
    },
    "sunset-orange": {
      outer: "#9C4215",
      inner: "#FBE6D3",
      ears: "#E9A15A",
      cheeks: "#F6D84A",
    },
  };

  const colors = themeColors[colorTheme] || themeColors["classic-blue"];
  const activeAccessory = accessory !== "none" ? accessory : mood === "detective" ? "detective-cap" : "none";

  const getEyeExpression = () => {
    switch (mood) {
      case "detective":
        return (
          <>
            {/* Left Eye: Focused Squint */}
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
      {/* Superhero Cape Background */}
      {activeAccessory === "superhero-cape" && (
        <g>
          <path d="M 18 36 C 4 58 8 88 22 96 C 18 78 22 55 26 40 Z" fill="#E53E3E" />
          <path d="M 82 36 C 96 58 92 88 78 96 C 82 78 78 55 74 40 Z" fill="#E53E3E" />
        </g>
      )}

      {/* Friendly Shield Body */}
      <path
        d="M 50 8 C 72 8 88 18 88 42 C 88 68 50 92 50 92 C 50 92 12 68 12 42 C 12 18 28 8 50 8 Z"
        fill={colors.outer}
      />
      {/* Shield Inner Face Plate */}
      <path
        d="M 50 14 C 68 14 82 22 82 43 C 82 64 50 85 50 85 C 50 85 18 64 18 43 C 18 22 32 14 50 14 Z"
        fill={colors.inner}
      />

      {/* Antenna / Golden Star Crest */}
      <circle cx="50" cy="9" r="6" fill="#F6D84A" stroke="#25344D" strokeWidth="1.5" />
      <path
        d="M 50 4 L 51.5 7.5 L 55 8 L 52.5 10.5 L 53 14 L 50 12 L 47 14 L 47.5 10.5 L 45 8 L 48.5 7.5 Z"
        fill="#FFFFFF"
      />

      {/* Ear Discs / Radio Ears */}
      <circle cx="14" cy="42" r="5" fill={colors.ears} stroke={colors.outer} strokeWidth="2" />
      <circle cx="86" cy="42" r="5" fill={colors.ears} stroke={colors.outer} strokeWidth="2" />

      {/* Cheeks */}
      <ellipse cx="30" cy="54" rx="4" ry="2.5" fill={colors.cheeks} fillOpacity="0.8" />
      <ellipse cx="70" cy="54" rx="4" ry="2.5" fill={colors.cheeks} fillOpacity="0.8" />

      {/* Eyes & Mouth */}
      {getEyeExpression()}
      {getMouthExpression()}

      {/* Cyber Goggles Accessory */}
      {activeAccessory === "cyber-goggles" && (
        <g>
          <rect x="25" y="38" width="50" height="15" rx="5" fill="#00E5FF" fillOpacity="0.85" stroke="#00838F" strokeWidth="2" />
          <line x1="30" y1="45" x2="70" y2="45" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="20" y1="45" x2="25" y2="45" stroke="#25344D" strokeWidth="2" />
          <line x1="75" y1="45" x2="80" y2="45" stroke="#25344D" strokeWidth="2" />
        </g>
      )}

      {/* Space Helmet Visor Accessory */}
      {activeAccessory === "space-helmet" && (
        <g>
          <path
            d="M 50 10 C 74 10 90 22 90 44 C 90 68 50 90 50 90 C 50 90 10 68 10 44 C 10 22 26 10 50 10 Z"
            fill="none"
            stroke="#8FC8F2"
            strokeWidth="3.5"
            strokeDasharray="14 4"
          />
          <path d="M 28 24 Q 40 18 55 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      )}

      {/* Detective Hat Accessory */}
      {activeAccessory === "detective-cap" && (
        <g>
          <path
            d="M 24 22 Q 50 8 76 22 L 80 26 Q 50 18 20 26 Z"
            fill="#E9A15A"
            stroke="#25344D"
            strokeWidth="2"
          />
          <circle cx="50" cy="18" r="3" fill="#F6D84A" stroke="#25344D" strokeWidth="1" />
        </g>
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
