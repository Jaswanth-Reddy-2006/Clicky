import React from "react";
import { ChildSidebar } from "@/components/navigation/ChildSidebar";
import { ChildMobileHeader, ChildMobileNavigation } from "@/components/navigation/ChildMobileNavigation";
import { DemoBanner } from "@/components/common/DemoBanner";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-clicky-bg flex flex-col font-sans">
      <DemoBanner />
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <ChildSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <ChildMobileHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <ChildMobileNavigation />
        </div>
      </div>
    </div>
  );
}
