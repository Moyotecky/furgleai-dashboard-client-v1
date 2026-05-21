'use client';

import React from 'react';
import { Play, CheckCircle2, Zap, GitPullRequest, Search } from 'lucide-react';

export function RemediationControlBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full bg-white border border-zinc-200/80 p-1.5 rounded-[10px] shadow-sm">
      
      {/* Primary Autonomous Action */}
      <button className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-semibold text-[13px] tracking-tight shadow-sm transition-colors active:scale-95 group">
        <Play className="w-3.5 h-3.5 fill-white" />
        Run Scan
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block" />

      {/* Auto Fix Actions */}
      <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-100 hover:border-emerald-300 px-3.5 py-2 rounded-lg font-semibold text-[13px] tracking-tight transition-all active:scale-95">
        <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
        Auto Fix Critical
      </button>

      <button className="flex items-center gap-2 bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 px-3.5 py-2 rounded-lg font-medium text-[13px] tracking-tight transition-colors active:scale-95">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Bulk Fix Selected
      </button>

      <button className="flex items-center gap-2 bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 px-3.5 py-2 rounded-lg font-medium text-[13px] tracking-tight transition-colors active:scale-95">
        <GitPullRequest className="w-3.5 h-3.5" />
        Generate Fix PR
      </button>

      <button className="flex items-center gap-2 bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 px-3.5 py-2 rounded-lg font-medium text-[13px] tracking-tight transition-colors active:scale-95">
        <Search className="w-3.5 h-3.5" />
        AI Deep Review
      </button>

      {/* Global AI Action - Pushed to right on desktop */}
      <div className="ml-auto flex items-center">
        <button className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg font-semibold text-[13px] tracking-tight shadow-sm transition-colors active:scale-95">
          <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          Fix All Safe Vulnerabilities
        </button>
      </div>

    </div>
  );
}
