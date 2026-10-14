"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LineChart,
  Lightbulb,
  CheckCircle2,
  Menu,
  X,
  Link2,
} from "lucide-react";
import { AppLogo } from "../common/AppLogo";

export const ParentMobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/parent/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/parent/children", label: "My Children", icon: Users },
    { href: "/parent/progress", label: "Learning Progress", icon: LineChart },
    { href: "/parent/insights", label: "Safety Insights", icon: Lightbulb },
    { href: "/parent/recommendations", label: "Recommendations", icon: CheckCircle2 },
    { href: "/pair-child", label: "Pair a Child", icon: Link2 },
  ];

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 sticky top-8 z-40">
        <AppLogo size="sm" href="/parent/dashboard" showSubtitle={false} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/40 z-50 backdrop-blur-xs flex justify-end">
          <div className="w-64 bg-white h-full p-5 flex flex-col justify-between shadow-xl animate-in slide-in-from-right duration-200">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Parent Navigation
              </p>
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${
                      isActive
                        ? "bg-clicky-navy text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/child/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-clicky-yellow/20 text-clicky-navy-dark font-bold text-xs"
              >
                <span>Switch to Child View</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
