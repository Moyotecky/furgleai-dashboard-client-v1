'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import {
  DashboardSquare01Icon,
  ShieldEnergyIcon,
  Analytics01Icon,
  WorkflowCircle01Icon,
  Settings01Icon,
} from 'hugeicons-react';
import { useAppSelector } from '@/shared/store/hooks';

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13.5px] cursor-pointer active:scale-[0.99] tracking-tight group transition-all ${isActive
        ? 'font-semibold text-zinc-950'
        : 'font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/70'
        }`}
    >
      <span
        className={`shrink-0 transition-colors ${isActive ? 'text-zinc-900 font-bold' : 'text-zinc-400 group-hover:text-zinc-600'
          }`}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const repositories = useAppSelector((state) => state.repos.items);

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-zinc-200/80 flex flex-col fixed left-0 top-0 text-zinc-900 font-sans tracking-tight z-50 select-none">

      {/* Workspace / Org Header */}
      <div className="h-[52px] px-3.5 flex items-center justify-between shrink-0 border-b border-zinc-100">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 px-1.5 py-1 -ml-1.5 rounded-md transition-colors active:scale-[0.98]">
          <div className="w-[22px] h-[22px] bg-zinc-900 rounded-[5px] flex items-center justify-center shadow-sm">
            <div className="w-[9px] h-[9px] bg-white rounded-[2px]" />
          </div>
          <span className="text-[13px] font-semibold text-zinc-900 tracking-tight">Acme Corp</span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-400 mt-px shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        <button className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer active:scale-95" aria-label="Search">
          <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7.5" strokeLinecap="round" />
            <line x1="20.5" y1="20.5" x2="16" y2="16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto py-2.5 px-2.5 pt-10 flex flex-col gap-0.5 custom-scrollbar">

        {/* Overview */}
        <NavItem
          href="/dashboard"
          label="Overview"
          isActive={pathname === '/dashboard' || pathname === '/dashboard/overview'}
          icon={<DashboardSquare01Icon size={17} strokeWidth={1.8} />}
        />

        {/* Vulnerabilities */}
        <NavItem
          href="/dashboard/vulnerabilities"
          label="Vulnerabilities"
          isActive={pathname === '/dashboard/vulnerabilities'}
          icon={<ShieldEnergyIcon size={17} strokeWidth={1.8} />}
        />

        <div className="h-px bg-zinc-200/70 mx-2 my-3" />


        {/* ── Repositories Section ── */}
        <div className="mt-3 mb-1 px-2.5">
          <span className="text-[13px] font-semibold tracking-tighter text-zinc-400">
            Repositories
          </span>
        </div>


        {/* Repo list — each item has the GitHub logo */}
        {repositories.map((repo) => {
          const href = `/dashboard/repositories/${repo.slug}`;
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={repo.slug}
              href={href}
              className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13.5px] cursor-pointer active:scale-[0.99] tracking-tight group transition-all ${isActive
                ? 'font-semibold text-zinc-950 bg-zinc-100/40'
                : 'font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/70'
                }`}
            >
              <FaGithub
                className={`w-[17px] h-[17px] shrink-0 transition-colors ${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'
                  }`}
              />
              <span className="truncate flex-1">{repo.name}</span>
              {repo.status === 'scanning' && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" title="Scanning..." />
              )}
              {repo.status === 'error' && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" title="Has errors" />
              )}
            </Link>
          );
        })}

        {/* View all → link */}
        <Link
          href="/dashboard/repositories"
          className={`flex items-center gap-1.5 px-2.5 py-[6px] rounded-[6px] text-[12px] font-medium transition-all cursor-pointer tracking-tight group ${pathname === '/dashboard/repositories'
            ? 'text-zinc-600'
            : 'text-zinc-400 hover:text-zinc-600'
            }`}
        >
          View all
          <svg viewBox="0 0 24 24" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <div className="h-px bg-zinc-200/70 mx-2 my-3" />

        {/* Analytics */}
        <NavItem
          href="/dashboard/analytics"
          label="Analytics"
          isActive={pathname === '/dashboard/analytics'}
          icon={<Analytics01Icon size={17} strokeWidth={1.8} />}
        />

        {/* Workflows */}
        <NavItem
          href="/dashboard/workflows"
          label="Workflows"
          isActive={pathname === '/dashboard/workflows'}
          icon={<WorkflowCircle01Icon size={17} strokeWidth={1.8} />}
        />
      </div>


      {/* Changelog banner */}
      <div className="mx-2.5 mb-2 px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-[8px] flex items-center justify-between group cursor-pointer hover:bg-zinc-100/50 transition-colors">
        <div className="flex flex-col">
          <span className="text-[9.5px] text-zinc-400 font-bold uppercase tracking-wider">New in Changelog</span>
          <span className="text-[11px] text-zinc-600 font-semibold leading-tight mt-0.5 group-hover:text-zinc-900 transition-colors">Ship faster and easier with<br />Continuous Scanning</span>
        </div>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-650 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom fixed area */}
      <div className="shrink-0 border-t border-zinc-100 bg-white pt-2.5">


        {/* Settings */}
        <div className="px-2.5 pb-1">
          <NavItem
            href="/dashboard/settings"
            label="Settings"
            isActive={pathname === '/dashboard/settings'}
            icon={<Settings01Icon size={17} strokeWidth={1.8} />}
          />
        </div>

        {/* User row */}
        <div className="px-2.5 pb-3">
          <div className="flex items-center justify-between px-2.5 py-2 hover:bg-zinc-100/80 rounded-[6px] cursor-pointer transition-colors group active:scale-[0.98]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&q=80&fit=crop"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-medium text-zinc-700 tracking-tight leading-tight group-hover:text-zinc-900 transition-colors">Developer</span>
                <span className="text-[11px] text-zinc-400 tracking-tight leading-tight">admin</span>
              </div>
            </div>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
