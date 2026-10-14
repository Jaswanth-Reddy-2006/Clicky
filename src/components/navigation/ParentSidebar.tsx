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
import { playSound } from "@/lib/utils";

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
    playSound("click");
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-[41px] h-[calc(100vh-41px)] p-4 select-none shrink-0 shadow-xs z-30 overflow-hidden">
      {/* Brand Header */}
      <div className="pb-3 border-b border-gray-100 shrink-0">
        <AppLogo size="md" href="/parent/dashboard" />
        <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-clicky-pale text-clicky-navy text-xs font-bold w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-clicky-navy" />
          <span>Parent Guardian Portal</span>
        </div>
      </div>

      {/* Parent Account Card */}
      <div className="my-3 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-clicky-navy text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            SM
          </div>
          <div className="min-w-0">
            <h5 className="font-bold text-gray-800 text-xs truncate">{parentName}</h5>
            <span className="text-[10px] text-gray-500 font-medium block truncate">Family Administrator</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1 py-1 scrollbar-thin">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => playSound("click")}
              className={`flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-colors ${
                isActive
                  ? "bg-clicky-navy text-white"
                  : link.highlight
                  ? "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-clicky-navy"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? "text-clicky-yellow"
                      : link.highlight
                      ? "text-amber-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
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

      {/* Footer - Dedicated Logout (No Switch to Child button) */}
      <div className="pt-3 border-t border-gray-100 shrink-0">
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

export default ParentSidebar;
