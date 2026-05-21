'use client';

import React from 'react';

export function RepoSettingsView() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">Repository Settings</h2>
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm flex flex-col gap-6">
        
        <div>
          <label className="block text-sm font-semibold text-zinc-900 mb-2">Target Branch</label>
          <input type="text" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" defaultValue="main" />
          <p className="text-xs text-zinc-500 mt-1">The primary branch used for deep scans and baselines.</p>
        </div>

        <div>
           <label className="block text-sm font-semibold text-zinc-900 mb-2">Scan Frequency</label>
           <select className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
             <option>Continuous (On Push)</option>
             <option>Daily</option>
             <option>Weekly</option>
           </select>
        </div>
        
        <div className="pt-4 border-t border-zinc-100 flex justify-end">
          <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800">Save Changes</button>
        </div>

      </div>
    </div>
  );
}
