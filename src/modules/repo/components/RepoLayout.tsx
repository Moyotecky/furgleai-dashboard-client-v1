'use client';

import React from 'react';
import { RepoIdentityBlock } from './RepoIdentityBlock';
import { QuickAIActions } from './QuickAIActions';
import { RepoTabNav } from './RepoTabNav';
import { StateBanner } from './StateBanner';

export function RepoLayout({ children, repoSlug }: { children: React.ReactNode, repoSlug: string }) {
  // In a real app, we'd fetch repo details using repoSlug. For now, mock it.
  const repoName = repoSlug || 'payments-api';

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans tracking-tight w-full">
      {/* Top Header Section */}
      <div className="bg-white border-b border-zinc-200">
        <StateBanner />
        <div className="px-4 sm:px-8 py-6">
          <RepoIdentityBlock repoName={repoName} />
          <div className="mt-6 mb-4">
            <QuickAIActions />
          </div>
        </div>
        <RepoTabNav repoSlug={repoSlug} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
