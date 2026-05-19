'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShieldAlert, 
  Box, 
  Activity, 
  GitPullRequest, 
  Network, 
  BarChart2, 
  Users, 
  FileCheck, 
  Settings,
  Search,
  MessageSquare,
  AtSign
} from 'lucide-react';

const WORK_NAV = [
  { name: 'Vulnerabilities', href: '/dashboard/vulnerabilities', icon: ShieldAlert },
  { name: 'Live Scans', href: '/dashboard/scans', icon: Activity },
  { name: 'PR Security', href: '/dashboard/prs', icon: GitPullRequest },
];

const REPOS_NAV = [
  { name: 'backend-api', href: '/dashboard/repositories/backend-api', icon: Box },
  { name: 'dashboard-ui', href: '/dashboard/repositories/dashboard-ui', icon: Box },
  { name: 'All Repositories', href: '/dashboard/repositories', icon: Box },
];

const SETTINGS_NAV = [
  { name: 'Architecture', href: '/dashboard/architecture', icon: Network },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Policies', href: '/dashboard/policies', icon: FileCheck },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-screen bg-[#FDFDFD] border-r border-zinc-200 flex flex-col fixed left-0 top-0 text-zinc-900 font-sans z-50">
      
      {/* Workspace Header */}
      <div className="h-[52px] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 p-1 -ml-1 rounded-md transition-colors active:scale-[0.98]">
          <div className="w-5 h-5 bg-black rounded flex items-center justify-center shadow-sm">
            <div className="w-2.5 h-2.5 border-2 border-white rounded-sm" />
          </div>
          <span className="text-[13px] font-semibold text-zinc-900 font-sans">Acme Corp</span>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer active:scale-95">
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-5 custom-scrollbar">
        
        {/* Home Link */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer active:scale-[0.99] ${
            pathname === '/dashboard' || pathname === '/dashboard/overview'
              ? 'text-zinc-950 bg-zinc-900/5' 
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
          }`}
        >
          <Home className="w-4 h-4 shrink-0" strokeWidth={2} />
          Home
        </Link>

        {/* Your Work Section */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-2.5 mb-1 group cursor-pointer">
            <span className="text-[11px] font-medium text-zinc-400">Your Work</span>
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
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`} strokeWidth={1.5} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Repositories Section */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-2.5 mb-1 group cursor-pointer">
            <span className="text-[11px] font-medium text-zinc-400">Repositories</span>
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
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                {/* Custom Box Icon for Repositories */}
                <div className={`w-4 h-4 shrink-0 flex items-center justify-center ${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
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
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors group cursor-pointer active:scale-[0.99] ${
                  isActive ? 'text-zinc-950 bg-zinc-900/5' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                }`}
              >
                <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}`} strokeWidth={1.5} />
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
            <span className="text-[10px] text-zinc-400 font-medium">New in the Changelog</span>
            <span className="text-[11px] text-zinc-600 font-medium leading-tight mt-0.5 group-hover:text-zinc-900 transition-colors">Ship faster and easier with<br/>Continuous Scanning</span>
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
            <span className="text-[13px] font-medium text-zinc-700 group-hover:text-zinc-900">Developer</span>
          </div>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </aside>
  );
}
