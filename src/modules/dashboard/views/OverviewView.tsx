'use client';

import React from 'react';

// Custom Minimal Enterprise SVGs
const IconBranch = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="6" y1="3" x2="6" y2="15" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9a9 9 0 0 1-9 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPulse = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPR = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6" y1="9" x2="6" y2="21" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMore = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const IconComment = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMerge = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 21V9a9 9 0 0 0 9 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAdd = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRemove = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconKey = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconNetwork = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="16" y="16" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="16" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="2" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="11" x2="12" y2="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCpu = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="9" y1="1" x2="9" y2="4" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15" y1="1" x2="15" y2="4" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="9" y1="20" x2="9" y2="23" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15" y1="20" x2="15" y2="23" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="9" x2="23" y2="9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="15" x2="23" y2="15" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="1" y1="9" x2="4" y2="9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="1" y1="15" x2="4" y2="15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Helper to render the circular branch/chevron icon
const ChevronCircleIcon = ({ colorClass }: { colorClass: string }) => (
  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${colorClass}`}>
    <svg viewBox="0 0 24 24" className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Mock Data matching the new FurgleAI SOC specifications
const ACTIVE_VULNERABILITIES = [
  { id: 'backend-api', title: 'SQL Injection in user-service', severity: 'critical', time: '26m', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { id: 'auth-service', title: 'Exposed JWT Secret', severity: 'high', time: '45m', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
  { id: 'dashboard-ui', title: 'Prototype Pollution', severity: 'medium', time: '7h', userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&fit=crop' },
];

const REPO_RISK_RANKING = [
  { name: 'payments-api', score: 42, critical: 8, lastScan: '3m ago' },
  { name: 'auth-service', score: 78, critical: 2, lastScan: '12m ago' },
  { name: 'dashboard-ui', score: 95, critical: 0, lastScan: '1h ago' },
];

const SECRETS_EXPOSURE = [
  { type: 'Stripe API Key', location: 'auth-service (commit 4f9a3b)', status: 'Active Leaked Key', severity: 'critical' },
  { type: 'AWS Secret Access Key', location: 'payments-api (.env exposed)', status: 'Unencrypted Env', severity: 'critical' },
  { type: 'JWT Private Secret', location: 'user-service (hardcoded)', status: 'Hardcoded', severity: 'high' },
];

const PR_SECURITY_REVIEWS = [
  { id: '#182', title: 'Implement stripe checkout webhook', score: 'Low Risk', status: 'Approved', suggestions: 'SQL Injection detected - Auto-fix patch generated.', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { id: '#180', title: 'Add oauth provider config', score: 'Critical Risk', status: 'Flagged', suggestions: 'Hardcoded credentials exposed. Review recommended.', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
];

const LIVE_SCAN_FEED = [
  { step: 'Scanning repo: payments-api', time: 'Just now', icon: 'scan' },
  { step: 'AI found insecure JWT validation in user.controller.ts', time: '1m ago', icon: 'warn' },
  { step: 'Auto-fix PR #405 opened dynamically', time: '2m ago', icon: 'pr' },
  { step: 'Webhook triggered & checks validated', time: '3m ago', icon: 'success' },
  { step: 'GitHub code review completed automatically', time: '4m ago', icon: 'success' },
];

const TEAM_ACTIVITY = [
  {
    id: 1,
    type: 'comment',
    user: 'Moyosoluwalorun',
    action: 'assigned task',
    target: 'Fix SQL Injection in user-service',
    inContext: 'to Nico Greenberg.',
    time: 'Friday, 4:16PM',
    meta: 'Critical Vulnerabilities',
    quote: '...make sure to review the AI-suggested patch in PR #182. It fixes the nested SQL parameter bindings.'
  },
  {
    id: 2,
    type: 'comment',
    user: 'Nico Greenberg',
    action: 'commented on',
    target: 'Stripe API Key Leak.',
    inContext: '',
    time: 'Tuesday, 2:31PM',
    meta: 'Secrets Exposure',
    quote: 'Key has been fully rotated on Stripe dashboard. I am preparing the dynamic env injection now.'
  },
  {
    id: 3,
    type: 'merge',
    user: 'System',
    action: '',
    target: 'Auto-fix PR #405 was merged into payments-api',
    inContext: '',
    time: '',
    meta: '',
    quote: ''
  },
  {
    id: 4,
    type: 'add',
    user: 'System',
    action: '',
    target: 'Hardcoded credentials check added to pre-commit hook.',
    inContext: '',
    time: '',
    meta: '',
    quote: ''
  },
];

export function OverviewView() {
  return (
    <div className="flex flex-col min-h-screen pb-20 w-full font-sans tracking-tight">

      {/* Top Bar */}
      <div className="h-[52px] px-8 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-40 transition-colors hover:bg-zinc-50/50">
        <div className="flex items-center gap-3 text-[13px] font-medium text-zinc-600 tracking-tight cursor-pointer hover:text-zinc-900 transition-colors">
          <div className="w-4 h-4 bg-zinc-800 rounded-[3px] flex items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 border-2 border-white rounded-[1px]" />
          </div>
          <span>Home</span>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer group active:scale-[0.98] transition-transform p-2 -mr-2 rounded-lg hover:bg-zinc-100/50">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all" />
          <span className="text-[12px] text-zinc-500 group-hover:text-zinc-800 transition-colors tracking-tight">2 online</span>
        </div>
      </div>

      {/* Main Content - Full width responsive */}
      <div className="px-8 py-10 flex flex-col gap-10 w-full">

        {/* Welcome Back & Hero Header */}
        <div className="flex flex-col gap-2">
          <p className="tracking-tight text-[15px] text-zinc-600">Welcome back, <span className="text-zinc-900 text-[24px] font-bold tracking-tighter hover:text-blue-600 cursor-pointer transition-colors">Moyosoluwalorun</span></p>

          <h1 className="text-[32px] md:text-[40px] font-bold text-zinc-900 font-sans leading-tight tracking-tighter mt-1">
            Your team has 12 <br className="hidden md:block" />active vulnerabilities
          </h1>
          <p className="text-[14px] text-zinc-500 font-sans max-w-xl leading-relaxed tracking-tight mt-1">
            In the last 24 hours your team has introduced vulnerabilities related to SQL Injection, Exposed Secrets, and Dependency Changes.
          </p>
        </div>


        {/* 9. Scan Throughput & Platform Health (Key Metrics layout) */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 border-y border-zinc-100 py-5 w-full">
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Scans Today</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">1,248</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Avg Scan Time</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">2.4s</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Queue Depth</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">0</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">AI Latency</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">120ms</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Success Rate</span>
            <span className="text-[22px] font-bold text-emerald-600 tracking-tighter group-hover:text-emerald-700 transition-colors">99.9%</span>
          </div>
        </div>

        {/* 1. Security Posture Score (MOST IMPORTANT) */}
        <div className="border border-zinc-200 rounded-[12px] bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer group/hero">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Security Posture Score</span>
            <div className="flex items-baseline gap-3">
              <span className="text-[56px] font-extrabold text-zinc-900 tracking-tighter leading-none group-hover/hero:text-blue-600 transition-colors">82</span>
              <span className="text-[20px] font-bold text-zinc-400 group-hover/hero:text-zinc-500 transition-colors">/100</span>
              <span className="text-[24px] font-black text-emerald-500 tracking-tighter ml-3">Grade B+</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[13px] font-medium text-emerald-600">↑ +6 this week</span>
              <span className="text-[13px] text-zinc-300">•</span>
              <span className="text-[13px] font-semibold text-zinc-900 bg-emerald-50 px-2 py-0.5 rounded-full">Posture Improving</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-8 shrink-0">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Telemetry Engines</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-medium text-zinc-700">Risk Index: Stable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-medium text-zinc-700">EIL Intelligence Engine: Active</span>
              </div>
            </div>
          </div>
        </div>


        {/* 
          Section 1: Active Vulnerabilities & Secrets Exposure
          Layout: 2-column Grid (Next to each other)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Real-Time Threat Center</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Active security bugs and credentials exposed inside commits and env modules.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* 2. Active Vulnerabilities Overview */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconBranch /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Active Vulnerabilities Overview</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>

              {/* Distribution Stats */}
              <div className="p-4 bg-zinc-50/50 border-b border-zinc-100 grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Critical</span>
                  <span className="text-[16px] font-bold text-red-600">3</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">High</span>
                  <span className="text-[16px] font-bold text-orange-500">4</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Medium</span>
                  <span className="text-[16px] font-bold text-yellow-600">5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Resolved</span>
                  <span className="text-[16px] font-bold text-emerald-600">12</span>
                </div>
              </div>

              <div className="flex flex-col">
                {ACTIVE_VULNERABILITIES.map((vuln, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== ACTIVE_VULNERABILITIES.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <ChevronCircleIcon colorClass={
                        vuln.severity === 'critical' ? 'border-red-500 text-red-500' :
                          vuln.severity === 'high' ? 'border-orange-500 text-orange-500' :
                            'border-yellow-500 text-yellow-500'
                      } />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">{vuln.title}</span>
                        <span className="text-[12px] text-zinc-400 font-mono tracking-tighter">{vuln.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] font-semibold text-zinc-900 bg-red-50 px-2 py-0.5 rounded text-[10px] tracking-tight">New</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vuln.userImg} alt="User" className="w-5 h-5 rounded-full object-cover border border-zinc-200 group-hover/row:scale-110 transition-transform" />
                      <span className="text-[12px] text-zinc-400 w-8 text-right tracking-tight">{vuln.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Secrets Exposure Widget */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-red-500 group-hover/header:text-red-600 group-hover/header:scale-110 transition-all"><IconKey /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-red-600 transition-colors">Secrets Exposure</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>
              <div className="flex flex-col">
                {SECRETS_EXPOSURE.map((secret, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== SECRETS_EXPOSURE.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${secret.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-orange-500'}`} />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-red-600 transition-colors">{secret.type}</span>
                        <span className="text-[12px] text-zinc-400 font-mono tracking-tighter">{secret.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded text-[10px] tracking-tight ${secret.severity === 'critical' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600'
                        }`}>{secret.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 
          Section 2: Repository Risk Ranking & AI Code Risk
          Layout: Blocked (Grid 2-column flow underneath)
        
        {/* <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Repository & AI Risk Rankings</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Granular look into your repository compliance indices and generative code security.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* 4. Repository Risk Ranking *
        <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
            <div className="flex items-center gap-2">
              <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconBranch /></div>
              <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Repository Risk Ranking</h3>
            </div>
            <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
          </div>
          <div className="flex flex-col p-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Repo</th>
                  <th className="pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center">Score</th>
                  <th className="pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center">Critical</th>
                  <th className="pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-right">Last Scan</th>
                </tr>
              </thead>
              <tbody>
                {REPO_RISK_RANKING.map((repo, i) => (
                  <tr key={i} className="group/row cursor-pointer hover:bg-zinc-50 transition-colors rounded-lg">
                    <td className="py-2.5 text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">{repo.name}</td>
                    <td className="py-2.5 text-[13px] text-center font-bold">
                      <span className={repo.score < 50 ? 'text-red-500' : 'text-emerald-500'}>{repo.score}</span>
                    </td>
                    <td className="py-2.5 text-[13px] text-center font-bold text-zinc-700">{repo.critical}</td>
                    <td className="py-2.5 text-[12px] text-right text-zinc-400">{repo.lastScan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. AI Code Risk Widget *
        <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card p-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 cursor-pointer group/header">
            <div className="flex items-center gap-2">
              <div className="text-zinc-950 group-hover/header:scale-110 transition-transform"><IconCpu /></div>
              <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">AI Code Risk Engine</h3>
            </div>
            <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-zinc-50 p-3 rounded-lg flex flex-col gap-1 cursor-pointer hover:bg-zinc-100 transition-all active:scale-[0.98]">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">AI-Generated Code</span>
              <span className="text-[20px] font-bold text-zinc-900 tracking-tight">38%</span>
            </div>
            <div className="bg-zinc-50 p-3 rounded-lg flex flex-col gap-1 cursor-pointer hover:bg-zinc-100 transition-all active:scale-[0.98]">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Unsafe AI Files</span>
              <span className="text-[20px] font-bold text-red-500 tracking-tight">12 files</span>
            </div>
          </div>
          <div className="border border-zinc-100 p-3 rounded-lg hover:border-zinc-200 transition-all cursor-pointer group/risky hover:bg-zinc-50/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Most Risky Module</span>
              <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold border border-red-100">Critical Threat</span>
            </div>
            <span className="text-[13px] font-mono font-semibold text-zinc-900 group-hover/risky:text-blue-600 transition-colors">auth/session.ts</span>
            <p className="text-[12px] text-zinc-400 mt-1">Contains hardcoded OAuth state parameter missing validation token.</p>
          </div>
        </div>
      </div>
    </div> */}

        {/* 
          Section 3: Recent Pull Request Security Reviews & Architecture Intelligence
          Layout: Grid 2-column flow underneath
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Workflows & Architecture Moat</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Continuous verification of peer contributions and system flow graphs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* 7. Recent Pull Request Security Reviews */}
            <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconPR /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Recent PR Security Reviews</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>
              <div className="flex flex-col">
                {PR_SECURITY_REVIEWS.map((pr, i) => (
                  <div key={i} className={`p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group/row cursor-pointer active:scale-[0.99] ${i !== PR_SECURITY_REVIEWS.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black group-hover/row:bg-black group-hover/row:text-white transition-colors shadow-sm">
                        <IconPR />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">PR {pr.id} — {pr.title}</span>
                        <span className="text-[12px] text-zinc-500 tracking-tight group-hover/row:text-zinc-700 transition-colors">{pr.suggestions}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-[11px] px-2 py-0.5 rounded font-semibold tracking-tight ${pr.score === 'Low Risk' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>{pr.score}</span>
                      <button className="flex items-center gap-1 text-[12px] font-medium text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-100 hover:border-zinc-300 px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer tracking-tight active:scale-95">
                        Fix <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-400 group-hover/row:text-zinc-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Architecture Intelligence Widget (Minimal V1 service flow diagram) */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card p-5">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 cursor-pointer group/header">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-950 group-hover/header:scale-110 transition-transform"><IconNetwork /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Architecture Intelligence</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>

              <div className="flex items-center justify-center border border-zinc-100 bg-zinc-50/50 py-4 px-2 rounded-lg mb-4 hover:bg-zinc-50 transition-colors cursor-pointer group/graph">
                {/* SVG Visual Flow diagram preview */}
                <svg viewBox="0 0 320 80" className="w-full max-w-[280px]">
                  {/* Nodes */}
                  <rect x="10" y="25" width="60" height="30" rx="4" fill="white" stroke="#e4e4e7" strokeWidth="1.5" />
                  <text x="40" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#27272a" fontWeight="600">Client</text>

                  <rect x="110" y="25" width="80" height="30" rx="4" fill="white" stroke="#e4e4e7" strokeWidth="1.5" className="group-hover/graph:stroke-blue-600 transition-all" />
                  <text x="150" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#27272a" fontWeight="600">auth-service</text>

                  <rect x="230" y="25" width="80" height="30" rx="4" fill="white" stroke="#fecaca" strokeWidth="1.5" className="group-hover/graph:stroke-red-600 transition-all" />
                  <text x="270" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#ef4444" fontWeight="600">payments-api</text>

                  {/* Arrows */}
                  <path d="M70 40 L102 40" fill="none" stroke="#a1a1aa" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="3,3" />
                  <path d="M190 40 L222 40" fill="none" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrow)" />
                </svg>
              </div>

              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="flex items-center justify-between text-[12px] tracking-tight">
                  <span className="text-zinc-500">Weakest Service:</span>
                  <span className="font-semibold text-red-500 hover:underline">payments-api (42 Score)</span>
                </div>
                <div className="flex items-center justify-between text-[12px] tracking-tight">
                  <span className="text-zinc-500">Critical Dependency Paths:</span>
                  <span className="font-semibold text-zinc-900">auth-service → payments-api</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          3. Live Scan Activity Feed
          Layout: Blocked (Full width under)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Live Scan Pipeline</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Real-time SSE event pipeline showing AI checks and auto-remediations.</p>
          </div>

          <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
              <div className="flex items-center gap-2">
                <div className="text-zinc-900 group-hover/header:rotate-180 transition-transform duration-500"><IconPulse /></div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Live Scan Activity Feed</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-semibold animate-pulse tracking-tight">SSE Stream</span>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>
            </div>
            <div className="flex flex-col p-4 gap-3">
              {LIVE_SCAN_FEED.map((feed, i) => (
                <div key={i} className="flex items-center justify-between hover:bg-zinc-50 p-1.5 rounded transition-colors cursor-pointer group/feedrow">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${feed.icon === 'warn' ? 'bg-red-500 animate-ping' :
                      feed.icon === 'pr' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`} />
                    <span className="text-[13px] text-zinc-800 font-medium group-hover/feedrow:text-blue-600 transition-colors tracking-tight">{feed.step}</span>
                  </div>
                  <span className="text-[12px] text-zinc-400 font-mono tracking-tighter">{feed.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 
          10. Team Activity Widget
          Layout: Blocked (Full width under)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Team Collaboration Feed</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Audit log of issues resolved, tasks assigned, and comments made by teams.</p>
          </div>

          <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow group/card">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
              <div className="flex items-center gap-2">
                <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconPulse /></div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Team Activity Feed</h3>
              </div>
              <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
            </div>

            <div className="p-6">
              <h4 className="text-[13px] font-bold text-zinc-900 tracking-tight mb-5">This Week</h4>

              <div className="flex flex-col relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[9px] top-2 bottom-6 w-px bg-zinc-200" />

                {TEAM_ACTIVITY.map((activity, i) => (
                  <div key={i} className="flex gap-4 mb-6 relative group/event cursor-pointer">

                    {/* Event Icon */}
                    <div className="relative z-10 shrink-0 bg-white py-1 transition-transform duration-300 group-hover/event:scale-110">
                      {activity.type === 'comment' ? (
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                          <IconComment />
                        </div>
                      ) : activity.type === 'note' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                          <IconFile />
                        </div>
                      ) : activity.type === 'merge' ? (
                        <div className="w-5 h-5 rounded-full bg-zinc-500 text-white flex items-center justify-center shadow-sm">
                          <IconMerge />
                        </div>
                      ) : activity.type === 'add' ? (
                        <div className="w-5 h-5 rounded-full bg-zinc-400 text-white flex items-center justify-center shadow-sm">
                          <IconAdd />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-zinc-400 text-white flex items-center justify-center shadow-sm">
                          <IconRemove />
                        </div>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="flex flex-col pt-1 flex-1 group-hover/event:bg-zinc-50/50 -my-2 py-2 px-2 -ml-2 rounded-lg transition-colors">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        {activity.user && <span className="text-[13px] font-semibold text-zinc-900 tracking-tight hover:underline hover:text-blue-600">{activity.user}</span>}
                        <span className="text-[13px] text-zinc-500 tracking-tight">{activity.action}</span>
                        <span className="text-[13px] text-zinc-900 tracking-tight hover:underline cursor-pointer">{activity.target}</span>
                        {activity.inContext && <span className="text-[13px] text-zinc-500 tracking-tight">{activity.inContext}</span>}
                      </div>

                      {activity.time && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[12px] text-zinc-500 tracking-tight group-hover/event:text-zinc-700 transition-colors">{activity.time}</span>
                          {activity.meta && (
                            <>
                              <span className="text-[12px] text-zinc-300">•</span>
                              <span className="text-[12px] text-zinc-500 tracking-tight hover:text-zinc-800 hover:underline transition-colors">{activity.meta}</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Quote / Content Box */}
                      {activity.quote && (
                        <div className="mt-3 p-3 border border-zinc-200 rounded-lg bg-white shadow-sm flex items-start justify-between cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 transition-all group/quote active:scale-[0.99]">
                          <p className="text-[13px] text-zinc-700 leading-relaxed tracking-tight max-w-[90%] group-hover/quote:text-zinc-900 transition-colors">
                            {activity.quote}
                          </p>
                          <button className="text-zinc-400 opacity-0 group-hover/event:opacity-100 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-all p-1 active:scale-95">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div >
    </div >
  );
}
