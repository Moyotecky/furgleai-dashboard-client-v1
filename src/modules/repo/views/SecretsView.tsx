'use client';

import React from 'react';
import { Key } from 'lucide-react';

export function SecretsView() {
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-6">Exposed Secrets</h2>
      <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-100">
           <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-lg">
             <Key className="w-5 h-5 text-red-600" />
           </div>
           <div>
             <h3 className="font-semibold text-zinc-900">1 Critical Secret Exposed</h3>
             <p className="text-sm text-zinc-500">Found in commit history.</p>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-200">
                <th className="pb-3 font-medium">Secret Type</th>
                <th className="pb-3 font-medium">Value (Masked)</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-800">
              <tr className="border-b border-zinc-100">
                <td className="py-4 font-medium">Stripe API Key</td>
                <td className="py-4 font-mono text-zinc-500">sk_live_51Nx••••••••••••</td>
                <td className="py-4"><code className="bg-zinc-100 px-1 rounded text-xs">.env.example</code></td>
                <td className="py-4"><span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-bold">Action Required</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
