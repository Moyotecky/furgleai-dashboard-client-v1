'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/store/hooks';

const TABS = [
  { label: 'Overview', href: '/dashboard/analytics/overview' },
  { label: 'Repositories', href: '/dashboard/analytics/repositories' },
  { label: 'AI Execution', href: '/dashboard/analytics/ai-execution' },
  { label: 'Team Performance', href: '/dashboard/analytics/team' },
  { label: 'Architecture', href: '/dashboard/analytics/architecture' },
  { label: 'Live Pipeline', href: '/dashboard/analytics/pipeline' },
  { label: 'Usage & Cost', href: '/dashboard/analytics/usage' },
];

// ── Shared top-level executive metrics (derived from redux repo state) ──────
function ExecMetrics() {
  const repos = useAppSelector((s) => s.repos.items);
  const totalRepos = repos.length;
  const totalCritical = repos.reduce((s, r) => s + (r.vulnerabilities?.critical || 0), 0);
  const totalHigh = repos.reduce((s, r) => s + (r.vulnerabilities?.high || 0), 0);
  const totalIssues = repos.reduce((s, r) => s + (r.vulnerabilities?.critical || 0) + (r.vulnerabilities?.high || 0) + (r.vulnerabilities?.medium || 0) + (r.vulnerabilities?.low || 0), 0);
  const avgScore = repos.length > 0 ? Math.round(repos.reduce((s, r) => s + r.score, 0) / repos.length) : 0;
  const activeRepos = repos.filter((r) => r.status === 'active').length;
  const passPct = totalIssues > 0 ? Math.max(0, Math.round(100 - (totalCritical * 20 + totalHigh * 8) / Math.max(1, totalIssues) * 10)) : 97;

  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col">
        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Security Score</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-zinc-900 tracking-tight">{avgScore}</span>
          <span className="text-[12px] text-zinc-500 font-medium">/ 100</span>
          <span className={`text-[11px] font-bold ml-1 ${avgScore >= 90 ? 'text-emerald-600' : avgScore >= 75 ? 'text-blue-600' : avgScore >= 55 ? 'text-amber-600' : 'text-red-600'}`}>
            {avgScore >= 90 ? 'A' : avgScore >= 80 ? 'B+' : avgScore >= 70 ? 'B' : avgScore >= 60 ? 'C+' : 'C'}
          </span>
        </div>
      </div>

      <div className="w-px h-8 bg-zinc-100" />

      <div className="flex flex-col">
        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Active Repos</span>
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] font-bold text-zinc-900 tracking-tight">{activeRepos}</span>
          <span className="text-[12px] text-zinc-500">/ {totalRepos}</span>
        </div>
      </div>

      <div className="w-px h-8 bg-zinc-100" />

      <div className="flex flex-col">
        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Open Criticals</span>
        <div className="flex items-baseline gap-1">
          <span className={`text-[20px] font-bold tracking-tight ${totalCritical > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{totalCritical}</span>
          <span className="text-[12px] text-zinc-500 font-medium">issues</span>
        </div>
      </div>

      <div className="w-px h-8 bg-zinc-100" />

      <div className="flex flex-col">
        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Posture Health</span>
        <div className="flex items-baseline gap-1">
          <span className={`text-[20px] font-bold tracking-tight ${passPct >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{passPct}%</span>
          <span className="text-[12px] text-zinc-500 font-medium">passing</span>
        </div>
      </div>

      <div className="w-px h-8 bg-zinc-100" />

      <div className="flex flex-col">
        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Total Findings</span>
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] font-bold text-zinc-900 tracking-tight">{totalIssues}</span>
          <span className="text-[12px] text-zinc-500 font-medium">open</span>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans tracking-tight">
      {/* ── Page Header ── */}
      <div className="px-8 pt-7 pb-0 border-b border-zinc-100">
        {/* Title row */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Analytics</h1>
            <p className="text-[13px] text-zinc-400 tracking-tight mt-0.5">
              AI security intelligence across your engineering organization
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-[8px] p-0.5">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1.5 rounded-[6px] text-[12px] font-semibold transition-all cursor-pointer ${
                  range === '30d'
                    ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Executive metrics row */}
        <div className="mb-5">
          <ExecMetrics />
        </div>

        {/* Tab navigation */}
        <nav className="flex items-center gap-0 -mb-px">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-4 py-2.5 text-[12.5px] font-medium tracking-tight border-b-[2px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-400 hover:text-zinc-700 hover:border-zinc-200'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
