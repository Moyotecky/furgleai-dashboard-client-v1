'use client';

import React, { useState } from 'react';

// ── Mock Data ──────────────────────────────────────────────────────────────
const MODEL_USAGE = [
  { model: 'Gemini 2.0 Flash', provider: 'Google', executions: 1842, tokens: 2_410_000, cost: 4.82, color: 'bg-blue-500', pct: 62 },
  { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', executions: 891, tokens: 1_230_000, cost: 9.84, color: 'bg-violet-500', pct: 30 },
  { model: 'Gemini 1.5 Pro', provider: 'Google (Fallback)', executions: 178, tokens: 310_000, cost: 1.55, color: 'bg-indigo-400', pct: 6 },
  { model: 'Degraded', provider: 'Circuit Breaker', executions: 24, tokens: 0, cost: 0, color: 'bg-amber-400', pct: 1 },
  { model: 'Blocked', provider: 'Free Tier Limit', executions: 12, tokens: 0, cost: 0, color: 'bg-zinc-300', pct: 0 },
];

const LATENCY_DATA = [420, 380, 510, 440, 390, 460, 430, 380, 400, 420, 390, 410, 450, 380, 400];
const THROUGHPUT_DATA = [22, 28, 19, 31, 27, 33, 29, 35, 32, 28, 34, 30, 26, 33, 31];

const COST_WEEKS = ['W1', 'W2', 'W3', 'W4'];
const COST_DATA = [4.20, 6.80, 9.10, 16.21]; // cumulative this month

const REDIS_SAVINGS = [
  { label: 'Cache hits', val: '14,820', saved: '$11.86', icon: '⚡' },
  { label: 'Dedup executions', val: '2,340', saved: '$4.68', icon: '🔁' },
  { label: 'Local AST runs', val: '891', saved: '$8.91', icon: '🖥️' },
  { label: 'Batch merges', val: '234', saved: '$1.87', icon: '📦' },
];

function MiniLineChart({ data, color = '#6366f1', height = 48 }: { data: number[]; color?: string; height?: number }) {
  const W = 300; const H = height;
  const min = Math.min(...data) * 0.9;
  const max = Math.max(...data) * 1.05;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * H * 0.85 - 4,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L ${pts[pts.length - 1].x} ${H} L 0 ${H} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`lg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#lg-${color.replace('#', '')})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="3" fill={color} />
    </svg>
  );
}

function CostBarChart() {
  const max = Math.max(...COST_DATA);
  return (
    <div className="flex items-end gap-3 h-16">
      {COST_DATA.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-zinc-600">${v.toFixed(2)}</span>
          <div
            className="w-full rounded-t-[4px] bg-indigo-500 transition-all"
            style={{ height: `${(v / max) * 40}px` }}
          />
          <span className="text-[10px] text-zinc-400 font-medium">{COST_WEEKS[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function AIExecutionAnalyticsView() {
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const totalExec = MODEL_USAGE.reduce((s, m) => s + m.executions, 0);
  const totalCost = MODEL_USAGE.reduce((s, m) => s + m.cost, 0);
  const totalTokens = MODEL_USAGE.reduce((s, m) => s + m.tokens, 0);
  const avgLatency = Math.round(LATENCY_DATA.reduce((s, v) => s + v, 0) / LATENCY_DATA.length);
  const totalSaved = REDIS_SAVINGS.reduce((s, r) => s + parseFloat(r.saved.replace('$', '')), 0);

  return (
    <div className="p-6 flex flex-col gap-5">

      {/* ── Row 1: AI Model Usage + Cost Intelligence ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4">

        {/* Model Usage Card */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">AI Model Usage</h3>
              <p className="text-[11.5px] text-zinc-400 mt-0.5">{totalExec.toLocaleString()} total executions this month</p>
            </div>
            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full">Multi-model</span>
          </div>

          {/* Horizontal stacked bar */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex h-5 rounded-full overflow-hidden gap-px">
              {MODEL_USAGE.map((m) => (
                <div
                  key={m.model}
                  className={`${m.color} transition-all cursor-pointer`}
                  style={{ width: `${m.pct}%` }}
                  title={`${m.model}: ${m.pct}%`}
                  onMouseEnter={() => setActiveModel(m.model)}
                  onMouseLeave={() => setActiveModel(null)}
                />
              ))}
            </div>
          </div>

          {/* Model rows */}
          <div className="px-5 pb-4">
            {MODEL_USAGE.map((m) => (
              <div
                key={m.model}
                className={`flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0 transition-colors ${activeModel === m.model ? 'bg-zinc-50 -mx-2 px-2 rounded-[6px]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${m.color} shrink-0`} />
                  <div>
                    <div className="text-[12.5px] font-semibold text-zinc-900 tracking-tight">{m.model}</div>
                    <div className="text-[11px] text-zinc-400">{m.provider}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-[12px] font-bold text-zinc-900">{m.executions.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-400">executions</div>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-zinc-900">{(m.tokens / 1000).toFixed(0)}K</div>
                    <div className="text-[10px] text-zinc-400">tokens</div>
                  </div>
                  <div>
                    <div className={`text-[12px] font-bold ${m.cost > 0 ? 'text-zinc-900' : 'text-zinc-300'}`}>${m.cost.toFixed(2)}</div>
                    <div className="text-[10px] text-zinc-400">cost</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center gap-8">
            <div>
              <span className="text-[10.5px] text-zinc-400 font-medium">Total Executions</span>
              <div className="text-[15px] font-bold text-zinc-900">{totalExec.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-[10.5px] text-zinc-400 font-medium">Total Tokens</span>
              <div className="text-[15px] font-bold text-zinc-900">{(totalTokens / 1_000_000).toFixed(1)}M</div>
            </div>
            <div>
              <span className="text-[10.5px] text-zinc-400 font-medium">Total Cost</span>
              <div className="text-[15px] font-bold text-indigo-600">${totalCost.toFixed(2)}</div>
            </div>
            <div className="ml-auto">
              <span className="text-[10.5px] text-zinc-400 font-medium">Degraded Rate</span>
              <div className="text-[15px] font-bold text-amber-600">0.8%</div>
            </div>
          </div>
        </div>

        {/* Cost Intelligence Card */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Cost Intelligence</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">May 2026</span>
          </div>

          <div className="mb-4">
            <div className="text-[28px] font-bold text-zinc-900 tracking-tight">${totalCost.toFixed(2)}</div>
            <div className="text-[11.5px] text-zinc-400 mt-0.5">AI spend this month</div>
          </div>

          <CostBarChart />

          <div className="mt-4 pt-4 border-t border-zinc-50">
            <div className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Savings Engine</div>
            {REDIS_SAVINGS.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span>{r.icon}</span>
                  <span className="text-[11.5px] text-zinc-600">{r.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-600">{r.saved} saved</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 mt-1">
              <span className="text-[12px] font-bold text-zinc-900">Total savings</span>
              <span className="text-[13px] font-bold text-emerald-600">${totalSaved.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Execution Performance ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Latency Chart */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Avg Execution Latency</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-[24px] font-bold text-zinc-900">{avgLatency}</span>
            <span className="text-[12px] text-zinc-400 font-medium">ms</span>
            <span className="text-[11px] text-emerald-600 font-semibold ml-2">↓ 12% vs last period</span>
          </div>
          <MiniLineChart data={LATENCY_DATA} color="#6366f1" height={52} />
          <div className="flex items-center justify-between mt-2 text-[10.5px] text-zinc-400">
            <span>15 days ago</span><span>Today</span>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Scan Throughput</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-[24px] font-bold text-zinc-900">31</span>
            <span className="text-[12px] text-zinc-400 font-medium">scans / hr peak</span>
            <span className="text-[11px] text-emerald-600 font-semibold ml-2">↑ 8%</span>
          </div>
          <MiniLineChart data={THROUGHPUT_DATA} color="#10b981" height={52} />
          <div className="flex items-center justify-between mt-2 text-[10.5px] text-zinc-400">
            <span>15 days ago</span><span>Today</span>
          </div>
        </div>

        {/* Execution Split */}
        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">Execution Environment</span>
          {[
            { label: 'Cloud AI execution', pct: 62, color: 'bg-indigo-500', detail: '1,842 runs' },
            { label: 'Local AST engine', pct: 30, color: 'bg-emerald-500', detail: '891 runs' },
            { label: 'Hybrid (escalated)', pct: 6, color: 'bg-amber-400', detail: '178 runs' },
            { label: 'Blocked / Degraded', pct: 2, color: 'bg-zinc-200', detail: '36 runs' },
          ].map((item) => (
            <div key={item.label} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11.5px] text-zinc-600 font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-zinc-400">{item.detail}</span>
                  <span className="text-[11.5px] font-bold text-zinc-900 w-7 text-right">{item.pct}%</span>
                </div>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 3: Queue Health ── */}
      <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Queue Health</h3>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Healthy
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Queue Depth', val: '3', unit: 'jobs', color: 'text-zinc-900', status: 'normal' },
            { label: 'Backpressure', val: '4.2', unit: '%', color: 'text-emerald-600', status: 'low' },
            { label: 'Degraded executions', val: '24', unit: 'this month', color: 'text-amber-600', status: 'warn' },
            { label: 'Blocked (free tier)', val: '12', unit: 'queued', color: 'text-zinc-500', status: 'info' },
          ].map(({ label, val, unit, color }) => (
            <div key={label} className="flex flex-col p-4 bg-zinc-50 border border-zinc-100 rounded-[10px]">
              <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</span>
              <span className={`text-[26px] font-bold tracking-tight ${color}`}>{val}</span>
              <span className="text-[11px] text-zinc-400 mt-0.5">{unit}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
