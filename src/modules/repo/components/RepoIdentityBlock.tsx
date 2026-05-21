'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';

export function RepoIdentityBlock({ repoName }: { repoName: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-[10px] bg-white border border-zinc-200 flex items-center justify-center shadow-sm shrink-0">
          <FaGithub className="w-6 h-6 text-zinc-900" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">{repoName}</h1>
            <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-medium tracking-tight border border-zinc-200/80">main</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[13px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              Healthy
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
            <span>Last scanned 2m ago</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white border border-zinc-200 rounded-[10px] p-3 shadow-sm">
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Security Score</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[24px] font-bold text-zinc-900 leading-none tracking-tighter">82</span>
            <span className="text-[14px] font-medium text-zinc-400">/100</span>
          </div>
        </div>
        {/* Simple Ring Chart */}
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f4f4f5"
              strokeWidth="4"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="82, 100"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
