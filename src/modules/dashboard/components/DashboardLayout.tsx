'use client';

import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white text-zinc-900 font-sans overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col pl-[240px] h-screen overflow-hidden">
        {/* We can place a generic header here, but the image shows the header integrated into the page view, 
            so we will let the individual pages handle their top bar or inject it here. */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
