'use client';

import React, { useState } from 'react';

// ── Pending API Data ────────────────────────────────────────────────────────

function MiniLineChart({ data, color = '#6366f1', height = 48 }: { data: number[]; color?: string; height?: number }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center border border-dashed border-zinc-200 rounded text-[10px] text-zinc-400" style={{ height }}>
        Waiting for API data
      </div>
    );
  }
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
  return (
    <div className="flex items-center justify-center h-16 border border-dashed border-zinc-200 rounded text-[10px] text-zinc-400">
      Waiting for Cost API data
    </div>
  );
}

export function AIExecutionAnalyticsView() {
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const totalExec = 0;
  const totalCost = 0;
  const totalTokens = 0;
  const avgLatency = '--';
  const totalSaved = 0;

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

          <div className="px-5 pb-4">
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <span className="text-[13px] font-medium text-zinc-500">No model usage data</span>
              <span className="text-[11px] text-zinc-400 mt-1">Pending AI Execution Infrastructure API</span>
            </div>
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
            <div className="py-4 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] text-zinc-400">No savings data available</span>
            </div>
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
            <span className="text-[11px] text-emerald-600 font-semibold ml-2">--</span>
          </div>
          <MiniLineChart data={[]} color="#6366f1" height={52} />
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
            <span className="text-[11px] text-emerald-600 font-semibold ml-2">--</span>
          </div>
          <MiniLineChart data={[]} color="#10b981" height={52} />
          <div className="flex items-center justify-between mt-2 text-[10.5px] text-zinc-400">
            <span>15 days ago</span><span>Today</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 rounded-[12px] p-5">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">Execution Environment</span>
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <span className="text-[12px] font-medium text-zinc-500">No execution data</span>
          </div>
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
            { label: 'Queue Depth', val: '--', unit: 'jobs', color: 'text-zinc-900', status: 'normal' },
            { label: 'Backpressure', val: '--', unit: '%', color: 'text-emerald-600', status: 'low' },
            { label: 'Degraded executions', val: '--', unit: 'this month', color: 'text-amber-600', status: 'warn' },
            { label: 'Blocked (free tier)', val: '--', unit: 'queued', color: 'text-zinc-500', status: 'info' },
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
