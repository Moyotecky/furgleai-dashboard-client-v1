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
  { type: 'Stripe API Key', location: 'auth-service (commit 4f9a3b)', status: 'Active Leaked Key', severity: 'critical', slug: 'stripe' },
  { type: 'AWS Secret Access Key', location: 'payments-api (.env exposed)', status: 'Unencrypted Env', severity: 'critical', slug: 'amazonwebservices' },
  { type: 'JWT Private Secret', location: 'user-service (hardcoded)', status: 'Hardcoded', severity: 'high', slug: 'jsonwebtokens' },
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
  const [isEmpty, setIsEmpty] = React.useState(false);

  // Live Scan Pipeline Interactive State Machine
  const [progress, setProgress] = React.useState(68);
  const [currentStage, setCurrentStage] = React.useState('ANALYSIS');

  React.useEffect(() => {
    if (isEmpty) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Pause at 100% for 4 seconds, then reset to 0 to loop
          setTimeout(() => setProgress(0), 4000);
          return 100;
        }
        return prev + 1;
      });
    }, 1000); // Progress increments every 1.0 seconds

    return () => clearInterval(interval);
  }, [isEmpty]);

  React.useEffect(() => {
    if (progress <= 10) setCurrentStage('INIT');
    else if (progress <= 25) setCurrentStage('CLONE');
    else if (progress <= 40) setCurrentStage('DISCOVERY');
    else if (progress <= 50) setCurrentStage('CHUNKING');
    else if (progress <= 70) setCurrentStage('ANALYSIS');
    else if (progress <= 78) setCurrentStage('AGGREGATION');
    else if (progress <= 84) setCurrentStage('EXPLAINABILITY');
    else if (progress <= 90) setCurrentStage('REMEDIATION');
    else if (progress <= 96) setCurrentStage('GITHUB');
    else setCurrentStage('COMPLETE');
  }, [progress]);

  return (
    <div className="flex flex-col min-h-screen pb-20 w-full font-sans bg-zinc-50 tracking-tight">

      {/* Top Bar */}
      <div className="h-[52px] px-8 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-40 transition-colors hover:bg-zinc-50/50">
        <div className="flex items-center gap-3 text-[13px] font-medium text-zinc-600 tracking-tight cursor-pointer hover:text-zinc-900 transition-colors">
          <div className="w-4 h-4 bg-zinc-800 rounded-[3px] flex items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 border-2 border-white rounded-[1px]" />
          </div>
          <span>Home</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsEmpty(!isEmpty)}
            className="text-[11px] font-semibold text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-50 px-2.5 py-1 rounded-[4px] shadow-sm transition-all hover:text-zinc-900 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isEmpty ? 'bg-amber-500 animate-pulse' : 'bg-zinc-300'}`} />
            <span>{isEmpty ? 'View Live Data' : 'Simulate Empty States'}</span>
          </button>
          <div className="flex items-center gap-1.5 cursor-pointer group active:scale-[0.98] transition-transform p-2 -mr-2 rounded-lg hover:bg-zinc-100/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all" />
            <span className="text-[12px] text-zinc-500 group-hover:text-zinc-800 transition-colors tracking-tight">2 online</span>
          </div>
        </div>
      </div>

      {/* Main Content - Full width responsive */}
      <div className="px-8 py-10 flex flex-col gap-10 w-full">

        {/* Welcome Back & Hero Header */}
        <div className="flex flex-col gap-2">
          <p className="tracking-tight text-[15px] text-zinc-600">Welcome back, <span className="text-zinc-900 text-[24px] font-bold tracking-tighter hover:text-blue-600 cursor-pointer transition-colors">Moyosoluwalorun.</span></p>

          <h1 className="text-[32px] md:text-[40px] font-bold text-zinc-900 font-sans leading-tight tracking-tighter mt-1">
            {isEmpty ? 'Your team has 0' : 'Your team has 12'} <br className="hidden md:block" />active vulnerabilities
          </h1>
          <p className="text-[14px] text-zinc-500 font-sans max-w-xl leading-relaxed tracking-tight mt-1">
            {isEmpty
              ? 'In the last 24 hours your team has introduced 0 vulnerabilities. All services are running with clean compliance indices.'
              : 'In the last 24 hours your team has introduced vulnerabilities related to SQL Injection, Exposed Secrets, and Dependency Changes.'}
          </p>
        </div>

        {/* 9. Scan Throughput & Platform Health (Linear-Style Divider Grid) */}
        {/* <div className="grid grid-cols-2 md:grid-cols-5 border border-zinc-200/80 rounded-[6px] divide-x divide-zinc-200/80 bg-white select-none">
          <div className="flex flex-col p-4 gap-0.5 hover:bg-zinc-50/50 transition-colors cursor-pointer group active:scale-[0.98]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-600 transition-colors">Scans Today</span>
            <span className="text-[18px] font-bold text-zinc-900 tracking-tight font-sans">{isEmpty ? '0' : '1,248'}</span>
          </div>
          <div className="flex flex-col p-4 gap-0.5 hover:bg-zinc-50/50 transition-colors cursor-pointer group active:scale-[0.98]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-600 transition-colors">Avg Scan Time</span>
            <span className="text-[18px] font-bold text-zinc-900 tracking-tight font-sans">{isEmpty ? '--' : '2.4s'}</span>
          </div>
          <div className="flex flex-col p-4 gap-0.5 hover:bg-zinc-50/50 transition-colors cursor-pointer group active:scale-[0.98]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-600 transition-colors">Queue Depth</span>
            <span className="text-[18px] font-bold text-zinc-900 tracking-tight font-sans">0</span>
          </div>
          <div className="flex flex-col p-4 gap-0.5 hover:bg-zinc-50/50 transition-colors cursor-pointer group active:scale-[0.98]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-600 transition-colors">AI Latency</span>
            <span className="text-[18px] font-bold text-zinc-900 tracking-tight font-sans">{isEmpty ? '--' : '120ms'}</span>
          </div>
          <div className="flex flex-col p-4 gap-0.5 hover:bg-zinc-50/50 transition-colors cursor-pointer group active:scale-[0.98]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-600 transition-colors">Success Rate</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-[18px] font-bold tracking-tight font-sans ${isEmpty ? 'text-zinc-400' : 'text-emerald-600'}`}>{isEmpty ? '--' : '99.9%'}</span>
              {!isEmpty && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            </div>
          </div>
        </div> */}

        {/* 1. Security Posture Score (Flat Premium Telemetry Panel) */}
        <div className="border border-zinc-200/80 rounded-[6px] bg-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-zinc-50/30 transition-colors cursor-pointer group active:scale-[0.995]">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Security Posture Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] font-extrabold text-zinc-950 tracking-tighter leading-none group-hover:text-black transition-colors">{isEmpty ? '100' : '82'}</span>
              <span className="text-[13px] text-zinc-400 font-medium">/100</span>
              <span className={`text-[12px] font-bold bg-emerald-50 border border-emerald-100/50 rounded px-1.5 py-0.5 ml-2 font-mono ${isEmpty ? 'text-emerald-600' : 'text-emerald-700'}`}>{isEmpty ? 'A+' : 'B+'}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[12px] text-zinc-500">
              <span className="font-semibold text-emerald-600">{isEmpty ? '↑ Stable' : '↑ +6 this week'}</span>
              <span className="text-zinc-300">•</span>
              <span className="font-medium text-emerald-700 bg-emerald-50/50 border border-emerald-100/50 px-2 py-0.5 rounded-full text-[11px]">{isEmpty ? 'Posture Verified' : 'Posture Improving'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-t md:border-t-0 md:border-l border-zinc-150 pt-4 md:pt-0 md:pl-6 shrink-0 text-[11px] text-zinc-600 w-full md:w-auto">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Telemetry Engines</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium">Risk Index: Stable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isEmpty ? 'bg-zinc-400' : 'bg-emerald-500'}`} />
                <span className="font-medium">{isEmpty ? 'EIL Intelligence Engine: Idle' : 'EIL Intelligence Engine: Active'}</span>
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
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-red-600'}`}>{isEmpty ? '0' : '3'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">High</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-orange-500'}`}>{isEmpty ? '0' : '4'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Medium</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-yellow-600'}`}>{isEmpty ? '0' : '5'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Resolved</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400 font-normal' : 'text-emerald-600'}`}>{isEmpty ? '--' : '12'}</span>
                </div>
              </div>

              {isEmpty ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">All clear</span>
                  <p className="text-[11px] text-zinc-400 max-w-[220px] mt-0.5 leading-normal tracking-tight">No open security issues or SQL injections detected in active repositories.</p>
                </div>
              ) : (
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
              )}
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

              {isEmpty ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">No exposed secrets</span>
                  <p className="text-[11px] text-zinc-400 max-w-[220px] mt-0.5 leading-normal tracking-tight">AWS, Stripe, and JWT credentials are clean. Continuous monitoring active.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {SECRETS_EXPOSURE.map((secret, i) => (
                    <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== SECRETS_EXPOSURE.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-[4px] border border-zinc-200/60 bg-zinc-50 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://cdn.jsdelivr.net/npm/simple-icons@12.0.0/icons/${secret.slug}.svg`}
                            alt=""
                            className="w-4.5 h-4.5 object-contain opacity-85 group-hover/row:opacity-100 transition-opacity"
                          />
                          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${secret.severity === 'critical' ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]' : 'bg-orange-500'
                            }`} />
                        </div>
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
              )}
            </div>
          </div>
        </div>        {/* 
          Section 3: PR Reviews, Architecture Moat & Live Scan Pipeline
          Layout: Grid 3-column flow underneath
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Workflows, Architecture & Pipeline Control</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Continuous verification of peer contributions, system flow graphs, and autonomous scan state.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">

            {/* Column 1: Recent PR Security Reviews */}
            <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow group/card min-h-[580px]">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconPR /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Recent PR Security Reviews</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>

              {isEmpty ? (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-250 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><line x1="6" y1="9" x2="6" y2="21" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">All PRs verified</span>
                  <p className="text-[11px] text-zinc-400 max-w-[200px] mt-0.5 leading-normal tracking-tight">Every recent contribution has been fully scanned and approved.</p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-zinc-100">
                  {PR_SECURITY_REVIEWS.map((pr, i) => (
                    <div key={i} className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group/row cursor-pointer active:scale-[0.99]">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black group-hover/row:bg-black group-hover/row:text-white transition-colors shadow-sm shrink-0">
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
              )}
            </div>

            {/* Column 2: Architecture Intelligence */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card p-5 min-h-[580px]">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 cursor-pointer group/header">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-950 group-hover/header:scale-110 transition-transform"><IconNetwork /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Architecture Intelligence</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>

              <div className="flex items-center justify-center border border-zinc-100 bg-zinc-50/50 py-12 px-2 rounded-lg mb-6 hover:bg-zinc-50 transition-colors cursor-pointer group/graph">
                {/* SVG Visual Flow diagram preview */}
                <svg viewBox="0 0 320 80" className="w-full max-w-[280px]">
                  {/* Nodes */}
                  <rect x="10" y="25" width="60" height="30" rx="4" fill="white" stroke="#e4e4e7" strokeWidth="1.5" />
                  <text x="40" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#27272a" fontWeight="600">Client</text>

                  <rect x="110" y="25" width="80" height="30" rx="4" fill="white" stroke="#e4e4e7" strokeWidth="1.5" className="group-hover/graph:stroke-blue-600 transition-all" />
                  <text x="150" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#27272a" fontWeight="600">auth-service</text>

                  <rect x="230" y="25" width="80" height="30" rx="4" fill="white" stroke={isEmpty ? '#e4e4e7' : '#fecaca'} strokeWidth="1.5" className="group-hover/graph:stroke-red-600 transition-all" />
                  <text x="270" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={isEmpty ? '#27272a' : '#ef4444'} fontWeight="600">payments-api</text>

                  {/* Arrows */}
                  <path d="M70 40 L102 40" fill="none" stroke="#a1a1aa" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="3,3" />
                  <path d="M190 40 L222 40" fill="none" stroke={isEmpty ? '#a1a1aa' : '#f87171'} strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray={isEmpty ? '3,3' : 'none'} />
                </svg>
              </div>

              <div className="flex flex-col gap-3.5 mt-auto">
                <div className="flex items-center justify-between text-[12px] tracking-tight border-b border-zinc-100 pb-2">
                  <span className="text-zinc-500">Weakest Service:</span>
                  <span className={`font-semibold hover:underline ${isEmpty ? 'text-emerald-500' : 'text-red-500'}`}>{isEmpty ? 'None (All stable)' : 'payments-api (42 Score)'}</span>
                </div>
                <div className="flex items-center justify-between text-[12px] tracking-tight border-b border-zinc-100 pb-2">
                  <span className="text-zinc-500">Critical Dependency Paths:</span>
                  <span className="font-semibold text-zinc-900">{isEmpty ? 'None' : 'auth-service → payments-api'}</span>
                </div>
                <div className="flex items-center justify-between text-[12px] tracking-tight">
                  <span className="text-zinc-500">Threat Propagation:</span>
                  <span className={`font-semibold ${isEmpty ? 'text-emerald-500' : 'text-orange-500 animate-pulse'}`}>{isEmpty ? '0%' : 'High risk'}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Live Scan Pipeline (Made EXACTLY like the attached circular metrics and nested tree blueprint!) */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card min-h-[580px] p-5">

              {/* Header section matching controls in image */}
              <div className="flex items-center justify-between border-b border-zinc-150 pb-4 mb-5">
                <h3 className="text-[14px] font-bold text-zinc-900 tracking-tight">Live Pipeline</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-2 py-0.5 rounded transition-all cursor-pointer">All targets</span>
                  <span className="text-[11px] font-semibold text-zinc-750 bg-white border border-zinc-200 px-2 py-0.5 rounded inline-flex items-center gap-1 hover:bg-zinc-50 cursor-pointer shadow-sm">
                    payments-api
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 15l5 5 5-5M7 9l5-5 5 5" /></svg>
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-950 transition-colors p-0.5 cursor-pointer"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                  <button className="text-zinc-400 hover:text-zinc-950 transition-colors p-0.5 cursor-pointer"><IconMore /></button>
                </div>
              </div>

              {isEmpty ? (
                <div className="my-auto py-24 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">Pipeline idle</span>
                  <p className="text-[11px] text-zinc-400 max-w-[200px] mt-0.5 leading-normal tracking-tight">Waiting for peer changes or next scheduled repository scan.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 w-full">

                  {/* Top Metrics Row: 4 Circular progress charts exactly like image */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-5 w-full">

                    {/* 1. Discoveries (Purple) */}
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="#f4f4f5" strokeWidth="2.5" />
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="currentColor" strokeWidth="3.2" className="text-indigo-600" strokeDasharray={100.53} strokeDashoffset={100.53 - (64 / 100) * 100.53} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[11px] font-extrabold text-zinc-800 font-mono">64%</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-tight uppercase">Discoveries</span>
                    </div>

                    {/* 2. Briefs (Orange) */}
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="#f4f4f5" strokeWidth="2.5" />
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="currentColor" strokeWidth="3.2" className="text-orange-500" strokeDasharray={100.53} strokeDashoffset={100.53 - (48 / 100) * 100.53} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[11px] font-extrabold text-zinc-800 font-mono">48%</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-tight uppercase">Briefs</span>
                    </div>

                    {/* 3. Timescales (Green) */}
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="#f4f4f5" strokeWidth="2.5" />
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="currentColor" strokeWidth="3.2" className="text-emerald-500" strokeDasharray={100.53} strokeDashoffset={100.53 - (16 / 100) * 100.53} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[11px] font-extrabold text-zinc-800 font-mono">16%</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-tight uppercase">Timescales</span>
                    </div>

                    {/* 4. Proposals (Grey) */}
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="#f4f4f5" strokeWidth="2.5" />
                          <circle cx="24" cy="24" r="16" fill="transparent" stroke="currentColor" strokeWidth="3.2" className="text-zinc-300" strokeDasharray={100.53} strokeDashoffset={100.53} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[11px] font-extrabold text-zinc-800 font-mono">0%</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-tight uppercase">Proposals</span>
                    </div>
                  </div>

                  {/* Main Nested Tree checklist exactly like blueprint */}
                  <div className="flex flex-col gap-5 w-full">

                    {/* Tree Node 1: payments-api */}
                    <div className="flex flex-col gap-2.5 relative">
                      <div className="flex items-center gap-2 group cursor-pointer">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 transform transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm transition-transform group-hover:rotate-12">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 2h14v2H5V2zm0 18h14v2H5v-2zm12-4c0-2.21-1.79-4-4-4s-4 1.79-4 4v4h8v-4zm-8-8c0 2.21 1.79 4 4 4s4-1.79 4-4V4H9v4z" /></svg>
                        </div>
                        <span className="text-[13px] font-bold text-zinc-800 tracking-tight group-hover:text-blue-600 transition-colors">payments-api</span>

                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-16 h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-[11px] font-extrabold text-zinc-800 font-mono tracking-tighter w-8 text-right">{progress}%</span>
                        </div>
                      </div>

                      {/* Tree branches with vertical line and horizontal elbows */}
                      <div className="flex flex-col gap-3 pl-6 relative">
                        {/* Vertical connection line */}
                        <div className="absolute left-[11px] top-0 bottom-3 w-px bg-zinc-200/80" />

                        {/* Branch 1.1 */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4.5"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                          <span className="text-[12px] font-medium text-zinc-400 line-through tracking-tight">Workspace initialization</span>
                          <span className="ml-auto text-[11px] text-zinc-400 font-mono">12:01:03</span>
                        </div>

                        {/* Branch 1.2 */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4.5"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                          <span className="text-[12px] font-medium text-zinc-400 line-through tracking-tight">AST parsing & discovery</span>
                          <span className="ml-auto text-[11px] text-zinc-400 font-mono">12:01:09</span>
                        </div>

                        {/* Branch 1.3 (Dynamic scan step) */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          {progress >= 71 ? (
                            <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4.5"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                          ) : (
                            <div className={`w-4 h-4 rounded-full bg-white border flex items-center justify-center shrink-0 ${progress >= 51 ? 'border-red-500 animate-pulse' : 'border-zinc-300'}`} />
                          )}
                          <span className={`text-[12px] font-medium tracking-tight ${progress >= 71 ? 'text-zinc-400 line-through' : 'text-zinc-800'} ${progress >= 51 && progress < 71 ? 'text-red-500 font-bold' : ''}`}>
                            Generative SAST scan
                          </span>
                          <span className={`ml-auto text-[11px] font-mono ${progress >= 51 && progress < 71 ? 'text-red-500 font-bold animate-pulse' : 'text-zinc-400'}`}>12:01:18</span>
                        </div>

                        {/* Branch 1.4 (Dynamic secure patch step) */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          {progress >= 97 ? (
                            <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4.5"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                          ) : (
                            <div className={`w-4 h-4 rounded-full bg-white border flex items-center justify-center shrink-0 ${progress >= 85 ? 'border-indigo-500 animate-pulse' : 'border-zinc-300'}`} />
                          )}
                          <span className={`text-[12px] font-medium tracking-tight ${progress >= 97 ? 'text-zinc-400 line-through' : 'text-zinc-800'} ${progress >= 85 && progress < 97 ? 'text-indigo-600 font-bold' : ''}`}>
                            Synthesize secure patch
                          </span>
                          <span className={`ml-auto text-[11px] font-mono ${progress >= 85 && progress < 97 ? 'text-indigo-600 font-bold' : 'text-zinc-400'}`}>12:01:27</span>
                        </div>
                      </div>
                    </div>

                    {/* Tree Node 2: auth-service */}
                    <div className="flex flex-col gap-2.5 relative">
                      <div className="flex items-center gap-2 group cursor-pointer">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                        <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm transition-transform group-hover:rotate-12">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <span className="text-[13px] font-bold text-zinc-800 tracking-tight group-hover:text-blue-600 transition-colors">auth-service</span>

                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-16 h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '45%' }} />
                          </div>
                          <span className="text-[11px] font-extrabold text-zinc-800 font-mono tracking-tighter w-8 text-right">45%</span>
                        </div>
                      </div>

                      {/* Tree branches with vertical line and horizontal elbows */}
                      <div className="flex flex-col gap-3 pl-6 relative">
                        <div className="absolute left-[11px] top-0 bottom-3 w-px bg-zinc-200/80" />

                        {/* Step 2.1 */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4.5"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                          <span className="text-[12px] font-medium text-zinc-400 line-through tracking-tight">Arrange compliance policy</span>
                          <span className="ml-auto text-[11px] text-zinc-400 font-mono">20 Aug</span>
                        </div>

                        {/* Step 2.2 */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          <div className="w-4 h-4 rounded-full bg-white border border-zinc-300 shrink-0" />
                          <span className="text-[12px] font-medium text-zinc-800 tracking-tight">Inject authorization matrix</span>
                          <span className="ml-auto text-[11px] text-zinc-400 font-mono">24 Aug</span>
                        </div>

                        {/* Step 2.3 */}
                        <div className="flex items-center gap-2.5 relative">
                          <div className="absolute -left-[15px] top-[9px] w-[15px] h-px bg-zinc-200/80" />
                          <div className="w-4 h-4 rounded-full bg-white border border-zinc-300 shrink-0" />
                          <span className="text-[12px] font-medium text-zinc-800 tracking-tight">Quarterly penetration sweep</span>
                          <span className="ml-auto text-[11px] text-zinc-400 font-mono">25 Aug</span>
                        </div>
                      </div>
                    </div>

                    {/* Tree Node 3: gateway-router (Collapsed) */}
                    <div className="flex items-center gap-2.5 group cursor-pointer">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                      <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /></svg>
                      </div>
                      <span className="text-[13px] font-bold text-zinc-800 tracking-tight group-hover:text-blue-600 transition-colors">gateway-router</span>

                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-16 h-1 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '23%' }} />
                        </div>
                        <span className="text-[11px] font-extrabold text-zinc-800 font-mono tracking-tighter w-8 text-right">23%</span>
                      </div>
                    </div>

                    {/* Tree Node 4: billing-worker (Collapsed) */}
                    <div className="flex items-center gap-2.5 group cursor-pointer">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                      <div className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>
                      </div>
                      <span className="text-[13px] font-bold text-zinc-800 tracking-tight group-hover:text-blue-600 transition-colors">billing-worker</span>

                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-16 h-1 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '0%' }} />
                        </div>
                        <span className="text-[11px] font-extrabold text-zinc-800 font-mono tracking-tighter w-8 text-right">0%</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}
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

              {isEmpty ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">Audit trail up to date</span>
                  <p className="text-[11px] text-zinc-400 max-w-[220px] mt-0.5 leading-normal tracking-tight">All resolved items and collaborative task assignments have been completed.</p>
                </div>
              ) : (
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
                                <span className="text-[12px] text-zinc-505 tracking-tight hover:text-zinc-800 hover:underline transition-colors">{activity.meta}</span>
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
              )}
            </div>
          </div>
        </div>

      </div >
    </div >
  );
}
