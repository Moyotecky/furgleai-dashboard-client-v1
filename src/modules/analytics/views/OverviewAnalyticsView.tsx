'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/shared/store/hooks';

// ── Risk Trend Line Chart (SVG) ────────────────────────────────────────────
const TREND_DATA = {
  '7d': [82, 79, 81, 78, 76, 80, 82],
  '30d': [90, 87, 85, 83, 80, 79, 78, 77, 79, 80, 81, 79, 78, 76, 75, 78, 80, 82, 81, 80, 79, 81, 83, 82, 80, 81, 82, 83, 81, 82],
  '90d': [95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 84, 83, 82, 82, 81, 81, 80, 80, 79, 79, 78, 79, 80, 80, 81, 81, 82, 82, 82, 81, 80, 80, 80, 80, 79, 79, 80, 80, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
};

const DATE_LABELS = {
  '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '30d': ['Apr 25', '', '', '', 'Apr 29', '', '', '', 'May 3', '', '', '', 'May 7', '', '', '', 'May 11', '', '', '', 'May 15', '', '', '', 'May 19', '', '', '', 'May 23', '', 'May 24'],
  '90d': ['Feb 24', '', '', '', '', '', '', '', '', '', '', '', '', 'Mar 9', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Mar 23', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Apr 6', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Apr 20', '', '', '', '', '', '', '', '', '', '', '', '', '', 'May 4', '', '', '', '', '', '', '', '', '', '', '', '', '', 'May 18', '', '', '', '', '', '', '', '', 'May 24'],
};

function RiskTrendChart({ period }: { period: '7d' | '30d' | '90d' }) {
  const data = TREND_DATA[period];
  const W = 480;
  const H = 88;
  const PAD = { t: 8, r: 8, b: 24, l: 28 };
  const w = W - PAD.l - PAD.r;
  const h = H - PAD.t - PAD.b;
  const minV = Math.min(...data) - 4;
  const maxV = Math.max(...data) + 4;

  const pts = data.map((v, i) => ({
    x: PAD.l + (i / (data.length - 1)) * w,
    y: PAD.t + (1 - (v - minV) / (maxV - minV)) * h,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(PAD.t + h).toFixed(1)} L ${PAD.l.toFixed(1)} ${(PAD.t + h).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Y-axis gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.t + t * h;
        const val = Math.round(maxV - t * (maxV - minV));
        return (
          <g key={t}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#f4f4f5" strokeWidth="1" />
            <text x={PAD.l - 4} y={y + 3.5} textAnchor="end" fontSize="8" fill="#a1a1aa" fontFamily="sans-serif">{val}</text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#trendGrad)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last point dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill="#6366f1" />
    </svg>
  );
}

// ── Density Block Chart (like the reference image squares) ─────────────────
function DensityBlocks({ total, filled, color }: { total: number; filled: number; color: string }) {
  return (
    <div className="flex flex-wrap gap-[3px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-[2px] ${i < filled ? color : 'bg-zinc-100'}`}
        />
      ))}
    </div>
  );
}

// ── AI Risk Exposure sources ───────────────────────────────────────────────
const AI_RISK_ITEMS = [
  { label: 'SQL Injection via AI completion', severity: 'critical', aiPct: 78, repo: 'payments-api' },
  { label: 'Unsafe deserialization pattern', severity: 'high', aiPct: 64, repo: 'auth-service' },
  { label: 'Hardcoded credential in AI block', severity: 'critical', aiPct: 91, repo: 'infra-core' },
  { label: 'Race condition in async handler', severity: 'high', aiPct: 55, repo: 'payments-api' },
  { label: 'Path traversal in file service', severity: 'medium', aiPct: 42, repo: 'auth-service' },
];

const SEVERITY_COLOR: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-400',
  low: 'bg-zinc-300',
};
const SEVERITY_TEXT: Record<string, string> = {
  critical: 'text-red-600 bg-red-50',
  high: 'text-orange-600 bg-orange-50',
  medium: 'text-amber-700 bg-amber-50',
  low: 'text-zinc-600 bg-zinc-100',
};

// ── Security Event Feed ────────────────────────────────────────────────────
const SECURITY_EVENTS = [
  { type: 'scan', msg: 'Deep scan completed — payments-api', detail: '3 new findings', time: '3m ago', color: 'bg-indigo-100 text-indigo-600' },
  { type: 'fix', msg: 'AI auto-fix merged — auth-service', detail: 'CSRF token patch applied', time: '41m ago', color: 'bg-emerald-100 text-emerald-600' },
  { type: 'critical', msg: 'Critical secret detected — infra-core', detail: 'AWS key in .env.example', time: '2h ago', color: 'bg-red-100 text-red-600' },
  { type: 'pr', msg: 'PR blocked by policy — payments-api', detail: 'Unsafe SQL query detected', time: '5h ago', color: 'bg-orange-100 text-orange-600' },
  { type: 'scan', msg: 'Scheduled scan completed — auth-service', detail: 'No new issues found', time: '1d ago', color: 'bg-zinc-100 text-zinc-600' },
];

// ── Vuln Category Cards (like reference image control categories) ──────────
const VULN_CATEGORIES = [
  { label: 'Injection Attacks', icon: '💉', total: 24, critical: 3, high: 7, medium: 8, low: 6, passPct: 37 },
  { label: 'Auth & Access Control', icon: '🔐', total: 18, critical: 1, high: 3, medium: 6, low: 8, passPct: 72 },
  { label: 'Secrets Exposure', icon: '🗝️', total: 12, critical: 4, high: 5, medium: 2, low: 1, passPct: 8 },
  { label: 'Dependency Risks', icon: '📦', total: 30, critical: 0, high: 4, medium: 14, low: 12, passPct: 53 },
  { label: 'AI-Generated Code', icon: '🤖', total: 20, critical: 2, high: 6, medium: 7, low: 5, passPct: 25 },
  { label: 'Infrastructure Config', icon: '⚙️', total: 16, critical: 1, high: 2, medium: 5, low: 8, passPct: 81 },
  { label: 'API Security', icon: '🌐', total: 22, critical: 0, high: 5, medium: 9, low: 8, passPct: 63 },
  { label: 'Data Protection', icon: '🛡️', total: 14, critical: 0, high: 2, medium: 6, low: 6, passPct: 78 },
  { label: 'Cryptography', icon: '🔒', total: 10, critical: 0, high: 1, medium: 3, low: 6, passPct: 90 },
];

function VulnCategoryCard({ item }: { item: typeof VULN_CATEGORIES[0] }) {
  const blocks = 18;
  const critBlocks = Math.round((item.critical / item.total) * blocks);
  const highBlocks = Math.round((item.high / item.total) * blocks);
  const medBlocks = Math.round((item.medium / item.total) * blocks);
  const lowBlocks = Math.min(blocks - critBlocks - highBlocks - medBlocks, Math.round((item.low / item.total) * blocks));
  const emptyBlocks = Math.max(0, blocks - critBlocks - highBlocks - medBlocks - lowBlocks);

  const blockArr = [
    ...Array(critBlocks).fill('bg-red-500'),
    ...Array(highBlocks).fill('bg-orange-400'),
    ...Array(medBlocks).fill('bg-amber-400'),
    ...Array(lowBlocks).fill('bg-zinc-300'),
    ...Array(emptyBlocks).fill('bg-zinc-100'),
  ];

  return (
    <div className="bg-white border border-zinc-100 rounded-[10px] p-4 hover:border-zinc-200 hover:shadow-sm transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[14px]">{item.icon}</span>
          <span className="text-[12.5px] font-semibold text-zinc-900 tracking-tight leading-tight">{item.label}</span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 transition-all">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Block visualization */}
      <div className="flex flex-wrap gap-[2.5px] mb-3">
        {blockArr.map((color, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="font-medium">{item.total} findings</span>
        <span className={`font-semibold ${item.passPct >= 70 ? 'text-emerald-600' : item.passPct >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
          {item.passPct}% resolved
        </span>
      </div>
    </div>
  );
}

// ── Large Score Ring ───────────────────────────────────────────────────────
function ScoreDonut({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B+' : score >= 70 ? 'B' : score >= 60 ? 'C+' : 'C';
  const color = score >= 90 ? '#10b981' : score >= 75 ? '#6366f1' : score >= 55 ? '#f59e0b' : '#ef4444';
  const textColor = score >= 90 ? 'text-emerald-600' : score >= 75 ? 'text-indigo-600' : score >= 55 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 128, height: 128 }}>
      <svg className="-rotate-90 absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#f4f4f5" strokeWidth="10" />
        <motion.circle
          cx="64" cy="64" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${dash} ${c}` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="text-[28px] font-bold text-zinc-900 leading-none">{score}</span>
        <span className={`text-[14px] font-bold ${textColor} mt-0.5`}>{grade}</span>
      </div>
    </div>
  );
}

// ── Main View ──────────────────────────────────────────────────────────────
export function OverviewAnalyticsView() {
  const repos = useAppSelector((s) => s.repos.items);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const avgScore = repos.length > 0 ? Math.round(repos.reduce((s, r) => s + r.score, 0) / repos.length) : 82;
  const totalCritical = repos.reduce((s, r) => s + r.critical, 0);
  const totalHigh = repos.reduce((s, r) => s + r.high, 0);
  const totalMedium = repos.reduce((s, r) => s + r.medium, 0);
  const totalLow = repos.reduce((s, r) => s + r.low, 0);
  const totalFindings = totalCritical + totalHigh + totalMedium + totalLow;
  const aiRiskPct = 62; // Mocked AI-introduced risk percentage

  if (!mounted) return null;

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* ── Row 1: Score + Trend + AI Risk ── */}
      <div className="grid grid-cols-[280px_1fr_280px] gap-4">

        {/* Security Score Card */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Security Score</span>
            <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-full">Last 30d</span>
          </div>
          <div className="flex flex-col items-center py-2 flex-1 justify-center">
            <ScoreDonut score={avgScore} />
            <p className="text-[11.5px] text-zinc-400 text-center mt-3 leading-relaxed">
              {avgScore >= 80 ? 'Your organization has good security posture.' : 'Critical vulnerabilities require immediate attention.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-zinc-50">
            <div className="flex flex-col items-center py-1">
              <span className="text-[14px] font-bold text-red-600">{totalCritical}</span>
              <span className="text-[10px] text-zinc-400 font-medium">Critical</span>
            </div>
            <div className="flex flex-col items-center py-1">
              <span className="text-[14px] font-bold text-orange-500">{totalHigh}</span>
              <span className="text-[10px] text-zinc-400 font-medium">High</span>
            </div>
          </div>
        </div>

        {/* Risk Trend Card */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block">Security Score Trend</span>
              <span className="text-[12px] text-zinc-500 font-medium">Risk movement over time</span>
            </div>
            <div className="flex items-center gap-0.5 bg-zinc-50 border border-zinc-100 rounded-[7px] p-0.5">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded-[5px] text-[11px] font-semibold transition-all cursor-pointer ${period === p ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <RiskTrendChart period={period} />
          </div>

          <div className="flex items-center gap-4 pt-3 mt-1 border-t border-zinc-50">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[11px] text-zinc-400">Security Score</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[11px] text-emerald-600 font-semibold">+3.2 pts vs last period</span>
            </div>
          </div>
        </div>

        {/* AI Risk Exposure Card */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">AI Risk Exposure</span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FurgleAI Insight</span>
          </div>

          {/* Big AI percentage */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col">
              <span className="text-[36px] font-bold text-zinc-900 leading-none">{aiRiskPct}%</span>
              <span className="text-[11.5px] text-zinc-400 mt-1 leading-tight">of open findings introduced<br />by AI-generated code</span>
            </div>
            <div className="flex-1">
              <DensityBlocks total={20} filled={Math.round(aiRiskPct / 5)} color="bg-indigo-500" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            {[
              { label: 'AI SQL Injection patterns', count: 4, trend: 'up' },
              { label: 'Unsafe AI deserialization', count: 2, trend: 'stable' },
              { label: 'AI hardcoded credentials', count: 3, trend: 'up' },
              { label: 'AI race conditions', count: 1, trend: 'down' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-zinc-50 last:border-0">
                <span className="text-[11.5px] text-zinc-600 tracking-tight">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-zinc-900">{item.count}</span>
                  {item.trend === 'up' && <span className="text-[9px] font-bold text-red-500">↑</span>}
                  {item.trend === 'down' && <span className="text-[9px] font-bold text-emerald-500">↓</span>}
                  {item.trend === 'stable' && <span className="text-[9px] font-bold text-zinc-400">→</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Vulnerability Categories (block grid like ref image) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[13px] font-bold text-zinc-900 tracking-tight">Vulnerability Categories</h2>
            <p className="text-[11.5px] text-zinc-400 mt-0.5">{totalFindings} total open findings across {repos.length} repositories</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-red-500 inline-block"/> Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-orange-400 inline-block"/> High</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-amber-400 inline-block"/> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-300 inline-block"/> Low</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {VULN_CATEGORIES.map((cat) => (
            <VulnCategoryCard key={cat.label} item={cat} />
          ))}
        </div>
      </div>

      {/* ── Row 3: AI Risk Findings + Security Events ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4">

        {/* AI-Introduced Risk Findings Table */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">AI-Introduced Risk Findings</h3>
              <p className="text-[11.5px] text-zinc-400 mt-0.5">Vulnerabilities traced to AI code generation patterns</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-full">AI Attribution</span>
          </div>
          <div>
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_90px_100px] gap-3 px-5 py-2 bg-zinc-50 border-b border-zinc-100">
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Finding</span>
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Severity</span>
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">AI Confidence</span>
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repository</span>
            </div>
            {AI_RISK_ITEMS.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_90px_100px] gap-3 px-5 py-3 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors cursor-pointer">
                <span className="text-[12.5px] font-medium text-zinc-700 tracking-tight truncate">{item.label}</span>
                <span className={`inline-flex items-center self-center text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] ${SEVERITY_TEXT[item.severity]}`}>
                  {item.severity}
                </span>
                <div className="flex items-center gap-2 self-center">
                  <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${item.aiPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 w-8 text-right">{item.aiPct}%</span>
                </div>
                <span className="text-[11.5px] font-mono text-zinc-500 self-center">{item.repo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Events Feed */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Security Events</h3>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>Live
            </span>
          </div>
          <div className="flex flex-col">
            {SECURITY_EVENTS.map((ev, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors">
                <div className={`w-6 h-6 rounded-full ${ev.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  {ev.type === 'scan' && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7.5"/><line x1="20.5" y1="20.5" x2="16" y2="16" strokeLinecap="round"/></svg>
                  )}
                  {ev.type === 'fix' && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {ev.type === 'critical' && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 9v4m0 4h.01" strokeLinecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                  )}
                  {ev.type === 'pr' && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-zinc-800 tracking-tight leading-tight truncate">{ev.msg}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{ev.detail}</p>
                </div>
                <span className="text-[10.5px] text-zinc-400 shrink-0 mt-0.5">{ev.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
