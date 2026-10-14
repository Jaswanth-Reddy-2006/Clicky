"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Gamepad2, Bot, Award } from "lucide-react";
import { AppLogo } from "../common/AppLogo";
import { SoundToggle } from "../common/SoundToggle";

export const ChildMobileHeader: React.FC<{ xp?: number }> = ({ xp = 480 }) => {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-clicky-border sticky top-8 z-40 shadow-xs">
      <AppLogo size="sm" href="/child/dashboard" showSubtitle={false} />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-clicky-yellow/20 border border-clicky-yellow/50 text-clicky-navy-dark text-xs font-black">
          <span>⭐</span>
          <span>{xp} XP</span>
        </div>
        <SoundToggle className="!p-1.5" />
      </div>
    </header>
  );
};

export const ChildMobileNavigation: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: "/child/dashboard", label: "Home", icon: Home },
    { href: "/child/adventures", label: "Quests", icon: Compass },
    { href: "/child/games", label: "Arcade", icon: Gamepad2 },
    { href: "/child/kindbot", label: "KindBot", icon: Bot, isCenter: true },
    { href: "/child/achievements", label: "Badges", icon: Award },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-clicky-border/80 px-2 py-1.5 z-40 shadow-lg flex items-center justify-around">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        if (link.isCenter) {
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center -mt-6 group"
            >
              <div
                className={`w-13 h-13 p-3 rounded-2xl flex items-center justify-center shadow-md transition-all duration-200 ${
                  isActive
                    ? "bg-clicky-orange text-white ring-4 ring-orange-200 scale-105"
                    : "bg-clicky-yellow text-clicky-navy ring-4 ring-yellow-100 hover:scale-105"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-clicky-navy mt-0.5">
                {link.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive
                ? "text-clicky-navy font-black"
                : "text-clicky-muted font-bold hover:text-clicky-navy"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isActive ? "text-clicky-navy stroke-[2.5]" : "text-clicky-muted"
              }`}
            />
            <span className="text-[11px] leading-tight mt-0.5">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
