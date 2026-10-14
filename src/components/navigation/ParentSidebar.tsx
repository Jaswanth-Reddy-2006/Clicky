"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LineChart,
  Lightbulb,
  CheckCircle2,
  Settings,
  Link2,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { AppLogo } from "../common/AppLogo";

interface ParentSidebarProps {
  parentName?: string;
  linkedChildrenCount?: number;
}

export const ParentSidebar: React.FC<ParentSidebarProps> = ({
  parentName = "Sarah Miller",
  linkedChildrenCount = 1,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/parent/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/parent/children", label: "My Children", icon: Users, badge: `${linkedChildrenCount}` },
    { href: "/parent/progress", label: "Learning Progress", icon: LineChart },
    { href: "/parent/insights", label: "Safety Insights", icon: Lightbulb },
    { href: "/parent/recommendations", label: "Recommendations", icon: CheckCircle2 },
    { href: "/pair-child", label: "Pair a Child", icon: Link2, highlight: true },
    { href: "/parent/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen p-5 shrink-0 select-none shadow-xs">
      {/* Brand Header */}
      <div className="pb-5 border-b border-gray-100">
        <AppLogo size="md" href="/parent/dashboard" />
        <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-clicky-pale text-clicky-navy text-xs font-bold w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-clicky-navy" />
          <span>Parent Guardian Portal</span>
        </div>
      </div>

      {/* Parent Account Card */}
      <div className="my-4 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-clicky-navy text-white flex items-center justify-center font-bold text-xs shadow-xs">
            SM
          </div>
          <div className="overflow-hidden">
            <h5 className="font-bold text-gray-800 text-xs truncate">{parentName}</h5>
            <span className="text-[10px] text-gray-500 font-medium">Family Administrator</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                isActive
                  ? "bg-clicky-navy text-white"
                  : link.highlight
                  ? "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-clicky-navy"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-clicky-yellow"
                      : link.highlight
                      ? "text-amber-600"
                      : "text-gray-400"
                  }`}
                />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switch to Child / Logout */}
      <div className="pt-4 border-t border-gray-100 space-y-2">
        <Link
          href="/child/dashboard"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-clicky-yellow/20 text-clicky-navy-dark font-bold text-xs hover:bg-clicky-yellow/30 transition-colors border border-clicky-yellow/40"
        >
          <span>Open Child Adventure View</span>
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
