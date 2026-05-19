'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom Enterprise-Grade Minimal SVGs (Linear/Vercel style)
const IconHome = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBox = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPulse = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPR = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 6h3a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="9" x2="6" y2="21" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconNetwork = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="16" y="16" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="16" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="2" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="11" x2="12" y2="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="8" x2="12" y2="21" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="12" x2="8" y2="21" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="16" x2="16" y2="21" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WORK_NAV = [
  { name: 'Vulnerabilities', href: '/dashboard/vulnerabilities', icon: IconShield },
  { name: 'Live Scans', href: '/dashboard/scans', icon: IconPulse },
  { name: 'PR Security', href: '/dashboard/prs', icon: IconPR },
];

const REPOS_NAV = [
  { name: 'backend-api', href: '/dashboard/repositories/backend-api', icon: IconBox },
  { name: 'dashboard-ui', href: '/dashboard/repositories/dashboard-ui', icon: IconBox },
  { name: 'All Repositories', href: '/dashboard/repositories', icon: IconBox },
];

const SETTINGS_NAV = [
  { name: 'Architecture', href: '/dashboard/architecture', icon: IconNetwork },
  { name: 'Analytics', href: '/dashboard/analytics', icon: IconChart },
  { name: 'Team', href: '/dashboard/team', icon: IconUsers },
  { name: 'Policies', href: '/dashboard/policies', icon: IconFile },
  { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-screen bg-[#FDFDFD] border-r border-zinc-200 flex flex-col fixed left-0 top-0 text-zinc-900 font-sans tracking-tight z-50">
      
      {/* Workspace Header */}
      <div className="h-[52px] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 p-1 -ml-1 rounded-md transition-colors active:scale-[0.98]">
          <div className="w-5 h-5 bg-black rounded flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 bg-white rounded-[2px]" />
          </div>
          <span className="text-[13px] font-semibold text-zinc-900 font-sans tracking-tight">Acme Corp</span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer active:scale-95">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-5 custom-scrollbar">
        
        {/* Home Link */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer active:scale-[0.99] tracking-tight ${
            pathname === '/dashboard' || pathname === '/dashboard/overview'
              ? 'text-zinc-950 bg-zinc-900/5' 
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
          }`}
        >
          <IconHome />
          Home
        </Link>

        {/* Your Work Section */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-2.5 mb-1 group cursor-pointer">
            <span className="text-[11px] font-medium text-zinc-400 tracking-tight">Your Work</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {WORK_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] tracking-tight ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <div className={`${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                  <item.icon />
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Repositories Section */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-2.5 mb-1 group cursor-pointer">
            <span className="text-[11px] font-medium text-zinc-400 tracking-tight">Repositories</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {REPOS_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] tracking-tight ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <div className={`${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                  <item.icon />
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Configuration Section */}
        <div className="flex flex-col gap-0.5 mt-2">
          {SETTINGS_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] tracking-tight ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <div className={`${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                  <item.icon />
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>

      </div>

      {/* User Footer */}
      <div className="p-3 shrink-0 flex flex-col gap-1">
        <div className="px-2.5 py-2 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 rounded-lg transition-colors">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-medium tracking-tight">New in the Changelog</span>
            <span className="text-[11px] text-zinc-600 font-medium tracking-tight leading-tight mt-0.5 group-hover:text-zinc-900 transition-colors">Ship faster and easier with<br/>Continuous Scanning</span>
          </div>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex items-center justify-between px-2.5 py-1.5 hover:bg-zinc-100 rounded-lg cursor-pointer transition-colors group mt-1 active:scale-[0.98]">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&q=80&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-[13px] font-medium text-zinc-700 tracking-tight group-hover:text-zinc-900">Developer</span>
          </div>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </aside>
  );
}
