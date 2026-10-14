import React from "react";
import { ParentSidebar } from "@/components/navigation/ParentSidebar";
import { ParentMobileHeader } from "@/components/navigation/ParentMobileNavigation";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <DemoBanner />
      <div className="flex-1 flex flex-col md:flex-row">
        <ParentSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <ParentMobileHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
