'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useAppDispatch } from '@/shared/store/hooks';
import { deleteRepo, updateRepo, Repository } from '@/shared/store/repoSlice';
import Link from 'next/link';

interface RepoDetailsDrawerProps {
  repo: Repository | null;
  onClose: () => void;
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 90 ? { ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50', bar: '#10b981' } :
    score >= 75 ? { ring: 'ring-blue-200', text: 'text-blue-700', bg: 'bg-blue-50', bar: '#3b82f6' } :
    score >= 55 ? { ring: 'ring-amber-200', text: 'text-amber-700', bg: 'bg-amber-50', bar: '#f59e0b' } :
    { ring: 'ring-red-200', text: 'text-red-700', bg: 'bg-red-50', bar: '#ef4444' };

  const circumference = 2 * Math.PI * 13;
  const dash = (score / 100) * circumference;

  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] ${color.bg} ring-1 ${color.ring}`}>
      <svg className="w-9 h-9 -rotate-90" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
        <circle
          cx="16" cy="16" r="13" fill="none"
          stroke={color.bar} strokeWidth="2.5"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <div className={`text-[22px] font-bold leading-none ${color.text}`}>{score}</div>
        <div className="text-[10.5px] text-zinc-400 font-medium tracking-tight mt-0.5">
          {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 55 ? 'Fair' : 'Critical'}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Repository['status'] }) {
  if (status === 'scanning') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        Scanning
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Error
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  );
}

export function RepoDetailsDrawer({ repo, onClose }: RepoDetailsDrawerProps) {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<'overview' | 'settings' | 'danger'>('overview');
  const [branch, setBranch] = useState('');
  const [scanFreq, setScanFreq] = useState<Repository['scanFrequency']>('continuous');
  const [aiAutopatch, setAiAutopatch] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (repo) {
      setBranch(repo.branch);
      setScanFreq(repo.scanFrequency);
      setAiAutopatch(repo.aiAutopatch);
      setDeleteInput('');
      setDeleting(false);
      setSaved(false);
      setTab('overview');
    }
  }, [repo]);

  const handleSave = () => {
    if (!repo) return;
    dispatch(updateRepo({ slug: repo.slug, changes: { branch, scanFrequency: scanFreq, aiAutopatch } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (!repo || deleteInput !== repo.name) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(deleteRepo(repo.slug));
    onClose();
  };

  const canDelete = repo && deleteInput === repo.name;

  return (
    <AnimatePresence>
      {repo && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-zinc-950/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[460px] bg-white border-l border-zinc-200 z-[110] flex flex-col overflow-hidden shadow-[−24px_0_64px_−12px_rgba(0,0,0,0.12)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {/* ── Drawer Header ── */}
            <div className="px-5 pt-5 pb-4 border-b border-zinc-100 shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[9px] bg-zinc-900 flex items-center justify-center shadow-sm">
                    <FaGithub className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight">{repo.name}</h2>
                      <StatusBadge status={repo.status} />
                    </div>
                    <p className="text-[11.5px] text-zinc-400 tracking-tight mt-0.5">
                      {repo.isPrivate ? 'Private' : 'Public'} · Connected {repo.connectedAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Open in repo link */}
              <Link
                href={`/dashboard/repositories/${repo.slug}`}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                onClick={onClose}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Open repository control room
              </Link>

              {/* Tabs */}
              <div className="flex gap-0 mt-4 border-b border-zinc-100 -mb-4">
                {(['overview', 'settings', 'danger'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2.5 text-[12.5px] font-medium tracking-tight border-b-[2px] transition-all capitalize ${
                      tab === t
                        ? t === 'danger'
                          ? 'border-red-500 text-red-600'
                          : 'border-zinc-900 text-zinc-900'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {t === 'danger' ? '⚠ Danger' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Drawer Content ── */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {tab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 flex flex-col gap-5"
                  >
                    {/* Score + Meta row */}
                    <div className="flex items-stretch gap-3">
                      <ScorePill score={repo.score} />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        {[
                          { label: 'Critical', val: repo.critical, color: 'text-red-600' },
                          { label: 'High', val: repo.high, color: 'text-orange-600' },
                          { label: 'Medium', val: repo.medium, color: 'text-amber-600' },
                          { label: 'Low', val: repo.low, color: 'text-zinc-500' },
                        ].map(({ label, val, color }) => (
                          <div key={label} className="flex flex-col bg-zinc-50 border border-zinc-100 rounded-[8px] px-3 py-2">
                            <span className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-400">{label}</span>
                            <span className={`text-[16px] font-bold ${color}`}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta Details */}
                    <div className="border border-zinc-100 rounded-[10px] overflow-hidden">
                      <div className="px-4 py-2 bg-zinc-50 border-b border-zinc-100">
                        <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest">Repository Details</span>
                      </div>
                      {[
                        { label: 'Branch', val: repo.branch },
                        { label: 'Scan Frequency', val: repo.scanFrequency === 'continuous' ? 'Continuous (On Push)' : repo.scanFrequency === 'daily' ? 'Daily' : 'Weekly' },
                        { label: 'Last Scan', val: repo.lastScan },
                        { label: 'AI Autopatch', val: repo.aiAutopatch ? 'Enabled' : 'Disabled' },
                        { label: 'Visibility', val: repo.isPrivate ? 'Private' : 'Public' },
                        { label: 'Connected', val: repo.connectedAt },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 last:border-0">
                          <span className="text-[12px] text-zinc-400 tracking-tight">{label}</span>
                          <span className="text-[12px] font-semibold text-zinc-700 tracking-tight">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick links */}
                    <div className="flex flex-col gap-1">
                      {[
                        { label: 'View Vulnerabilities', href: `/dashboard/repositories/${repo.slug}/vulnerabilities` },
                        { label: 'View Secrets', href: `/dashboard/repositories/${repo.slug}/secrets` },
                        { label: 'View Pull Requests', href: `/dashboard/repositories/${repo.slug}/pull-requests` },
                        { label: 'Live Scan', href: `/dashboard/repositories/${repo.slug}/live-scan` },
                      ].map(({ label, href }) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={onClose}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-[8px] hover:bg-zinc-50 border border-transparent hover:border-zinc-100 group transition-all"
                        >
                          <span className="text-[13px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors tracking-tight">{label}</span>
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 flex flex-col gap-5"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Branch */}
                      <div>
                        <label className="block text-[12px] font-semibold text-zinc-700 tracking-tight mb-1.5">Primary Branch</label>
                        <input
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-3 py-2 text-[13px] bg-zinc-50 border border-zinc-200 rounded-[8px] text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900/30 focus:border-zinc-400 transition-all tracking-tight"
                          placeholder="main"
                        />
                        <p className="text-[11px] text-zinc-400 mt-1">The branch used for baseline scans and comparisons.</p>
                      </div>

                      {/* Scan Frequency */}
                      <div>
                        <label className="block text-[12px] font-semibold text-zinc-700 tracking-tight mb-1.5">Scan Frequency</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['continuous', 'daily', 'weekly'] as const).map((freq) => (
                            <button
                              key={freq}
                              onClick={() => setScanFreq(freq)}
                              className={`flex flex-col items-center px-3 py-2.5 rounded-[8px] border text-[11.5px] font-semibold tracking-tight transition-all cursor-pointer ${
                                scanFreq === freq
                                  ? 'bg-zinc-900 border-zinc-900 text-white'
                                  : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                              }`}
                            >
                              {freq === 'continuous' ? 'On Push' : freq === 'daily' ? 'Daily' : 'Weekly'}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          {scanFreq === 'continuous' ? 'Scans are triggered on every push.' : scanFreq === 'daily' ? 'Scans run once per day at midnight UTC.' : 'Scans run every Monday at midnight UTC.'}
                        </p>
                      </div>

                      {/* AI Autopatch toggle */}
                      <div className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-100 rounded-[10px]">
                        <div>
                          <div className="text-[12.5px] font-semibold text-zinc-900 tracking-tight">AI Autopatch</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">Automatically create PRs with AI-generated fixes</div>
                        </div>
                        <button
                          onClick={() => setAiAutopatch(!aiAutopatch)}
                          className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${aiAutopatch ? 'bg-zinc-900' : 'bg-zinc-200'}`}
                          style={{ minWidth: '40px', height: '22px' }}
                        >
                          <span
                            className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200 ${aiAutopatch ? 'translate-x-5' : 'translate-x-0.5'}`}
                            style={{ width: '18px', height: '18px' }}
                          />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                        saved ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {saved ? (
                        <>
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          Saved
                        </>
                      ) : 'Save Changes'}
                    </button>
                  </motion.div>
                )}

                {tab === 'danger' && (
                  <motion.div
                    key="danger"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 flex flex-col gap-4"
                  >
                    <div className="rounded-[12px] border border-red-200 bg-red-50/50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-red-100 flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[12.5px] font-bold text-red-700 tracking-tight">Danger Zone</span>
                      </div>
                      <div className="px-4 py-4 flex flex-col gap-4">
                        <div>
                          <div className="text-[13px] font-semibold text-zinc-900 tracking-tight mb-1">Delete Repository</div>
                          <p className="text-[12px] text-zinc-500 leading-relaxed">
                            This will permanently remove <span className="font-semibold text-zinc-700">{repo.name}</span> from FurgleAI. All scan history, vulnerability data, and settings will be lost. This action cannot be undone.
                          </p>
                        </div>

                        <div>
                          <label className="block text-[11.5px] font-semibold text-zinc-600 tracking-tight mb-1.5">
                            Type <span className="font-mono text-red-600 bg-red-50 px-1 py-0.5 rounded">{repo.name}</span> to confirm
                          </label>
                          <input
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            placeholder={repo.name}
                            className="w-full px-3 py-2 text-[13px] bg-white border border-red-200 rounded-[8px] text-zinc-900 placeholder-zinc-300 focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-all tracking-tight font-mono"
                          />
                        </div>

                        <button
                          onClick={handleDelete}
                          disabled={!canDelete || deleting}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                            canDelete && !deleting
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                          }`}
                        >
                          {deleting ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" /></svg>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Delete {repo.name}
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                      The repository will be removed from FurgleAI monitoring. Your GitHub repository itself will not be affected.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
