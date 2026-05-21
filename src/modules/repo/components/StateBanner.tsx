'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Bot } from 'lucide-react';

export type RepoState = 'healthy' | 'active_threat' | 'live_execution' | 'ai_autonomous';

// In a real app, this state would come from a context or store.
// For now, we'll default to healthy. You can change this to test different states.
const currentState: RepoState = 'healthy';

export function StateBanner() {
  if (currentState === 'healthy') return null; // Or show a subtle green bar

  if (currentState === 'active_threat') {
    return (
      <div className="w-full bg-red-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-semibold tracking-tight animate-pulse">
        <ShieldAlert className="w-4 h-4" />
        4 Critical Vulnerabilities Detected — AI Fixes Available
      </div>
    );
  }

  if (currentState === 'live_execution') {
    return (
      <div className="w-full bg-indigo-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-semibold tracking-tight">
        <Activity className="w-4 h-4 animate-spin-slow" />
        Deep scan running... 842 / 1,287 files processed
      </div>
    );
  }

  if (currentState === 'ai_autonomous') {
    return (
      <div className="w-full bg-emerald-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-semibold tracking-tight">
        <Bot className="w-4 h-4" />
        AI Autonomous Mode Active — 3 remediation PRs generated automatically
      </div>
    );
  }

  return null;
}
