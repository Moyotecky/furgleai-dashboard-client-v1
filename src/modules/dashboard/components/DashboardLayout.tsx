'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-zinc-900 font-sans overflow-hidden relative">
      {/* Mobile backdrop dimming overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-zinc-950/30 backdrop-blur-[1px] z-40 lg:hidden"
        />
      )}

      {/* Sidebar - translates off-screen on mobile, stays static/visible on lg screens */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out shrink-0 w-[260px] h-screen`}>
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-0 lg:pl-[260px] h-screen overflow-hidden">
        {/* Mobile Header Top Bar (only visible on mobile screens) */}
        <header className="h-[52px] border-b border-zinc-200 flex items-center justify-between px-4 bg-white z-30 lg:hidden shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 -ml-1 text-zinc-500 hover:text-zinc-900 transition-colors rounded-md hover:bg-zinc-100 active:scale-95 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-black rounded flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-white rounded-[2px]" />
              </div>
              <span className="text-[13px] font-semibold text-zinc-900 tracking-tight">Acme Corp</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="text-[12px] text-zinc-500 tracking-tight">2 online</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
