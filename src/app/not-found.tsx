import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Mascot } from "@/components/common/Mascot";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-clicky-bg flex items-center justify-center p-4 font-sans text-center">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-clicky-border shadow-card space-y-4">
        <Mascot size="lg" mood="thinking" />
        <span className="inline-block px-3 py-1 rounded-full bg-clicky-pale text-clicky-navy text-xs font-black uppercase tracking-wider">
          Lost in Cyberspace
        </span>
        <h1 className="text-3xl font-black text-clicky-navy">
          404 - Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-clicky-muted font-bold leading-relaxed">
          Looks like this digital path took a wrong turn! Don&apos;t worry, even top cyber detectives encounter mysterious dead ends.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-clicky-navy text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/child/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-clicky-orange text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Child Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
