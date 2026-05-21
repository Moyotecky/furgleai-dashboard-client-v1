'use client';

import React from 'react';
import { Network } from 'lucide-react';

export function ArchitectureView() {
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">System Architecture</h2>
      <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
         <Network className="w-12 h-12 text-zinc-300 mb-4" />
         <h3 className="text-lg font-semibold text-zinc-900">Interactive Service Graph</h3>
         <p className="text-zinc-500 mt-2 max-w-md">Visualize endpoints, auth flows, and risky zones. FurgleAI automatically maps how your system works.</p>
         <button className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800">Generate Map</button>
      </div>
    </div>
  );
}
