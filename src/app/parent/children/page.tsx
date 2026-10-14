"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, UserPlus, Link2, ArrowRight, ShieldCheck, Star, Shield, X } from "lucide-react";
import { ChildProfile } from "@/types";

export default function ParentChildrenPage() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newAgeBand, setNewAgeBand] = useState<ChildProfile["ageBand"]>("DIGITAL_NAVIGATOR");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/children");
      const data = await res.json();
      if (data.success && data.children) {
        setChildren(data.children);
      }
    } catch (err) {
      console.error("Error fetching children:", err);
    }
  };

  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newChildName,
          ageBand: newAgeBand,
          avatar: "robot-shield",
        }),
      });
      const data = await res.json();
      if (data.success && data.child) {
        setChildren((prev) => [...prev, data.child]);
        setShowAddModal(false);
        setNewChildName("");
      }
    } catch (err) {
      console.error("Error creating child:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
            Family Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
            Linked Child Profiles
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Manage your family&apos;s explorer profiles or pair an existing account
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/pair-child"
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <Link2 className="w-4 h-4 text-gray-400" />
            <span>Pair Code Tool</span>
          </Link>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4 text-clicky-yellow" />
            <span>Create Child Profile</span>
          </button>
        </div>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {children.map((child) => (
          <div
            key={child.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-clicky-pale text-clicky-navy flex items-center justify-center font-bold shadow-xs">
                    <Shield className="w-6 h-6 text-clicky-navy" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-base leading-tight">
                      {child.name}
                    </h3>
                    <span className="text-xs font-bold text-clicky-orange">
                      Level {child.level}: {child.levelTitle}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Linked
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-gray-400 font-bold block text-[10px] uppercase">
                    XP Points
                  </span>
                  <span className="font-black text-clicky-navy text-base">
                    {child.xp}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px] uppercase">
                    Streak
                  </span>
                  <span className="font-black text-orange-600 text-base">
                    {child.currentStreak} Days
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px] uppercase">
                    Age Group
                  </span>
                  <span className="font-black text-gray-700 text-xs truncate block mt-0.5">
                    {child.ageBand === "EARLY_EXPLORER" ? "6-8" : child.ageBand === "DIGITAL_NAVIGATOR" ? "9-11" : "12-14"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-semibold">
                Last active: Today
              </span>
              <Link
                href={`/parent/children/${child.id}`}
                className="text-xs font-bold text-clicky-navy hover:text-clicky-orange flex items-center gap-1"
              >
                <span>View Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Child Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-900 text-lg">
                Create Managed Child Profile
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Create a child profile directly from your parent account without needing a separate email address.
            </p>

            <form onSubmit={handleCreateChild} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1">
                  Child Nickname or First Name
                </label>
                <input
                  type="text"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="e.g. Maya"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold outline-none focus:border-clicky-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1">
                  Age Band
                </label>
                <select
                  value={newAgeBand}
                  onChange={(e) => setNewAgeBand(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold outline-none"
                >
                  <option value="EARLY_EXPLORER">Early Explorer (Ages 6 - 8)</option>
                  <option value="DIGITAL_NAVIGATOR">Digital Navigator (Ages 9 - 11)</option>
                  <option value="CYBER_HERO">Cyber Hero (Ages 12 - 14)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 font-bold text-xs hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-clicky-navy text-white font-bold text-xs hover:bg-clicky-navy-dark shadow-xs"
                >
                  {isSubmitting ? "Creating..." : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
