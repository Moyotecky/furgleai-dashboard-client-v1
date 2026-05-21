'use client';

import React from 'react';

export function WorkflowsView() {
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">Security Workflows</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-900">Autonomous Remediation</h3>
            <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <p className="text-sm text-zinc-500">Allow FurgleAI to automatically generate and merge fixes for high-confidence vulnerabilities.</p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-900">PR Blocking</h3>
            <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <p className="text-sm text-zinc-500">Block pull requests that introduce new critical or high severity vulnerabilities.</p>
        </div>
      </div>
    </div>
  );
}
