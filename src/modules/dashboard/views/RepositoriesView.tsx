'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useAppSelector } from '@/shared/store/hooks';
import { Repository } from '@/shared/store/repoSlice';
import { ConnectRepoModal } from '../components/ConnectRepoModal';
import { RepoDetailsDrawer } from '../components/RepoDetailsDrawer';

type FilterType = 'all' | 'active' | 'scanning' | 'error';

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 8;
  const dash = (score / 100) * circumference;
  const color =
    score >= 90 ? '#10b981' :
    score >= 75 ? '#3b82f6' :
    score >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2" />
        <circle
          cx="10" cy="10" r="8" fill="none"
          stroke={color} strokeWidth="2"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute text-[8px] font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

function SeverityBadge({ count, color }: { count: number; color: string }) {
  if (count === 0) return <span className="text-zinc-300 text-[12px] font-medium">—</span>;
  return <span className={`text-[12px] font-semibold ${color}`}>{count}</span>;
}

function StatusDot({ status }: { status: Repository['status'] }) {
  if (status === 'scanning') {
    return (
      <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-indigo-600">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        Scanning
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-red-500">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Error
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  );
}

const FILTER_LABELS: Record<FilterType, string> = {
  all: 'All',
  active: 'Active',
  scanning: 'Scanning',
  error: 'Error',
};

export function RepositoriesView() {
  const repos = useAppSelector((s) => s.repos.items);
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [connectOpen, setConnectOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" keyboard shortcut to focus search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchRef.current?.focus();
    }
    if (e.key === 'Escape') {
      setSelectedRepo(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const filtered = repos.filter((r) => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const counts: Record<FilterType, number> = {
    all: repos.length,
    active: repos.filter((r) => r.status === 'active').length,
    scanning: repos.filter((r) => r.status === 'scanning').length,
    error: repos.filter((r) => r.status === 'error').length,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans tracking-tight">
      {/* ── Page Header ── */}
      <div className="px-8 pt-8 pb-0 border-b border-zinc-100">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <FaGithub className="w-4.5 h-4.5 text-zinc-600" />
              <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Repositories</h1>
              <span className="ml-1 text-[12px] font-semibold text-zinc-400 bg-zinc-100 rounded-full px-2 py-0.5">
                {repos.length}
              </span>
            </div>
            <p className="text-[13px] text-zinc-400 tracking-tight">
              All connected repositories monitored by FurgleAI.
            </p>
          </div>

          <button
            onClick={() => setConnectOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 text-white rounded-[9px] text-[13px] font-semibold hover:bg-zinc-700 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Connect Repository
          </button>
        </div>

        {/* Filter + Search bar */}
        <div className="flex items-center justify-between gap-4 pb-4">
          {/* Filter tabs */}
          <div className="flex items-center gap-0.5">
            {(Object.keys(FILTER_LABELS) as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[12.5px] font-medium transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {FILTER_LABELS[f]}
                {counts[f] > 0 && (
                  <span className={`text-[10.5px] font-semibold rounded-full px-1.5 py-px ${
                    filter === f ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {counts[f]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="20.5" y1="20.5" x2="16" y2="16" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories..."
              className="pl-9 pr-10 py-1.5 text-[12.5px] bg-zinc-50 border border-zinc-200 rounded-[8px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900/30 focus:border-zinc-400 transition-all w-[240px]"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9.5px] font-medium text-zinc-400 bg-white border border-zinc-200 px-1 py-0.5 rounded-[4px] pointer-events-none">
              /
            </kbd>
          </div>
        </div>
      </div>

      {/* ── Table Header ── */}
      <div className="px-8 py-0">
        <div className="grid grid-cols-[1fr_100px_160px_90px_110px_80px] gap-4 px-4 py-2.5 border-b border-zinc-100">
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repository</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Score</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Findings</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Branch</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Status</span>
          <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Last Scan</span>
        </div>

        {/* ── Rows ── */}
        {filtered.length === 0 ? (
          <EmptyState query={query} filter={filter} onConnect={() => setConnectOpen(true)} />
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((repo, i) => (
              <motion.div
                key={repo.slug}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                onClick={() => setSelectedRepo(repo)}
                className={`grid grid-cols-[1fr_100px_160px_90px_110px_80px] gap-4 px-4 py-3.5 border-b border-zinc-50 cursor-pointer group transition-colors rounded-[6px] ${
                  selectedRepo?.slug === repo.slug ? 'bg-zinc-50' : 'hover:bg-zinc-50/80'
                }`}
              >
                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-[7px] bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <FaGithub className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-zinc-900 tracking-tight truncate group-hover:text-zinc-700 transition-colors">
                      {repo.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 tracking-tight">
                      {repo.isPrivate ? 'Private' : 'Public'} · {repo.connectedAt}
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center">
                  <ScoreRing score={repo.score} />
                </div>

                {/* Findings */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[9.5px] text-zinc-400 font-medium">C</span>
                    <SeverityBadge count={repo.critical} color="text-red-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9.5px] text-zinc-400 font-medium">H</span>
                    <SeverityBadge count={repo.high} color="text-orange-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9.5px] text-zinc-400 font-medium">M</span>
                    <SeverityBadge count={repo.medium} color="text-amber-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9.5px] text-zinc-400 font-medium">L</span>
                    <SeverityBadge count={repo.low} color="text-zinc-400" />
                  </div>
                </div>

                {/* Branch */}
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-[5px]">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3v12M6 15c0 3.314 2.686 6 6 6s6-2.686 6-6" strokeLinecap="round" />
                      <circle cx="6" cy="3" r="2" />
                      <circle cx="18" cy="15" r="2" />
                    </svg>
                    {repo.branch}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <StatusDot status={repo.status} />
                </div>

                {/* Last Scan */}
                <div className="flex items-center">
                  <span className="text-[12px] text-zinc-400 font-medium">{repo.lastScan}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ── Footer Summary ── */}
      {filtered.length > 0 && (
        <div className="px-8 py-4 mt-auto border-t border-zinc-50">
          <div className="flex items-center gap-6 px-4">
            {[
              { label: 'Total Repositories', val: repos.length },
              { label: 'Critical Issues', val: repos.reduce((s, r) => s + r.critical, 0), color: 'text-red-500' },
              { label: 'High Issues', val: repos.reduce((s, r) => s + r.high, 0), color: 'text-orange-500' },
              { label: 'Avg. Score', val: Math.round(repos.reduce((s, r) => s + r.score, 0) / repos.length) },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className={`text-[15px] font-bold tracking-tight ${color ?? 'text-zinc-900'}`}>{val}</span>
                <span className="text-[11px] text-zinc-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modals & Drawers ── */}
      <ConnectRepoModal open={connectOpen} onClose={() => setConnectOpen(false)} />
      <RepoDetailsDrawer repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </div>
  );
}

function EmptyState({ query, filter, onConnect }: { query: string; filter: FilterType; onConnect: () => void }) {
  const isSearch = query.length > 0;
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-[14px] bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4">
        <FaGithub className="w-7 h-7 text-zinc-400" />
      </div>
      <h3 className="text-[14px] font-semibold text-zinc-900 tracking-tight mb-1">
        {isSearch ? `No results for "${query}"` : filter !== 'all' ? `No ${filter} repositories` : 'No repositories connected'}
      </h3>
      <p className="text-[12.5px] text-zinc-400 tracking-tight mb-5 max-w-[280px] leading-relaxed">
        {isSearch
          ? 'Try a different search term or clear the filter.'
          : filter !== 'all'
          ? `You have no repositories with ${filter} status.`
          : 'Connect your first GitHub repository to start monitoring security vulnerabilities.'}
      </p>
      {!isSearch && filter === 'all' && (
        <button
          onClick={onConnect}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-[9px] text-[13px] font-semibold hover:bg-zinc-700 active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Connect Repository
        </button>
      )}
    </div>
  );
}
