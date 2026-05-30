'use client';

import React from 'react';

import { useAnalytics } from '@/shared/hooks/useAnalytics';
import { useEffect, useState } from 'react';

function MTTRSparkline({ data }: { data: number[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[40px] flex items-center justify-center border border-dashed border-zinc-200 rounded text-[10px] text-zinc-400">
        Waiting for API data
      </div>
    );
  }
  const W = 200; const H = 40;
  const min = Math.min(...data) * 0.9;
  const max = Math.max(...data) * 1.05;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * H * 0.85 - 2,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <path d={line} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill="#6366f1" />
    </svg>
  );
}

const STATUS_STYLES: Record<string, string> = {
  'blocked': 'text-red-600 bg-red-50 border-red-200',
  'merged': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'ai-fixed': 'text-indigo-600 bg-indigo-50 border-indigo-200',
  'in-review': 'text-amber-700 bg-amber-50 border-amber-200',
};

const RISK_STYLES: Record<string, string> = {
  'critical': 'text-red-600 bg-red-50',
  'high': 'text-orange-600 bg-orange-50',
  'medium': 'text-amber-700 bg-amber-50',
  'low': 'text-zinc-600 bg-zinc-100',
};

export function TeamAnalyticsView() {
  const { teamAnalytics, loadTeamAnalytics } = useAnalytics();
  const [mounted, setMounted] = useState(false);
  const [prData] = useState<any[]>([]); // Empty state pending API
  const [mttrTrend] = useState<number[]>([]); // Empty state pending API

  useEffect(() => {
    setMounted(true);
    loadTeamAnalytics();
  }, [loadTeamAnalytics]);

  const avgMTTR = teamAnalytics?.metrics?.averageTimeToFix?.value ? `${teamAnalytics.metrics.averageTimeToFix.value}${teamAnalytics.metrics.averageTimeToFix.unit}` : '--';
  const totalFixed = teamAnalytics?.metrics?.totalFixesApplied || 0;
  const totalIntroduced = 0; // Not available in current API
  const aiFixedPRs = prData.filter((p) => p.aiFix).length;
  const blockedPRs = prData.filter((p) => p.status === 'blocked').length;

  if (!mounted) return null;

  return (
    <div className="p-6 flex flex-col gap-5">

      {/* ── Row 1: Velocity Stats ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Avg Remediation Time', val: avgMTTR, sub: '↓ 64% vs last month', color: 'text-zinc-900', accent: 'text-emerald-600' },
          { label: 'MTTR (Critical only)', val: '0.9d', sub: '↓ 41% vs last month', color: 'text-zinc-900', accent: 'text-emerald-600' },
          { label: 'Total Fixed (30d)', val: totalFixed, sub: `${totalIntroduced} introduced`, color: 'text-zinc-900', accent: 'text-zinc-400' },
          { label: 'Reopened Issues', val: '2', sub: 'Out of 31 resolved', color: 'text-zinc-900', accent: 'text-amber-600' },
        ].map(({ label, val, sub, color, accent }) => (
          <div key={label} className="bg-white border border-zinc-100 rounded-[12px] p-5">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">{label}</span>
            <span className={`text-[28px] font-bold tracking-tight ${color}`}>{val}</span>
            <span className={`text-[11px] font-semibold ${accent} block mt-1`}>{sub}</span>
          </div>
        ))}
      </div>

      {/* ── Row 2: MTTR Trend + PR Stats ── */}
      <div className="grid grid-cols-[1fr_240px] gap-4">

        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">MTTR Trend (15 days)</span>
            <span className="text-[11px] font-semibold text-emerald-600">Consistently improving ↓</span>
          </div>
          <div className="text-[11.5px] text-zinc-400 mb-3">Mean time to remediate across all severities</div>
          <MTTRSparkline data={mttrTrend} />
          <div className="flex items-center justify-between mt-1 text-[10.5px] text-zinc-400">
            <span>-- avg</span><span>-- avg</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">PR Security Summary</span>
          {[
            { label: 'Risky PRs flagged', val: 3, color: 'text-orange-600' },
            { label: 'Blocked merges', val: blockedPRs, color: 'text-red-600' },
            { label: 'AI auto-fixed', val: aiFixedPRs, color: 'text-indigo-600' },
            { label: 'Patches accepted', val: 3, color: 'text-emerald-600' },
            { label: 'Patches rejected', val: 0, color: 'text-zinc-400' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
              <span className="text-[12px] text-zinc-600">{label}</span>
              <span className={`text-[14px] font-bold ${color}`}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 3: Team Contribution ── */}
      <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Team Contribution</h3>
            <p className="text-[11.5px] text-zinc-400 mt-0.5">Security accountability — not blame, but visibility</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_80px_80px_80px_100px] gap-4 px-5 py-2.5 bg-zinc-50 border-b border-zinc-100">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Engineer</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Introduced</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Fixed</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Criticals</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Avg MTTR</span>
        </div>
        {teamAnalytics?.topPerformers?.length ? teamAnalytics.topPerformers.map((m) => (
          <div key={m.id} className="grid grid-cols-[1fr_80px_80px_80px_100px] gap-4 px-5 py-3.5 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors">
            <div className="flex items-center gap-3">
              {m.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.avatarUrl} alt={m.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-white">{m.name.substring(0, 2).toUpperCase()}</span>
                </div>
              )}
              <div>
                <div className="text-[12.5px] font-semibold text-zinc-900">{m.name}</div>
                <div className="text-[11px] text-zinc-400">Engineer</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`text-[13px] font-bold text-zinc-400`}>--</span>
            </div>
            <div className="flex items-center">
              <span className="text-[13px] font-bold text-emerald-600">{m.fixesApplied}</span>
            </div>
            <div className="flex items-center">
              <span className={`text-[13px] font-bold text-zinc-400`}>--</span>
            </div>
            <div className="flex items-center">
              <span className="text-[12px] font-semibold text-zinc-700">{m.averageTimeToFix}</span>
            </div>
          </div>
        )) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <span className="text-[13px] font-medium text-zinc-500">No team members data available</span>
          </div>
        )}
      </div>

      {/* ── Row 4: PR Security Trends ── */}
      <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">PR Security Events</h3>
          <p className="text-[11.5px] text-zinc-400 mt-0.5">Recent pull requests flagged, blocked, or auto-patched by FurgleAI</p>
        </div>
        <div className="grid grid-cols-[60px_1fr_80px_90px_80px_60px] gap-3 px-5 py-2.5 bg-zinc-50 border-b border-zinc-100">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">PR</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Title</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repository</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Status</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Risk</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Author</span>
        </div>
        {prData.length > 0 ? prData.map((pr) => (
          <div key={`${pr.repo}-${pr.pr}`} className="grid grid-cols-[60px_1fr_80px_90px_80px_60px] gap-3 px-5 py-3.5 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors">
            <span className="text-[12px] font-mono text-zinc-500 self-center">{pr.pr}</span>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[12.5px] font-medium text-zinc-800 tracking-tight truncate">{pr.title}</span>
              {pr.aiFix && (
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-[4px] shrink-0">AI</span>
              )}
            </div>
            <span className="text-[11.5px] font-mono text-zinc-500 self-center truncate">{pr.repo}</span>
            <div className="self-center">
              <span className={`inline-flex text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] border ${STATUS_STYLES[pr.status]}`}>
                {pr.status.replace('-', ' ')}
              </span>
            </div>
            <div className="self-center">
              <span className={`inline-flex text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] ${RISK_STYLES[pr.risk]}`}>
                {pr.risk}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center self-center">
              <span className="text-[10px] font-bold text-zinc-600">{pr.author}</span>
            </div>
          </div>
        )) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <span className="text-[13px] font-medium text-zinc-500">No PR security events tracked yet</span>
            <span className="text-[11px] text-zinc-400 mt-1">Awaiting API endpoint</span>
          </div>
        )}
      </div>

    </div>
  );
}
