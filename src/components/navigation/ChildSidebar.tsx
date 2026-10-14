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
import { getLevelProgress } from "@/lib/utils";

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
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-clicky-border min-h-screen p-5 select-none shrink-0 shadow-sm">
      {/* Brand Logo */}
      <div className="pb-5 border-b border-clicky-border/60">
        <AppLogo size="md" href="/child/dashboard" />
      </div>

      {/* Child Character Level Card */}
      <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-clicky-pale to-white border border-clicky-sky/40 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-clicky-yellow/30 flex items-center justify-center font-bold text-clicky-navy text-lg shadow-sm">
              <Shield className="w-5 h-5 text-clicky-navy" />
            </div>
            <div>
              <h4 className="font-extrabold text-clicky-navy text-sm leading-tight">
                {childName}
              </h4>
              <p className="text-[11px] font-bold text-clicky-orange">
                Level {level} • {levelTitle}
              </p>
            </div>
          </div>
          {/* Streak pill */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-black shadow-xs"
            title={`${streak}-day safety learning streak!`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{streak}d</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-2">
          <div className="flex justify-between text-[11px] font-bold text-clicky-muted mb-1">
            <span>XP: {xp}</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-clicky-yellow via-clicky-orange to-clicky-mint rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-clicky-muted mt-1 text-center font-semibold">
            {progress.xpToNext > 0
              ? `${progress.xpToNext} XP to next level!`
              : "Max level reached!"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                isActive
                  ? "bg-clicky-navy text-white shadow-fun"
                  : link.highlight
                  ? "bg-clicky-yellow-pale text-clicky-navy border border-clicky-yellow/60 hover:bg-clicky-yellow/20"
                  : "text-clicky-text hover:bg-clicky-pale hover:text-clicky-navy"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-clicky-yellow"
                      : link.highlight
                      ? "text-clicky-orange"
                      : "text-clicky-muted"
                  }`}
                />
                <span>{link.label}</span>
              </div>
              {link.highlight && !isActive && (
                <span className="flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-full bg-clicky-yellow text-clicky-navy-dark uppercase">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switch to Parent / Logout */}
      <div className="pt-4 border-t border-clicky-border/60 space-y-2">
        <Link
          href="/parent/dashboard"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-clicky-pale text-clicky-navy font-bold text-xs hover:bg-clicky-sky-light transition-colors"
        >
          <span>Switch to Parent View</span>
        </Link>
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
