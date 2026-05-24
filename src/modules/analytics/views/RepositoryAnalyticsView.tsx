'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { FaGithub } from 'react-icons/fa';

// ── Trend Arrow ────────────────────────────────────────────────────────────
function TrendArrow({ direction }: { direction: 'up' | 'down' | 'stable' }) {
  if (direction === 'up') return (
    <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600">
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Improving
    </span>
  );
  if (direction === 'down') return (
    <span className="flex items-center gap-0.5 text-[11px] font-bold text-red-500">
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Degrading
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[11px] font-bold text-zinc-400">
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" strokeLinecap="round"/></svg>
      Stable
    </span>
  );
}

// ── Mini Score Bar ─────────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-blue-500' : score >= 55 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[12px] font-bold text-zinc-900 w-6 text-right">{score}</span>
    </div>
  );
}

// ── Heatmap: repos × severity ──────────────────────────────────────────────
const SEVERITY_LEVELS = ['Critical', 'High', 'Medium', 'Low'];

function HeatmapCell({ value, max }: { value: number; max: number }) {
  if (value === 0) return <div className="w-full h-10 bg-zinc-50 border border-zinc-100 rounded-[5px] flex items-center justify-center"><span className="text-[10px] text-zinc-300">—</span></div>;
  const intensity = Math.min(1, value / Math.max(max, 1));
  const bg = intensity > 0.7 ? 'bg-red-600' : intensity > 0.4 ? 'bg-red-400' : intensity > 0.2 ? 'bg-orange-300' : 'bg-orange-100';
  const textColor = intensity > 0.4 ? 'text-white' : 'text-orange-800';
  return (
    <div className={`w-full h-10 ${bg} rounded-[5px] flex items-center justify-center`}>
      <span className={`text-[12px] font-bold ${textColor}`}>{value}</span>
    </div>
  );
}

// ── Scan frequency sparkline (SVG) ─────────────────────────────────────────
const SCAN_DATA = [3, 5, 4, 6, 5, 7, 6, 8, 6, 7, 5, 8, 9, 7, 8];

