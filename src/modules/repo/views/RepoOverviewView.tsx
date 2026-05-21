'use client';

import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Flag, Activity, Search, UploadCloud, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function RepoOverviewView() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-zinc-900 overflow-x-hidden">
      
      {/* 1. TOP METRICS HEADER */}
      <div className="px-6 py-6 border-b border-zinc-200/80">
        <h1 className="text-[22px] font-bold tracking-tight mb-6">Security Posture Overview</h1>
        
        <div className="flex items-center gap-12">
          {/* Circular Progress Metric */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">OVERALL SCORE</span>
            <div className="flex items-center gap-2.5">
               <div className="relative w-5 h-5">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e4e4e7" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="82, 100" />
                  </svg>
               </div>
               <div className="flex items-baseline gap-1">
                 <span className="text-[15px] font-bold text-zinc-900">82%</span>
                 <span className="text-[14px] text-zinc-500">- B Grade</span>
               </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">OPEN RISKS</span>
            <div className="text-[14px] font-bold text-zinc-900">6 <span className="text-zinc-500 font-normal">Active</span></div>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">AI AUTOMATION</span>
            <div className="text-[14px] font-bold text-zinc-900">14 <span className="text-zinc-500 font-normal">Fixes Merged</span></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 w-full max-w-5xl">
        <h2 className="text-[14px] font-bold text-zinc-900 tracking-tight mb-4 uppercase">Latest Security Events</h2>
        <div className="border border-zinc-200/80 rounded-[8px] overflow-hidden">
          
          <div className="grid grid-cols-[1fr_200px_200px_140px] px-4 py-2 border-b border-zinc-200/80 bg-zinc-50/50">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">EVENT</div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">INITIATOR</div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">IMPACT</div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">STATUS</div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-[1fr_200px_200px_140px] px-4 py-3.5 border-b border-zinc-200/80 hover:bg-zinc-50/50 transition-colors">
             <div className="flex items-center gap-3 pr-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                   <Activity className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-zinc-900">Live Scan Completed</span>
                   <span className="text-[12px] text-zinc-500">Found 2 new vulnerabilities in auth logic.</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold shadow-sm">AI</div>
                <span className="text-[13px] font-bold text-zinc-900">FurgleAI</span>
             </div>
             <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
                <FileText className="w-3.5 h-3.5 text-zinc-400" /> 2 Findings
             </div>
             <div>
                <span className="text-[12px] font-bold text-emerald-600">Success</span>
             </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-[1fr_200px_200px_140px] px-4 py-3.5 border-b border-zinc-200/80 hover:bg-zinc-50/50 transition-colors">
             <div className="flex items-center gap-3 pr-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                   <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-zinc-900">Auto-Fix Merged</span>
                   <span className="text-[12px] text-zinc-500">Patched missing CSRF token in settings API.</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-white text-[9px] font-bold shadow-sm">FS</div>
                <span className="text-[13px] font-bold text-zinc-900">Felix Schmidt</span>
             </div>
             <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/></svg> +1 Policy met
             </div>
             <div>
                <span className="text-[12px] font-bold text-emerald-600">Merged</span>
             </div>
          </div>
          
          {/* Row 3 */}
          <div className="grid grid-cols-[1fr_200px_200px_140px] px-4 py-3.5 border-zinc-200/80 hover:bg-zinc-50/50 transition-colors">
             <div className="flex items-center gap-3 pr-4">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                   <ShieldAlert className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[13px] font-bold text-zinc-900">Critical Secret Detected</span>
                   <span className="text-[12px] text-zinc-500">Stripe API key found in `.env.example`.</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold shadow-sm">AI</div>
                <span className="text-[13px] font-bold text-zinc-900">FurgleAI</span>
             </div>
             <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
                <UploadCloud className="w-3.5 h-3.5 text-zinc-400" /> Data Risk
             </div>
             <div>
                <span className="text-[12px] font-bold text-red-600">Requires Action</span>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
