'use client';

import React from 'react';
import { CircleCheck, Circle, ChevronRight, ChevronDown, Maximize2, MoreVertical } from 'lucide-react';
import { FaGithub, FaChartPie } from 'react-icons/fa';
import { useAnalytics } from '@/shared/hooks/useAnalytics';
import { useVulnerabilities } from '@/shared/hooks/useVulnerabilities';
import { useRepositories } from '@/shared/hooks/useRepositories';

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

// Reusable widget header: [All repositories | repo ∨]  ————————————————  [View all]
function WidgetHeader({ viewAllHref, options = [] }: { viewAllHref?: string, options?: string[] }) {
  const [selected, setSelected] = React.useState('All repositories');
  const [open, setOpen] = React.useState(false);

  const filterOptions = ['All repositories', ...options];

  return (
    <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center justify-between rounded-t-[12px]">
      {/* Pill segmented control */}
      <div className="relative">
        <div className="flex items-center border border-zinc-200/90 rounded-[8px] bg-white shadow-sm overflow-hidden divide-x divide-zinc-200/90">
          {/* Static: All repositories */}
          <button
            onClick={() => { setSelected('All repositories'); setOpen(false); }}
            className={`px-3 py-1 text-[12px] font-medium tracking-tight transition-colors cursor-pointer whitespace-nowrap ${selected === 'All repositories'
                ? 'text-zinc-900 bg-zinc-50'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
          >
            All repositories
          </button>
          {/* Dropdown: specific repo */}
          <button
            onClick={() => setOpen(p => !p)}
            className={`flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium tracking-tight transition-colors cursor-pointer whitespace-nowrap ${selected !== 'All repositories'
                ? 'text-zinc-900 bg-zinc-50'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
          >
            <FaGithub className="w-3 h-3 text-zinc-400" />
            <span>{selected !== 'All repositories' ? selected : 'Repository'}</span>
            <svg viewBox="0 0 24 24" className={`w-3 h-3 text-zinc-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute top-[calc(100%+6px)] left-0 min-w-[190px] bg-white border border-zinc-200 rounded-[8px] shadow-lg z-50 py-1 overflow-hidden">
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] font-medium tracking-tight cursor-pointer transition-colors ${selected === opt ? 'text-zinc-900 bg-zinc-50' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
              >
                {opt !== 'All repositories'
                  ? <FaGithub className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  : <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                }
                <span className="truncate">{opt}</span>
                {selected === opt && (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-900 ml-auto shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View all */}
      <a
        href={viewAllHref ?? '#'}
        className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors tracking-tight flex items-center gap-1 group"
      >
        View all
        <svg viewBox="0 0 24 24" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  );
}

export function OverviewView() {
  const { overview, aiExecution, loadOverview, loadAIExecutionAnalytics } = useAnalytics();
  const { vulnerabilities, summary: vulnsSummary, loadVulnerabilities } = useVulnerabilities();
  const { repositories, loadRepositories } = useRepositories();

  React.useEffect(() => {
    loadOverview();
    loadVulnerabilities();
    loadRepositories();
    loadAIExecutionAnalytics();
  }, [loadOverview, loadVulnerabilities, loadRepositories, loadAIExecutionAnalytics]);

  const [isEmpty, setIsEmpty] = React.useState(false);
  const [repoFilter, setRepoFilter] = React.useState('All repositories');
  const [filterOpen, setFilterOpen] = React.useState(false);

  const repoNames = repositories.map(r => r.name);

  // Live Scan Pipeline Interactive State Machine
  const [progress, setProgress] = React.useState(68);
  const [currentStage, setCurrentStage] = React.useState('ANALYSIS');

  // Interactive Collapsible Tree State
  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({
    'payments-api': true,
    'auth-service': true,
    'gateway-router': false,
    'billing-worker': false,
  });

  const toggleNode = (node: string) => {
    setExpandedNodes(prev => ({ ...prev, [node]: !prev[node] }));
  };

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
      <div className="h-[52px] px-4 sm:px-8 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-40 transition-colors hover:bg-zinc-50/50">
        <div className="flex items-center gap-3 text-[13px] font-medium text-zinc-600 tracking-tight cursor-pointer hover:text-zinc-900 transition-colors">
          <div className="w-4 h-4 bg-zinc-800 rounded-[3px] flex items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 border-2 border-white rounded-[1px]" />
          </div>
          <span>Home</span>
        </div>
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-1.5 cursor-pointer group active:scale-[0.98] transition-transform p-2 -mr-2 rounded-lg hover:bg-zinc-100/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all" />
            <span className="text-[12px] text-zinc-500 group-hover:text-zinc-800 transition-colors tracking-tight">2 online</span>
          </div>
        </div>
      </div>

      {/* Main Content - Full width responsive */}
      <div className="px-4 sm:px-8 py-6 sm:py-10 flex flex-col gap-8 sm:gap-10 w-full">

        {/* Welcome Back & Hero Header */}
        <div className="flex flex-col gap-2">
          <p className="tracking-tight text-[15px] text-zinc-600">Welcome back, <span className="text-zinc-900 text-[24px] font-bold tracking-tighter hover:text-blue-600 cursor-pointer transition-colors">Moyosoluwalorun.</span></p>

          <h1 className="text-[32px] md:text-[40px] font-bold text-zinc-900 font-sans leading-tight tracking-tighter mt-1">
            {isEmpty ? 'Your team has 0' : `Your team has ${overview?.metrics?.totalVulnerabilities || 0}`} <br className="hidden md:block" />active vulnerabilities
          </h1>
          <p className="text-[14px] text-zinc-500 font-sans max-w-xl leading-relaxed tracking-tight mt-1">
            {isEmpty
              ? 'In the last 24 hours your team has introduced 0 vulnerabilities. All services are running with clean compliance indices.'
              : `In the last 24 hours your team has introduced vulnerabilities related to SQL Injection, Exposed Secrets, and Dependency Changes.`}
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
              <span className="text-[44px] font-extrabold text-zinc-950 tracking-tighter leading-none group-hover:text-black transition-colors">{isEmpty ? '100' : overview?.metrics?.securityScore || '--'}</span>
              <span className="text-[13px] text-zinc-400 font-medium">/100</span>
              <span className={`text-[12px] font-bold bg-emerald-50 border border-emerald-100/50 rounded px-1.5 py-0.5 ml-2 font-mono ${isEmpty ? 'text-emerald-600' : 'text-emerald-700'}`}>{isEmpty ? 'A+' : 'B+'}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[12px] text-zinc-500">
              <span className="font-semibold text-emerald-600">{isEmpty ? '↑ Stable' : `↑ ${overview?.metrics?.scoreTrend?.value || '+6'} this week`}</span>
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
              <WidgetHeader viewAllHref="/dashboard/vulnerabilities" />

              {/* Distribution Stats */}
              <div className="p-4 bg-zinc-50/50 border-b border-zinc-100 grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Critical</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-red-600'}`}>{isEmpty ? '0' : vulnsSummary?.bySeverity.critical || 0}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">High</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-orange-500'}`}>{isEmpty ? '0' : vulnsSummary?.bySeverity.high || 0}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Medium</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400' : 'text-yellow-600'}`}>{isEmpty ? '0' : vulnsSummary?.bySeverity.medium || 0}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Resolved</span>
                  <span className={`text-[16px] font-bold ${isEmpty ? 'text-zinc-400 font-normal' : 'text-emerald-600'}`}>{isEmpty ? '--' : vulnsSummary?.byStatus.DISMISSED || 0}</span>
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
                  {(vulnerabilities || []).slice(0, 3).map((vuln: any, i: number) => (
                    <div key={vuln.id || i} className={`flex items-start gap-3 p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== 2 ? 'border-b border-zinc-100' : ''}`}>
                      <div className="mt-0.5">
                        <FaGithub className="w-[18px] h-[18px] text-zinc-900" />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">{vuln.title}</span>
                        <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 tracking-tight">
                          <div className={`w-2.5 h-2.5 rounded-full ${vuln.severity === 'critical' ? 'bg-[#da3633]' : vuln.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                          <span>Reported {vuln.updatedAt || vuln.lastRun}</span>
                          <span className="text-zinc-300">&middot;</span>
                          <div className="flex items-center gap-1">
                            <FaChartPie className="w-3.5 h-3.5 text-zinc-400" />
                            <span><span className="text-zinc-700 underline underline-offset-2">{vuln.source || 'Live Scan'}</span> / {vuln.file || 'Multiple assets'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Secrets Exposure Widget */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <WidgetHeader viewAllHref="/dashboard/vulnerabilities/secrets" options={repoNames} />

              {isEmpty || !(vulnerabilities?.filter(v => v.title.toLowerCase().includes('secret') || v.title.toLowerCase().includes('key') || v.title.toLowerCase().includes('token'))?.length) ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">No exposed secrets</span>
                  <p className="text-[11px] text-zinc-400 max-w-[220px] mt-0.5 leading-normal tracking-tight">AWS, Stripe, and JWT credentials are clean. Continuous monitoring active.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {vulnerabilities.filter(v => v.title.toLowerCase().includes('secret') || v.title.toLowerCase().includes('key') || v.title.toLowerCase().includes('token')).slice(0, 3).map((secret, i, arr) => (
                    <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== arr.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-[4px] border border-zinc-200/60 bg-zinc-50 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://cdn.jsdelivr.net/npm/simple-icons@12.0.0/icons/github.svg`}
                            alt=""
                            className="w-4.5 h-4.5 object-contain opacity-85 group-hover/row:opacity-100 transition-opacity"
                          />
                          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${secret.severity === 'critical' ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]' : 'bg-orange-500'
                            }`} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-red-600 transition-colors">{secret.title}</span>
                          <span className="text-[12px] text-zinc-400 font-mono tracking-tighter">{secret.file}</span>
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
              <WidgetHeader viewAllHref="/dashboard/prs" options={repoNames} />

              {isEmpty || !(aiExecution?.recentFixes?.length) ? (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-250 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><line x1="6" y1="9" x2="6" y2="21" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">All PRs verified</span>
                  <p className="text-[11px] text-zinc-400 max-w-[200px] mt-0.5 leading-normal tracking-tight">Every recent contribution has been fully scanned and approved.</p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-zinc-100">
                  {(aiExecution?.recentFixes || []).slice(0, 3).map((pr: any, i: number) => (
                    <div key={pr.id || i} className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group/row cursor-pointer active:scale-[0.99]">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black group-hover/row:bg-black group-hover/row:text-white transition-colors shadow-sm shrink-0">
                          <IconPR />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">
                            {pr.id && !pr.id.startsWith('#') ? `PR #${pr.id.slice(-4)}` : pr.id} — {pr.title}
                          </span>
                          <span className="text-[12px] text-zinc-500 tracking-tight group-hover/row:text-zinc-700 transition-colors">
                            {pr.status === 'MERGED' ? 'Merged automatically. Risk mitigated.' : pr.suggestions || `Confidence: ${pr.confidence}%`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-[11px] px-2 py-0.5 rounded font-semibold tracking-tight ${pr.score === 'Low Risk' || pr.confidence > 90 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                          }`}>{pr.score || (pr.confidence > 90 ? 'Low Risk' : 'High Risk')}</span>
                        <button className="flex items-center gap-1 text-[12px] font-medium text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-100 hover:border-zinc-300 px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer tracking-tight active:scale-95">
                          {pr.status === 'MERGED' ? 'View' : 'Fix'} <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-400 group-hover/row:text-zinc-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Architecture Intelligence */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card p-5 min-h-[580px]">
              <WidgetHeader viewAllHref="/dashboard/architecture" />

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

            {/* Column 3: Live Scan Pipeline (Exact Replica of Provided Blueprint) */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card min-h-[580px] p-6">

              {/* Header section matching controls in image */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[16px] font-bold text-zinc-900 tracking-tight">Live Scan Pipeline</h3>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden text-[13px] font-medium text-zinc-700">
                    <button className="px-3 py-1.5 hover:bg-zinc-50 border-r border-zinc-200 transition-colors">All projects</button>
                    <button className="px-3 py-1.5 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors">
                      Proposals
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer p-1">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isEmpty ? (
                <div className="my-auto py-24 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 mb-2 bg-zinc-50/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                  </div>
                  <span className="text-[14px] font-bold text-zinc-800 tracking-tight">Pipeline idle</span>
                  <p className="text-[13px] text-zinc-400 max-w-[200px] mt-1 leading-normal tracking-tight">Waiting for peer changes or next scheduled repository scan.</p>
                </div>
              ) : (
                <div className="flex flex-col w-full">

                  {/* Top Metrics Row: 4 Circular progress charts exactly like image */}
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-6 gap-x-4 w-full px-2 mb-10">
                    {/* Discoveries */}
                    <div className="flex flex-col items-center gap-2.5 flex-1">
                      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                        <svg className="w-[52px] h-[52px] transform -rotate-90">
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="#f4f4f5" strokeWidth="4" />
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-indigo-500" strokeDasharray={138.2} strokeDashoffset={138.2 - (64 / 100) * 138.2} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[12px] font-semibold text-zinc-800">64%</span>
                      </div>
                      <span className="text-[13px] text-zinc-600 tracking-tight">Discoveries</span>
                    </div>

                    {/* Briefs */}
                    <div className="flex flex-col items-center gap-2.5 flex-1">
                      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                        <svg className="w-[52px] h-[52px] transform -rotate-90">
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="#f4f4f5" strokeWidth="4" />
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-orange-400" strokeDasharray={138.2} strokeDashoffset={138.2 - (48 / 100) * 138.2} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[12px] font-semibold text-zinc-800">48%</span>
                      </div>
                      <span className="text-[13px] text-zinc-600 tracking-tight">Briefs</span>
                    </div>

                    {/* Timescales */}
                    <div className="flex flex-col items-center gap-2.5 flex-1">
                      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                        <svg className="w-[52px] h-[52px] transform -rotate-90">
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="#f4f4f5" strokeWidth="4" />
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-emerald-500" strokeDasharray={138.2} strokeDashoffset={138.2 - (16 / 100) * 138.2} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[12px] font-semibold text-zinc-800">16%</span>
                      </div>
                      <span className="text-[13px] text-zinc-600 tracking-tight">Timescales</span>
                    </div>

                    {/* Proposals */}
                    <div className="flex flex-col items-center gap-2.5 flex-1">
                      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                        <svg className="w-[52px] h-[52px] transform -rotate-90">
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="#f4f4f5" strokeWidth="4" />
                          <circle cx="26" cy="26" r="22" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-zinc-300" strokeDasharray={138.2} strokeDashoffset={138.2} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[12px] font-semibold text-zinc-800">0%</span>
                      </div>
                      <span className="text-[13px] text-zinc-600 tracking-tight">Proposals</span>
                    </div>
                  </div>

                  {/* Main Nested Tree checklist exactly like blueprint */}
                  <div className="flex flex-col gap-6 w-full">

                    {/* Tree Node 1: Hourglass (payments-api) */}
                    <div className="flex flex-col relative pl-1.5">
                      <div onClick={() => toggleNode('payments-api')} className="flex items-center gap-3 group cursor-pointer mb-2">
                        {expandedNodes['payments-api'] ? <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} /> : <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} />}
                        <div className="w-7 h-7 rounded-md bg-[#1d4ed8] flex items-center justify-center text-white shrink-0 shadow-sm">
                          <FaGithub className="w-4 h-4" />
                        </div>
                        <span className="text-[14px] font-semibold text-zinc-900 tracking-tight">payments-api</span>

                        <div className="ml-auto flex items-center gap-3">
                          <div className="w-8 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '66%' }} />
                          </div>
                          <span className="text-[13px] font-semibold text-zinc-800 w-8 text-right">66%</span>
                        </div>
                      </div>

                      {/* Tree branches */}
                      {expandedNodes['payments-api'] && (
                        <div className="flex flex-col gap-3 pl-[34px] relative mt-1">
                          {/* Vertical line */}
                          <div className="absolute left-[13px] top-1 bottom-4 w-px bg-zinc-200" />

                          {/* Step 1 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <CircleCheck className="w-[18px] h-[18px] text-zinc-800 fill-zinc-800/10" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-400 line-through tracking-tight">Workspace initialization</span>
                            <span className="ml-auto text-[13px] text-zinc-400 tracking-tight font-mono">12:01:03</span>
                          </div>

                          {/* Step 2 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <CircleCheck className="w-[18px] h-[18px] text-zinc-800 fill-zinc-800/10" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-400 line-through tracking-tight">AST parsing & discovery</span>
                            <span className="ml-auto text-[13px] text-zinc-400 tracking-tight font-mono">12:01:09</span>
                          </div>

                          {/* Step 3 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <Circle className="w-[18px] h-[18px] text-zinc-300" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-700 tracking-tight">Generative SAST scan</span>
                            <span className="ml-auto text-[13px] text-[#ef4444] tracking-tight font-mono animate-pulse font-bold">12:01:18</span>
                          </div>

                          {/* Step 4 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <Circle className="w-[18px] h-[18px] text-zinc-300" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-700 tracking-tight">Synthesize secure patch</span>
                            <span className="ml-auto text-[13px] text-zinc-500 tracking-tight font-mono">12:01:27</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tree Node 2: Layers (auth-service) */}
                    <div className="flex flex-col relative pl-1.5">
                      <div onClick={() => toggleNode('auth-service')} className="flex items-center gap-3 group cursor-pointer mb-2">
                        {expandedNodes['auth-service'] ? <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} /> : <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} />}
                        <div className="w-7 h-7 rounded-md bg-[#9333ea] flex items-center justify-center text-white shrink-0 shadow-sm opacity-90">
                          <FaGithub className="w-4 h-4" />
                        </div>
                        <span className="text-[14px] font-semibold text-zinc-900 tracking-tight">auth-service</span>

                        <div className="ml-auto flex items-center gap-3">
                          <div className="w-8 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '45%' }} />
                          </div>
                          <span className="text-[13px] font-semibold text-zinc-800 w-8 text-right">45%</span>
                        </div>
                      </div>

                      {/* Tree branches */}
                      {expandedNodes['auth-service'] && (
                        <div className="flex flex-col gap-3 pl-[34px] relative mt-1">
                          {/* Vertical line */}
                          <div className="absolute left-[13px] top-1 bottom-4 w-px bg-zinc-200" />

                          {/* Step 2.1 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <CircleCheck className="w-[18px] h-[18px] text-zinc-800 fill-zinc-800/10" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-400 line-through tracking-tight">Dependency tree mapping</span>
                            <span className="ml-auto text-[13px] text-zinc-400 tracking-tight font-mono">12:05:10</span>
                          </div>

                          {/* Step 2.2 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <Circle className="w-[18px] h-[18px] text-zinc-300" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-700 tracking-tight">Deep taint analysis</span>
                            <span className="ml-auto text-[13px] text-zinc-500 tracking-tight font-mono">12:05:22</span>
                          </div>

                          {/* Step 2.3 */}
                          <div className="flex items-center gap-3 relative">
                            <div className="bg-white z-10 shrink-0">
                              <Circle className="w-[18px] h-[18px] text-zinc-300" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] text-zinc-700 tracking-tight">Vulnerability verification</span>
                            <span className="ml-auto text-[13px] text-zinc-500 tracking-tight font-mono">12:05:35</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tree Node 3: Nietzsche (gateway-router) */}
                    <div onClick={() => toggleNode('gateway-router')} className="flex items-center gap-3 group cursor-pointer pl-1.5">
                      {expandedNodes['gateway-router'] ? <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} /> : <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} />}
                      <div className="w-7 h-7 rounded-md bg-[#ea580c] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <FaGithub className="w-4 h-4" />
                      </div>
                      <span className="text-[14px] font-semibold text-zinc-900 tracking-tight">gateway-router</span>

                      <div className="ml-auto flex items-center gap-3">
                        <div className="w-8 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '23%' }} />
                        </div>
                        <span className="text-[13px] font-semibold text-zinc-800 w-8 text-right">23%</span>
                      </div>
                    </div>
                    {/* Add expanded branch children conditionally if you want, but they are empty in design */}

                    {/* Tree Node 4: Galileo (billing-worker) */}
                    <div onClick={() => toggleNode('billing-worker')} className="flex items-center gap-3 group cursor-pointer pl-1.5">
                      {expandedNodes['billing-worker'] ? <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} /> : <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={2} />}
                      <div className="w-7 h-7 rounded-md bg-[#0ea5e9] flex items-center justify-center text-white shrink-0 shadow-sm opacity-80">
                        <FaGithub className="w-4 h-4" />
                      </div>
                      <span className="text-[14px] font-semibold text-zinc-900 tracking-tight">billing-worker</span>

                      <div className="ml-auto flex items-center gap-3">
                        <div className="w-8 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '0%' }} />
                        </div>
                        <span className="text-[13px] font-semibold text-zinc-800 w-8 text-right">0%</span>
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
            <WidgetHeader viewAllHref="/dashboard/activity" options={repoNames} />

            <div className="p-6">
              <h4 className="text-[13px] font-bold text-zinc-900 tracking-tight mb-5">This Week</h4>

              {isEmpty || !(overview?.securityEvents?.length) ? (
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

                  {(overview?.securityEvents || []).slice(0, 4).map((activity: any, i: number) => (
                    <div key={activity.id || i} className="flex gap-4 mb-6 relative group/event cursor-pointer">

                      {/* Event Icon */}
                      <div className="relative z-10 shrink-0 bg-white py-1 transition-transform duration-300 group-hover/event:scale-110">
                        {activity.type === 'comment' ? (
                          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                            <IconComment />
                          </div>
                        ) : activity.type === 'note' || activity.type === 'analysis' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                            <IconFile />
                          </div>
                        ) : activity.type === 'merge' || activity.type === 'fix' ? (
                          <div className="w-5 h-5 rounded-full bg-zinc-500 text-white flex items-center justify-center shadow-sm">
                            <IconMerge />
                          </div>
                        ) : activity.type === 'add' || activity.type === 'policy' ? (
                          <div className="w-5 h-5 rounded-full bg-zinc-400 text-white flex items-center justify-center shadow-sm">
                            <IconAdd />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full ${activity.color || 'bg-zinc-400'} text-white flex items-center justify-center shadow-sm`}>
                            <IconRemove />
                          </div>
                        )}
                      </div>

                      {/* Event Content */}
                      <div className="flex flex-col pt-1 flex-1 group-hover/event:bg-zinc-50/50 -my-2 py-2 px-2 -ml-2 rounded-lg transition-colors">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          {activity.user && <span className="text-[13px] font-semibold text-zinc-900 tracking-tight hover:underline hover:text-blue-600">{activity.user}</span>}
                          <span className="text-[13px] text-zinc-500 tracking-tight">{activity.action || activity.type}</span>
                          <span className="text-[13px] text-zinc-900 tracking-tight hover:underline cursor-pointer">{activity.target || activity.msg}</span>
                          {activity.inContext && <span className="text-[13px] text-zinc-500 tracking-tight">{activity.inContext}</span>}
                        </div>

                        {(activity.time || activity.time) && (
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
                        {(activity.quote || activity.detail) && (
                          <div className="mt-3 p-3 border border-zinc-200 rounded-lg bg-white shadow-sm flex items-start justify-between cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 transition-all group/quote active:scale-[0.99]">
                            <p className="text-[13px] text-zinc-700 leading-relaxed tracking-tight max-w-[90%] group-hover/quote:text-zinc-900 transition-colors">
                              {activity.quote || activity.detail}
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
