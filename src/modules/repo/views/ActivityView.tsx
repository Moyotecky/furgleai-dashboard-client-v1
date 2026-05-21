'use client';

import React from 'react';

export function ActivityView() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">Recent Activity</h2>
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
        <div className="relative border-l border-zinc-200 ml-4 space-y-8 pb-4">
          <div className="relative pl-6">
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white"></div>
            <p className="text-sm text-zinc-500 mb-1">10 mins ago</p>
            <p className="font-semibold text-zinc-900">AI Fix Merged</p>
            <p className="text-sm text-zinc-600 mt-1">FurgleAI merged a fix for Weak JWT Validation in <code className="bg-zinc-100 px-1 rounded">auth/token.ts</code></p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white"></div>
            <p className="text-sm text-zinc-500 mb-1">2 hours ago</p>
            <p className="font-semibold text-zinc-900">Deep Scan Completed</p>
            <p className="text-sm text-zinc-600 mt-1">Found 4 new vulnerabilities. 2 auto-fixes generated.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
