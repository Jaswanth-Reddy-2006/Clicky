"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Compass,
  Gamepad2,
  Bot,
  TrendingUp,
  Award,
  ShieldAlert,
  User,
  LogOut,
  Flame,
  Sparkles,
  UsersRound,
  Shield,
} from "lucide-react";
import { AppLogo } from "../common/AppLogo";
import { getLevelProgress, playSound } from "@/lib/utils";

interface ChildSidebarProps {
  childName?: string;
  level?: number;
  levelTitle?: string;
  xp?: number;
  streak?: number;
}

export const ChildSidebar: React.FC<ChildSidebarProps> = ({
  childName = "Alex",
  level = 2,
  levelTitle = "Safety Scout",
  xp = 480,
  streak = 3,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const progress = getLevelProgress(xp);

  const navLinks = [
    { href: "/child/dashboard", label: "Home", icon: Home },
    { href: "/child/adventures", label: "Adventures", icon: Compass },
    { href: "/child/games", label: "Game Arcade", icon: Gamepad2 },
    { href: "/child/friends", label: "Friends Circle", icon: UsersRound },
    { href: "/child/kindbot", label: "KindBot AI", icon: Bot, highlight: true },
    { href: "/child/progress", label: "My Progress", icon: TrendingUp },
    { href: "/child/achievements", label: "My Badges", icon: Award },
    { href: "/child/safety-toolkit", label: "Safety Toolkit", icon: ShieldAlert },
    { href: "/child/profile", label: "My Profile", icon: User },
  ];

  const handleLogout = async () => {
    playSound("click");
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-clicky-border sticky top-[41px] h-[calc(100vh-41px)] p-4 select-none shrink-0 shadow-sm z-30 overflow-hidden">
      {/* Brand Logo */}
      <div className="pb-3 border-b border-clicky-border/60 shrink-0">
        <AppLogo size="md" href="/child/dashboard" />
      </div>

      {/* Child Character Level Card - Compact & Clean */}
      <div className="my-3 p-3 rounded-2xl bg-gradient-to-br from-clicky-pale to-white border border-clicky-sky/40 shadow-xs shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-clicky-yellow/30 flex items-center justify-center font-bold text-clicky-navy shrink-0 shadow-2xs">
              <Shield className="w-4 h-4 text-clicky-navy" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-clicky-navy text-xs leading-tight truncate">
                {childName}
              </h4>
              <p className="text-[10px] font-bold text-clicky-orange truncate">
                Lvl {level} • {levelTitle}
              </p>
            </div>
          </div>
          {/* Streak pill */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[11px] font-black shrink-0"
            title={`${streak}-day safety learning streak!`}
          >
            <Flame className="w-3 h-3 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{streak}d</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-clicky-muted mb-1">
            <span>XP {xp}</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-clicky-yellow via-clicky-orange to-clicky-mint rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Links - Independently scrollable if viewport is short */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1 py-1 scrollbar-thin">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => playSound("click")}
              className={`flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-all duration-150 ${
                isActive
                  ? "bg-clicky-navy text-white shadow-fun"
                  : link.highlight
                  ? "bg-clicky-yellow-pale text-clicky-navy border border-clicky-yellow/60 hover:bg-clicky-yellow/20"
                  : "text-clicky-text hover:bg-clicky-pale hover:text-clicky-navy"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? "text-clicky-yellow"
                      : link.highlight
                      ? "text-clicky-orange"
                      : "text-clicky-muted"
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </div>
              {link.highlight && !isActive && (
                <span className="flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-clicky-yellow text-clicky-navy-dark uppercase shrink-0">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer - Dedicated Logout (No Switch to Parent button) */}
      <div className="pt-3 border-t border-clicky-border/60 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-gray-400 hover:text-red-600 font-bold text-xs hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ChildSidebar;
