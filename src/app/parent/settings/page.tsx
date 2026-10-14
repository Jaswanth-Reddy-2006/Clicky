"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Save, CheckCircle2 } from "lucide-react";

export default function ParentSettingsPage() {
  const [parentName, setParentName] = useState("Sarah Miller");
  const [parentEmail, setParentEmail] = useState("parent@clicky.demo");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Guardian Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
          Account & Notification Settings
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Configure notifications, family security, and guardian preferences
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-2xs space-y-6">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1">
              Guardian Display Name
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold outline-none focus:border-clicky-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1">
              Contact Email Address
            </label>
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold outline-none focus:border-clicky-navy"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
              Email Notifications
            </h4>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
              <span className="text-xs font-bold text-gray-800">
                Weekly Child Learning Progress Digest
              </span>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="w-4 h-4 rounded text-clicky-navy accent-clicky-navy"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
              <span className="text-xs font-bold text-gray-800">
                Instant Notification on Significant Safety Struggles
              </span>
              <input
                type="checkbox"
                checked={safetyAlerts}
                onChange={(e) => setSafetyAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-clicky-navy accent-clicky-navy"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-clicky-navy hover:bg-clicky-navy-dark text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Guardian Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