function ScanSparkline() {
  const W = 120; const H = 32;
  const max = Math.max(...SCAN_DATA);
  const pts = SCAN_DATA.map((v, i) => ({
    x: (i / (SCAN_DATA.length - 1)) * W,
    y: H - (v / max) * H * 0.9 - 2,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <path d={line} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill="#6366f1" />
    </svg>
  );
}

// ── Mock trend directions per repo ─────────────────────────────────────────
const REPO_TRENDS: Record<string, 'up' | 'down' | 'stable'> = {
  'payments-api': 'up',
  'auth-service': 'up',
  'infra-core': 'down',
};

export function RepositoryAnalyticsView() {
  const repos = useAppSelector((s) => s.repos.items);
  const [sortBy, setSortBy] = useState<'score' | 'critical' | 'name'>('critical');

  const sorted = [...repos].sort((a, b) => {
    if (sortBy === 'score') return a.score - b.score;
    if (sortBy === 'critical') return b.critical - a.critical;
    return a.name.localeCompare(b.name);
  });

  const maxCritical = Math.max(...repos.map((r) => r.critical), 1);
  const maxHigh = Math.max(...repos.map((r) => r.high), 1);
  const maxMedium = Math.max(...repos.map((r) => r.medium), 1);
  const maxLow = Math.max(...repos.map((r) => r.low), 1);

  return (
    <div className="p-6 flex flex-col gap-5">

      {/* ── Row 1: Risk Ranking + Scan Stats ── */}
      <div className="grid grid-cols-[1fr_280px] gap-4">

        {/* Repository Risk Ranking */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Repository Risk Ranking</h3>
              <p className="text-[11.5px] text-zinc-400 mt-0.5">Ordered by security risk exposure</p>
            </div>
            <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-100 rounded-[7px] p-0.5">
              {(['critical', 'score', 'name'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-2.5 py-1 rounded-[5px] text-[11px] font-semibold transition-all cursor-pointer capitalize ${sortBy === s ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  {s === 'critical' ? 'Risk' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_160px_120px_100px_100px] gap-3 px-5 py-2.5 bg-zinc-50 border-b border-zinc-100">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repository</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Risk Score</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Criticals</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Total Issues</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Trend</span>
          </div>

          {sorted.map((repo, i) => {
            const trend = REPO_TRENDS[repo.slug] ?? 'stable';
            const totalIssues = repo.critical + repo.high + repo.medium + repo.low;
            return (
              <div
                key={repo.slug}
                className="grid grid-cols-[1fr_160px_120px_100px_100px] gap-3 px-5 py-4 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors"
              >
                {/* Repo name + rank */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-bold text-zinc-300 w-4 shrink-0">#{i + 1}</span>
                  <div className="w-7 h-7 rounded-[7px] bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <FaGithub className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-zinc-900 tracking-tight truncate">{repo.name}</div>
                    <div className="text-[10.5px] text-zinc-400">{repo.isPrivate ? 'Private' : 'Public'} · {repo.branch}</div>
                  </div>
                </div>

                {/* Score bar */}
                <div className="flex items-center">
                  <div className="w-full">
                    <ScoreBar score={repo.score} />
                  </div>
                </div>

                {/* Criticals */}
                <div className="flex items-center">
                  {repo.critical > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-[6px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {repo.critical}
                    </span>
                  ) : (
                    <span className="text-[12px] font-semibold text-emerald-600">None</span>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center">
                  <span className="text-[13px] font-semibold text-zinc-700">{totalIssues}</span>
                </div>

                {/* Trend */}
                <div className="flex items-center">
                  <TrendArrow direction={trend} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scan Stats Card */}
        <div className="flex flex-col gap-4">

          <div className="bg-white border border-zinc-100 rounded-[12px] p-5 flex-1">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-3">Scan Frequency (15d)</span>
            <ScanSparkline />
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-50">
              {[
                { label: 'Scans / day', val: '6.8' },
                { label: 'Success rate', val: '94%' },
                { label: 'Avg duration', val: '2.4m' },
                { label: 'Auto-fixed PRs', val: '14' },
              ].map(({ label, val }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[16px] font-bold text-zinc-900 tracking-tight">{val}</span>
                  <span className="text-[10.5px] text-zinc-400 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-3">AI Fix Adoption</span>
            {[
              { label: 'Patches generated', val: 22, pct: 100 },
              { label: 'PRs auto-merged', val: 14, pct: 64 },
              { label: 'Human-reviewed', val: 6, pct: 27 },
              { label: 'Rejected', val: 2, pct: 9 },
            ].map(({ label, val, pct }) => (
              <div key={label} className="flex items-center gap-3 mb-2.5 last:mb-0">
                <span className="text-[11.5px] text-zinc-500 w-32 shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] font-bold text-zinc-700 w-5 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Vulnerability Heatmap ── */}
      <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Vulnerability Heatmap</h3>
          <p className="text-[11.5px] text-zinc-400 mt-0.5">Finding density by repository and severity — darker cells indicate higher concentration</p>
        </div>
        <div className="p-5">
          {/* Column headers */}
          <div
            className="grid gap-3 mb-2"
            style={{ gridTemplateColumns: `160px repeat(${repos.length}, 1fr)` }}
          >
            <div />
            {repos.map((r) => (
              <div key={r.slug} className="text-center">
                <span className="text-[10.5px] font-semibold text-zinc-500 tracking-tight">{r.name}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {SEVERITY_LEVELS.map((sev) => {
            const key = sev.toLowerCase() as 'critical' | 'high' | 'medium' | 'low';
            const maxVal = { critical: maxCritical, high: maxHigh, medium: maxMedium, low: maxLow }[key];
            return (
              <div
                key={sev}
                className="grid gap-3 mb-2"
                style={{ gridTemplateColumns: `160px repeat(${repos.length}, 1fr)` }}
              >
                <div className="flex items-center">
                  <span className="text-[12px] font-semibold text-zinc-500 capitalize">{sev}</span>
                </div>
                {repos.map((r) => (
                  <HeatmapCell key={r.slug} value={r[key]} max={maxVal} />
                ))}
              </div>
            );
          })}
        </div>

        {/* Heatmap legend */}
        <div className="px-5 pb-4 flex items-center gap-2">
          <span className="text-[10.5px] text-zinc-400 font-medium">Low density</span>
          {['bg-orange-100', 'bg-orange-300', 'bg-red-400', 'bg-red-600'].map((c, i) => (
            <div key={i} className={`w-6 h-3 rounded-[2px] ${c}`} />
          ))}
          <span className="text-[10.5px] text-zinc-400 font-medium">High density</span>
        </div>
      </div>

    </div>
  );
}
