'use client';

import React from 'react';

export function LiveScanView() {
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">Live Execution Engine</h2>
      <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm text-center">
        <div className="animate-pulse bg-indigo-50 text-indigo-700 inline-block px-4 py-2 rounded-full font-semibold text-sm mb-4">
          Deep Scan in Progress
        </div>
        <p className="text-zinc-600">Processing file <code className="bg-zinc-100 px-1 rounded">src/utils/parser.ts</code> (842 / 1,287)</p>
        
        {/* Placeholder for real-time pipeline visualization */}
        <div className="mt-8 flex justify-center gap-4">
           <div className="w-24 h-2 bg-emerald-500 rounded-full"></div>
           <div className="w-24 h-2 bg-emerald-500 rounded-full"></div>
           <div className="w-24 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
           <div className="w-24 h-2 bg-zinc-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
