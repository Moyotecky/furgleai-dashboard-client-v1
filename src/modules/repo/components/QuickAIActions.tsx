'use client';

import React from 'react';
import { Play, Search, Wrench, GitPullRequest, BrainCircuit } from 'lucide-react';

const ACTIONS = [
  { id: 'run-scan', label: 'Run Scan', icon: Play, color: 'text-zinc-700', bg: 'bg-white hover:bg-zinc-50' },
  { id: 'deep-scan', label: 'Deep Scan Repository', icon: Search, color: 'text-zinc-700', bg: 'bg-white hover:bg-zinc-50' },
  { id: 'fix-critical', label: 'Fix Critical Issues', icon: Wrench, color: 'text-red-600', bg: 'bg-red-50 hover:bg-red-100 border-red-200' },
  { id: 'generate-pr', label: 'Generate Security PR', icon: GitPullRequest, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
  { id: 'ai-review', label: 'AI Architecture Review', icon: BrainCircuit, color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
];

export function QuickAIActions() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] text-[13px] font-semibold tracking-tight transition-all active:scale-[0.98] border border-zinc-200 shadow-sm cursor-pointer ${action.bg} ${action.color}`}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
