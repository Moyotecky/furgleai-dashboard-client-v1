'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ── Mock Data ──────────────────────────────────────────────────────────────
const DEPENDENCIES = [
  { pkg: 'lodash', ver: '4.17.15', risk: 'critical', type: 'direct', repos: 3 },
  { pkg: 'axios', ver: '0.21.1', risk: 'high', type: 'direct', repos: 2 },
  { pkg: 'minimist', ver: '1.2.5', risk: 'high', type: 'transitive', repos: 5 },
  { pkg: 'express', ver: '4.17.0', risk: 'medium', type: 'direct', repos: 1 },
];

const SECRETS = [
  { type: 'AWS Access Key', status: 'active', repo: 'infra-core', file: '.env.example', time: '2h ago' },
  { type: 'Stripe API Key', status: 'resolved', repo: 'payments-api', file: 'config.ts', time: '1d ago' },
  { type: 'DB Password', status: 'resolved', repo: 'auth-service', file: 'docker-compose.yml', time: '3d ago' },
];

// ── Graph Node Component ───────────────────────────────────────────────────
function GraphNode({ label, type, risk, x, y }: { label: string; type: string; risk: 'low' | 'medium' | 'high' | 'critical'; x: string; y: string }) {
  const colors = {
    critical: 'bg-red-500 border-red-200 text-white',
    high: 'bg-orange-400 border-orange-200 text-white',
    medium: 'bg-amber-400 border-amber-200 text-white',
    low: 'bg-white border-zinc-200 text-zinc-700',
  };
  
  return (
    <div className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10 cursor-pointer hover:scale-105 transition-transform`} style={{ left: x, top: y }}>
      <div className={`w-10 h-10 rounded-full border-2 shadow-sm flex items-center justify-center ${colors[risk]}`}>
        {type === 'db' && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>}
        {type === 'api' && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-9m9 5h-9m9 5h-9M4 7h.01M4 12h.01M4 17h.01" strokeLinecap="round"/></svg>}
        {type === 'auth' && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
        {type === 'web' && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>}
      </div>
      <span className="text-[10px] font-bold text-zinc-600 bg-white/80 px-1 rounded backdrop-blur-sm whitespace-nowrap">{label}</span>
    </div>
  );
}

export function ArchitectureAnalyticsView() {
  return (
    <div className="p-6 flex flex-col gap-5">

      {/* ── Row 1: Architecture Risk Map ── */}
      <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Architecture Risk Map</h3>
            <p className="text-[11.5px] text-zinc-400 mt-0.5">System connections and identified weak points</p>
          </div>
          <div className="flex items-center gap-3 text-[10.5px] text-zinc-500 font-medium bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-[6px]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"/> Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400"/> High</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"/> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-zinc-300 bg-white"/> Low</span>
          </div>
        </div>
        
        <div className="relative w-full h-[320px] bg-[#fafafa]">
          {/* Edges (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Internet -> API Gateway */}
            <path d="M 20% 50% Q 30% 50% 40% 50%" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
            {/* API Gateway -> Auth */}
            <path d="M 40% 50% Q 50% 30% 60% 30%" fill="none" stroke="#ef4444" strokeWidth="2" />
            {/* API Gateway -> Payments */}
            <path d="M 40% 50% Q 50% 70% 60% 70%" fill="none" stroke="#fca5a5" strokeWidth="2" />
            {/* Auth -> DB */}
            <path d="M 60% 30% Q 70% 30% 80% 50%" fill="none" stroke="#fbbf24" strokeWidth="2" />
            {/* Payments -> DB */}
            <path d="M 60% 70% Q 70% 70% 80% 50%" fill="none" stroke="#d4d4d8" strokeWidth="2" />
          </svg>

          {/* Nodes */}
          <GraphNode label="External Web" type="web" risk="low" x="20%" y="50%" />
          <GraphNode label="API Gateway" type="api" risk="high" x="40%" y="50%" />
          <GraphNode label="Auth Service" type="auth" risk="critical" x="60%" y="30%" />
          <GraphNode label="Payments API" type="api" risk="medium" x="60%" y="70%" />
          <GraphNode label="User DB" type="db" risk="low" x="80%" y="50%" />
        </div>
      </div>

      {/* ── Row 2: Dependencies & Secrets ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Dependency Risk Graph */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Dependency Risk</h3>
            <p className="text-[11.5px] text-zinc-400 mt-0.5">Vulnerable packages and supply chain exposure</p>
          </div>
          <div className="grid grid-cols-[1fr_80px_80px_60px] gap-3 px-5 py-2.5 bg-zinc-50 border-b border-zinc-100">
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Package</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Version</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Type</span>
            <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repos</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {DEPENDENCIES.map((dep, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_80px_60px] gap-3 px-5 py-3 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dep.risk === 'critical' ? 'bg-red-500' : dep.risk === 'high' ? 'bg-orange-500' : 'bg-amber-400'}`} />
                  <span className="text-[12.5px] font-mono text-zinc-800 tracking-tight">{dep.pkg}</span>
                </div>
                <span className="text-[11.5px] font-mono text-zinc-500 self-center">{dep.ver}</span>
                <span className="text-[11px] text-zinc-500 self-center capitalize">{dep.type}</span>
                <span className="text-[12px] font-bold text-zinc-700 self-center">{dep.repos}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secrets Exposure Timeline */}
        <div className="bg-white border border-zinc-100 rounded-[12px] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Secrets Exposure Timeline</h3>
            <p className="text-[11.5px] text-zinc-400 mt-0.5">Tracked leaked credentials over time</p>
          </div>
          <div className="flex-1 p-5">
            <div className="relative border-l-2 border-zinc-100 ml-3 flex flex-col gap-6 py-2">
              {SECRETS.map((sec, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1 border-2 border-white ${sec.status === 'active' ? 'bg-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : 'bg-emerald-500'}`} />
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[13px] font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
                        {sec.type}
                        {sec.status === 'active' && <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-[4px]">ACTIVE</span>}
                      </div>
                      <div className="text-[11.5px] font-mono text-zinc-500 mt-0.5">{sec.repo} <span className="text-zinc-300">/</span> {sec.file}</div>
                    </div>
                    <span className="text-[10.5px] text-zinc-400 font-medium">{sec.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
