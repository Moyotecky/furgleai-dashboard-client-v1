'use client';

import React from 'react';
import {
  GitBranch,
  MoreHorizontal,
  ArrowUpRight,
  GitPullRequest,
  Activity
} from 'lucide-react';

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
  { user: 'Alex Chen', action: 'merged PR #402 in auth-service', time: '10m ago', userImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop' },
  { user: 'Sarah Jen', action: 'triggered Deep Audit on backend-api', time: '1h ago', userImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop' },
  { user: 'Mike Ross', action: 'commented on Prototype Pollution vulnerability', time: '3h ago', userImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&fit=crop' },
];

// Helper to render the circular branch/chevron icon
const ChevronCircleIcon = ({ colorClass }: { colorClass: string }) => (
  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${colorClass}`}>
    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export function OverviewView() {
  return (
    <div className="flex flex-col min-h-screen pb-20 w-full font-sans tracking-tight">

      {/* Top Bar */}
      <div className="h-[52px] px-8 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-40">
        <div className="flex items-center gap-3 text-[13px] font-medium text-zinc-600">
          <div className="w-4 h-4 bg-zinc-800 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 border-2 border-white rounded-sm" />
          </div>
          <span>Home</span>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer group">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all" />
          <span className="text-[12px] text-zinc-500 group-hover:text-zinc-800 transition-colors">2 online</span>
        </div>
      </div>

      {/* Main Content - Full width responsive */}
      <div className="px-8 py-10 flex flex-col gap-12 w-full">

        {/* Hero */}
        <div className="flex flex-col gap-2">
          <p>Welcome back, <span className="text-zinc-900 text-[24px] font-bold">Moyosoluwalorun.</span></p>

          <h1 className="text-[32px] md:text-[40px] font-bold text-zinc-900 font-sans leading-tight">
            Your team has 12 <br className="hidden md:block" />active vulnerabilities
          </h1>
          <p className="text-[14px] text-zinc-500 font-sans max-w-xl tracking-tighter leading-relaxed mt-1">
            In the last 24 hours your team has introduced vulnerabilities related to SQL Injection, Exposed Secrets, and Dependency Changes.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 border-y border-zinc-100 py-5 w-full">
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">Security Score</span>
            <span className="text-[22px] font-bold text-zinc-900">84<span className="text-[14px] text-zinc-400 font-medium">/100</span></span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">Critical Vulns</span>
            <span className="text-[22px] font-bold text-red-600">3</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">AI Cost Usage</span>
            <span className="text-[22px] font-bold text-zinc-900">$14.20</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">Connected Repos</span>
            <span className="text-[22px] font-bold text-zinc-900">12</span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">PRs Reviewed</span>
            <span className="text-[22px] font-bold text-zinc-900">28 <span className="text-[12px] text-emerald-500 font-medium ml-1">+4 today</span></span>
          </div>
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase group-hover:text-zinc-600 transition-colors">Throughput</span>
            <span className="text-[22px] font-bold text-zinc-900">2.4s <span className="text-[12px] text-zinc-400 font-medium ml-1">avg scan</span></span>
          </div>
        </div>

        {/* 
          Section 1: Active Vulnerabilities & Critical Vulnerabilities 
          Layout: 2-column Grid (Next to each other)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900">Vulnerability Status</h2>
            <p className="text-[14px] text-zinc-500">Overview of all active and critical threats across your connected repositories.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Active Vulnerabilities */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                  <h3 className="text-[13px] font-semibold text-zinc-900">Active Vulnerabilities</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
              </div>
              <div className="flex flex-col">
                {ACTIVE_VULNERABILITIES.map((vuln, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer active:scale-[0.99] ${i !== ACTIVE_VULNERABILITIES.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <ChevronCircleIcon colorClass={
                        vuln.severity === 'critical' ? 'border-red-500 text-red-500' :
                          vuln.severity === 'high' ? 'border-orange-500 text-orange-500' :
                            'border-yellow-500 text-yellow-500'
                      } />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-zinc-900">{vuln.title}</span>
                        <span className="text-[12px] text-zinc-400 font-mono">{vuln.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] font-mono text-zinc-400">VULN-{100 + i}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vuln.userImg} alt="User" className="w-5 h-5 rounded-full object-cover border border-zinc-200 hover:scale-110 transition-transform" />
                      <span className="text-[12px] text-zinc-400 w-8 text-right">{vuln.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Vulnerabilities */}
            <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
                  <h3 className="text-[13px] font-semibold text-zinc-900">Critical Vulnerabilities</h3>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
              </div>
              <div className="flex flex-col">
                {CRITICAL_VULNERABILITIES.map((vuln, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer active:scale-[0.99] ${i !== CRITICAL_VULNERABILITIES.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <ChevronCircleIcon colorClass="border-red-500 text-red-500" />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-medium text-zinc-900">{vuln.title}</span>
                        <span className="text-[12px] text-zinc-400 font-mono">{vuln.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] font-mono text-zinc-400">VULN-C{200 + i}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vuln.userImg} alt="User" className="w-5 h-5 rounded-full object-cover border border-zinc-200 hover:scale-110 transition-transform" />
                      <span className="text-[12px] text-zinc-400 w-8 text-right">{vuln.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 
          Section 2: Active Scans
          Layout: Blocked (Full width under)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900">Scan Pipeline</h2>
            <p className="text-[14px] text-zinc-500">Live visibility into ongoing and queued security audits.</p>
          </div>

          <div className="border border-zinc-200 rounded-[12px] bg-white flex flex-col w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-zinc-800/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-zinc-500 border-t-transparent" />
                </div>
                <h3 className="text-[13px] font-semibold text-zinc-900">Active Scans</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-lg p-0.5">
                  <button className="px-2.5 py-1 text-[12px] font-medium text-zinc-600 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer">Running</button>
                  <button className="px-2.5 py-1 text-[12px] font-medium text-zinc-900 bg-white rounded-md shadow-sm border border-zinc-200/60 cursor-pointer">Assigned to You</button>
                </div>
                <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors ml-2">View All</button>
              </div>
            </div>
            <div className="flex flex-col p-2 gap-1">
              {ACTIVE_SCANS.map((scan, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 hover:bg-zinc-50 rounded-lg transition-colors group cursor-pointer active:scale-[0.99]">
                  <span className="text-[13px] font-medium text-zinc-700 group-hover:text-zinc-900">{scan.task}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-zinc-400 group-hover:text-zinc-500 transition-colors">{scan.tag}</span>
                    <button className="text-zinc-400 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 
          Section 3: PRs Reviewed Today
          Layout: Blocked (Full width under)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900">Pull Requests</h2>
            <p className="text-[14px] text-zinc-500">Security reviews generated by FurgleAI across your codebase integrations.</p>
          </div>

          <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                <h3 className="text-[13px] font-semibold text-zinc-900">PRs Reviewed Today</h3>
              </div>
              <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
            </div>
            <div className="flex flex-col">
              {PRS_REVIEWED.map((pr, i) => (
                <div key={i} className={`p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group cursor-pointer active:scale-[0.99] ${i !== PRS_REVIEWED.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black">
                      <GitPullRequest className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-zinc-900">{pr.title}</span>
                      <span className="text-[12px] text-zinc-500">{pr.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {pr.status && (
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${pr.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
                        }`}>
                        {pr.status}
                      </span>
                    )}
                    <button className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-50 px-3 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer">
                      Review <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pr.userImg} alt="User" className="w-6 h-6 rounded-full object-cover border border-zinc-200 ml-1 hover:scale-110 transition-transform" />
                    <span className="text-[12px] text-zinc-400 font-medium w-8 text-right">{pr.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 
          Section 4: Team Activity
          Layout: Blocked (Full width under)
        */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-zinc-900">Team Activity</h2>
            <p className="text-[14px] text-zinc-500">Real-time feed of actions taken by team members across the organization.</p>
          </div>

          <div className="flex flex-col border border-zinc-200 rounded-[12px] bg-white w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                <h3 className="text-[13px] font-semibold text-zinc-900">Team Activity</h3>
              </div>
              <button className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
            </div>
            <div className="flex flex-col">
              {TEAM_ACTIVITY.map((activity, i) => (
                <div key={i} className={`p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors group cursor-pointer active:scale-[0.99] ${i !== TEAM_ACTIVITY.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={activity.userImg} alt="User" className="w-6 h-6 rounded-full object-cover border border-zinc-200" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-medium text-zinc-900">{activity.user}</span>
                      <span className="text-[13px] text-zinc-500">{activity.action}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[12px] text-zinc-400 font-medium">{activity.time}</span>
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
