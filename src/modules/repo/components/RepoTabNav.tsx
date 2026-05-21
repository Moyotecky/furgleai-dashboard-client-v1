'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { id: 'overview', label: 'Overview', href: '' },
  { id: 'live-scan', label: 'Live Scan', href: '/live-scan' },
  { id: 'vulnerabilities', label: 'Vulnerabilities', href: '/vulnerabilities' },
  { id: 'pull-requests', label: 'Pull Requests', href: '/pull-requests' },
  { id: 'architecture', label: 'Architecture', href: '/architecture' },
  { id: 'secrets', label: 'Secrets', href: '/secrets' },
  { id: 'activity', label: 'Activity', href: '/activity' },
  { id: 'workflows', label: 'Workflows', href: '/workflows' },
  { id: 'settings', label: 'Settings', href: '/settings' },
];

export function RepoTabNav({ repoSlug }: { repoSlug: string }) {
  const pathname = usePathname();
  const basePath = `/dashboard/repositories/${repoSlug}`;

  return (
    <div className="px-4 sm:px-8 border-b border-zinc-200 bg-white">
      <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar no-scrollbar-y">
        {TABS.map((tab) => {
          const fullHref = `${basePath}${tab.href}`;
          // Exact match for overview, prefix match for others
          const isActive = tab.href === '' ? pathname === basePath : pathname.startsWith(fullHref);

          return (
            <Link
              key={tab.id}
              href={fullHref}
              className={`relative px-1 py-3.5 text-[13.5px] font-semibold tracking-tight whitespace-nowrap transition-colors ${
                isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
