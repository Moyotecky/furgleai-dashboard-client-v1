'use client';

import React from 'react';

// Custom Minimal Enterprise SVGs
const IconBranch = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="6" y1="3" x2="6" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9a9 9 0 0 1-9 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPulse = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPR = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 6h3a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="9" x2="6" y2="21" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMore = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
  </svg>
);

const IconComment = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMerge = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V9a9 9 0 0 0 9 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAdd = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRemove = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Helper to render the circular branch/chevron icon
const ChevronCircleIcon = ({ colorClass }: { colorClass: string }) => (
  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${colorClass}`}>
    <svg viewBox="0 0 24 24" className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Mock Data
const ACTIVE_VULNERABILITIES = [
  { id: 'backend-api', title: 'SQL Injection in user-service', severity: 'critical', time: '26m', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { id: 'auth-service', title: 'Exposed JWT Secret', severity: 'high', time: '45m', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
  { id: 'dashboard-ui', title: 'Prototype Pollution', severity: 'medium', time: '7h', userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&fit=crop' },
  { id: 'dashboard-ui', title: 'Outdated dependency (lodash)', severity: 'low', time: '1d', userImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&fit=crop' },
];

const CRITICAL_VULNERABILITIES = [
  { id: 'backend-api', title: 'SQL Injection in user-service', severity: 'critical', time: '26m', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { id: 'auth-service', title: 'RCE in image processing pipeline', severity: 'critical', time: '1h', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
  { id: 'payment-gateway', title: 'Insecure Direct Object Reference', severity: 'critical', time: '4h', userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&fit=crop' },
];

const ACTIVE_SCANS = [
  { task: 'Scan PR #402 (auth-service)', tag: 'PR-402' },
  { task: 'Deep Audit on backend-api', tag: 'AUDIT-1934' },
  { task: 'Review infrastructure-as-code', tag: 'IAC-234' },
  { task: 'Daily recurring scan', tag: 'CRON-234' },
];

const PRS_REVIEWED = [
  { title: 'Fix SQL Injection in user.controller', desc: 'Reviewed by AI Agent, 2 vulnerabilities patched', status: 'Approved', time: '3m', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { title: 'Rotate JWT Secret', desc: 'Manual review required on exposed secrets', time: '12m', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
  { title: 'Bump lodash from 4.17.20 to 4.17.21', desc: 'Automated dependency bump', status: 'Merged', time: '2h', userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&fit=crop' },
];

const TEAM_ACTIVITY = [
  { 
    id: 1, 
    type: 'comment',
    user: 'Nico Greenberg', 
    action: 'mentioned', 
    target: 'Progression Ventures', 
    inContext: 'in a comment.', 
    time: 'Friday, 4:16PM', 
    meta: 'Hiring > Dianne Russell',
    quote: '...project with Progression Ventures is going to take a pair of extra hands to complete in time, we should look at getting Dianne onboard for a...' 
  },
  { 
    id: 2, 
    type: 'comment',
    user: 'Nico Greenberg', 
    action: 'commented on', 
    target: 'Progression Ventures.', 
    inContext: '', 
    time: 'Tuesday, 2:31PM', 
    meta: 'Clients',
    quote: 'We finalized Progression\'s terms this morning. Everything is moving forward!' 
  },
  { 
    id: 3, 
    type: 'merge',
    user: 'System', 
    action: '', 
    target: 'progression.io was merged into Progression Ventures', 
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
    target: 'Progression Ventures was added to Clients.', 
    inContext: '', 
    time: '', 
    meta: '',
    quote: '' 
  },
  { 
    id: 5, 
    type: 'remove',
    user: 'System', 
    action: '', 
    target: 'Progression Ventures was removed from Inbound Deals.', 
    inContext: '', 
    time: '', 
    meta: '',
    quote: '' 
  },
  { 
    id: 6, 
    type: 'note',
    user: 'Nico Greenberg', 
    action: 'mentioned', 
    target: 'Progression Ventures', 
    inContext: 'in the note Q2 Design Review.', 
    time: '1 month ago', 
    meta: 'Clients > Stripe',
    quote: '1.1.3. Similar Companies' 
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
      <div className="px-8 py-10 flex flex-col gap-12 w-full">
        
        {/* Hero */}
        <div className="flex flex-col gap-2">
          <p className="tracking-tight text-[15px] text-zinc-600">Welcome back, <span className="text-zinc-900 text-[24px] font-bold tracking-tighter hover:text-blue-600 cursor-pointer transition-colors">Moyosoluwalorun</span></p>

          <h1 className="text-[32px] md:text-[40px] font-bold text-zinc-900 font-sans leading-tight tracking-tighter mt-1">
            Your team has 12 <br className="hidden md:block"/>active vulnerabilities
          </h1>
          <p className="text-[14px] text-zinc-500 font-sans max-w-xl leading-relaxed tracking-tight mt-1">
            In the last 24 hours your team has introduced vulnerabilities related to SQL Injection, Exposed Secrets, and Dependency Changes.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 border-y border-zinc-100 py-5 w-full">
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Security Score</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">84<span className="text-[14px] text-zinc-400 font-medium tracking-tight">/100</span></span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Critical Vulns</span>
            <span className="text-[22px] font-bold text-red-600 tracking-tighter group-hover:text-red-700 transition-colors">3</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">AI Cost Usage</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">$14.20</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Connected Repos</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">12</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">PRs Reviewed</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">28 <span className="text-[12px] text-emerald-500 font-medium ml-1 tracking-tight">+4 today</span></span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group active:scale-[0.97] transition-transform hover:bg-zinc-50 p-2 -m-2 rounded-lg">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight group-hover:text-zinc-600 transition-colors">Throughput</span>
            <span className="text-[22px] font-bold text-zinc-900 tracking-tighter group-hover:text-blue-600 transition-colors">2.4s <span className="text-[12px] text-zinc-400 font-medium ml-1 tracking-tight">avg scan</span></span>
          </div>
        </div>

        {/* Section 1: Active Vulnerabilities & Critical Vulnerabilities */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Vulnerability Status</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Overview of all active and critical threats across your connected repositories.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Active Vulnerabilities */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconBranch /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Active Vulnerabilities</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>
              <div className="flex flex-col">
                {ACTIVE_VULNERABILITIES.map((vuln, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== ACTIVE_VULNERABILITIES.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <ChevronCircleIcon colorClass={
                        vuln.severity === 'critical' ? 'border-red-500 text-red-500 group-hover/row:scale-110 transition-transform' :
                        vuln.severity === 'high' ? 'border-orange-500 text-orange-500 group-hover/row:scale-110 transition-transform' :
                        'border-yellow-500 text-yellow-500 group-hover/row:scale-110 transition-transform'
                      } />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">{vuln.title}</span>
                        <span className="text-[12px] text-zinc-400 font-mono tracking-tighter group-hover/row:text-zinc-600 transition-colors">{vuln.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] font-mono text-zinc-400 tracking-tighter group-hover/row:text-zinc-600 transition-colors">VULN-{100 + i}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vuln.userImg} alt="User" className="w-5 h-5 rounded-full object-cover border border-zinc-200 group-hover/row:scale-110 group-hover/row:shadow-md transition-all" />
                      <span className="text-[12px] text-zinc-400 w-8 text-right tracking-tight">{vuln.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Vulnerabilities */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
                <div className="flex items-center gap-2">
                  <div className="text-red-500 group-hover/header:text-red-600 group-hover/header:scale-110 transition-all"><IconBranch /></div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-red-600 transition-colors">Critical Vulnerabilities</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
              </div>
              <div className="flex flex-col">
                {CRITICAL_VULNERABILITIES.map((vuln, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group/row active:scale-[0.99] ${i !== CRITICAL_VULNERABILITIES.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <ChevronCircleIcon colorClass="border-red-500 text-red-500 group-hover/row:scale-110 transition-transform" />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-red-600 transition-colors">{vuln.title}</span>
                        <span className="text-[12px] text-zinc-400 font-mono tracking-tighter group-hover/row:text-zinc-600 transition-colors">{vuln.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] font-mono text-zinc-400 tracking-tighter group-hover/row:text-zinc-600 transition-colors">VULN-C{200 + i}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vuln.userImg} alt="User" className="w-5 h-5 rounded-full object-cover border border-zinc-200 group-hover/row:scale-110 group-hover/row:shadow-md transition-all" />
                      <span className="text-[12px] text-zinc-400 w-8 text-right tracking-tight">{vuln.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Active Scans */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Scan Pipeline</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Live visibility into ongoing and queued security audits.</p>
          </div>
          
          <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow group/card">
            <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-zinc-800/10 flex items-center justify-center group-hover/header:rotate-180 transition-transform duration-500">
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-zinc-500 border-t-transparent group-hover/header:border-blue-600" />
                </div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Active Scans</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-lg p-0.5">
                  <button className="px-2.5 py-1 text-[12px] font-medium text-zinc-600 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer tracking-tight active:scale-95">Running</button>
                  <button className="px-2.5 py-1 text-[12px] font-medium text-zinc-900 bg-white rounded-md shadow-sm border border-zinc-200/60 cursor-pointer tracking-tight active:scale-95 hover:border-zinc-300 transition-all">Assigned to You</button>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all ml-2 tracking-tight active:scale-95">View All</button>
              </div>
            </div>
            <div className="flex flex-col p-2 gap-1">
              {ACTIVE_SCANS.map((scan, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 hover:bg-zinc-50 rounded-lg transition-colors group/row cursor-pointer active:scale-[0.99]">
                  <span className="text-[13px] font-medium text-zinc-700 group-hover/row:text-blue-600 transition-colors tracking-tight">{scan.task}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-zinc-400 group-hover/row:text-zinc-600 transition-colors tracking-tighter">{scan.tag}</span>
                    <button className="text-zinc-400 hover:text-blue-600 hover:bg-blue-50 p-1 rounded-md opacity-0 group-hover/row:opacity-100 transition-all active:scale-95">
                      <IconMore />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: PRs Reviewed Today */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Pull Requests</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Security reviews generated by FurgleAI across your codebase integrations.</p>
          </div>
          
          <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow group/card">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
              <div className="flex items-center gap-2">
                <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconPR /></div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">PRs Reviewed Today</h3>
              </div>
              <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-all tracking-tight active:scale-95">View All</button>
            </div>
            <div className="flex flex-col">
              {PRS_REVIEWED.map((pr, i) => (
                <div key={i} className={`p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group/row cursor-pointer active:scale-[0.99] ${i !== PRS_REVIEWED.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black group-hover/row:bg-black group-hover/row:text-white transition-colors shadow-sm">
                      <IconPR />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-zinc-900 tracking-tight group-hover/row:text-blue-600 transition-colors">{pr.title}</span>
                      <span className="text-[12px] text-zinc-500 tracking-tight group-hover/row:text-zinc-700 transition-colors">{pr.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {pr.status && (
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium tracking-tight transition-colors ${
                        pr.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 group-hover/row:bg-emerald-200' : 'bg-zinc-100 text-zinc-600 group-hover/row:bg-zinc-200'
                      }`}>
                        {pr.status}
                      </span>
                    )}
                    <button className="flex items-center gap-1 text-[12px] font-medium text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-100 hover:border-zinc-300 px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer tracking-tight active:scale-95">
                      Review <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-400 group-hover/row:text-zinc-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pr.userImg} alt="User" className="w-6 h-6 rounded-full object-cover border border-zinc-200 ml-1 group-hover/row:scale-110 group-hover/row:shadow-md transition-all" />
                    <span className="text-[12px] text-zinc-400 font-medium w-8 text-right tracking-tight">{pr.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Team Activity */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900 tracking-tight">Team Activity</h2>
            <p className="text-[14px] text-zinc-500 tracking-tight">Real-time feed of actions taken by team members across the organization.</p>
          </div>
          
          <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow group/card">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group/header hover:bg-zinc-50 transition-colors rounded-t-[12px]">
              <div className="flex items-center gap-2">
                <div className="text-zinc-400 group-hover/header:text-blue-600 transition-colors"><IconPulse /></div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight group-hover/header:text-blue-600 transition-colors">Team Activity</h3>
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
                        {activity.user && <span className="text-[13px] font-medium text-zinc-900 tracking-tight hover:underline hover:text-blue-600">{activity.user}</span>}
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
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round"/>
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

      </div>
    </div>
  );
}
