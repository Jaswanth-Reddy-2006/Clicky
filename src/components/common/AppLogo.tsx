"use client";

import React from "react";
import Link from "next/link";
import { Mascot } from "./Mascot";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showSubtitle?: boolean;
  theme?: "light" | "dark";
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = "md",
  href = "/",
  showSubtitle = true,
  theme = "light",
}) => {
  const mascotSizes = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const isDark = theme === "dark";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 group transition-transform active:scale-95 select-none"
    >
      <Mascot size={mascotSizes[size]} mood="happy" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight ${textSizes[size]} ${
              isDark ? "text-white" : "text-clicky-navy"
            } group-hover:text-clicky-orange transition-colors`}
          >
            Clicky
          </span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-clicky-yellow animate-pulse" />
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] tracking-wider uppercase font-extrabold ${
              isDark ? "text-clicky-sky" : "text-clicky-muted"
            }`}
          >
            Digital Safety Adventure
          </span>
        )}
      </div>
    </Link>
  );
};
