'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useRepositories } from '@/shared/hooks/useRepositories';

interface ConnectRepoModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectRepoModal({ open, onClose }: ConnectRepoModalProps) {
  const { availableRepositories: unconnected, loadAvailableRepositories, connectRepository } = useRepositories();
  const [query, setQuery] = useState('');
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setQuery('');
      setConnecting(null);
      setConnected(null);
      loadAvailableRepositories();
    }
  }, [open, loadAvailableRepositories]);

  const filtered = unconnected.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleConnect = async (repo: any) => {
    setConnecting(repo.slug || repo.name);
    try {
      await connectRepository({
        repositoryId: repo.id,
        branch: 'main',
        scanFrequency: 'continuous',
        aiAutopatch: true,
        name: repo.name,
        url: `https://github.com/acme/${repo.name}`, // Fallback/Mock URL for connect params
      });
      setConnected(repo.slug || repo.name);
      setTimeout(onClose, 900);
    } catch (err) {
      setConnecting(null);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 340, damping: 28 } },
    exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.18 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[520px] bg-white border border-zinc-200 rounded-[14px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-[8px] bg-zinc-900 flex items-center justify-center shadow-sm">
                  <FaGithub className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-zinc-900 tracking-tight leading-tight">Connect Repository</h2>
                  <p className="text-[12px] text-zinc-400 tracking-tight">Choose a GitHub repository to connect to FurgleAI</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="20.5" y1="20.5" x2="16" y2="16" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search repositories..."
                  className="w-full pl-9 pr-4 py-2 text-[13px] bg-zinc-50 border border-zinc-200 rounded-[8px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900/30 focus:border-zinc-400 transition-all tracking-tight"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-[320px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
                    <FaGithub className="w-5 h-5 text-zinc-400" />
                  </div>
                  <p className="text-[13px] font-medium text-zinc-500 tracking-tight">No repositories found</p>
                  <p className="text-[12px] text-zinc-400 mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="p-2">
                  {filtered.map((repo) => {
                    const isConnecting = connecting === repo.name;
                    const isConnected = connected === repo.name;
                    const disabled = !!connecting;

                    return (
                      <div
                        key={repo.id}
                        className={`flex items-center gap-3.5 px-3 py-3 rounded-[8px] group transition-all ${disabled ? 'opacity-60' : 'hover:bg-zinc-50 cursor-pointer'}`}
                        onClick={() => !disabled && handleConnect(repo)}
                      >
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-[7px] bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                          <FaGithub className="w-4 h-4 text-zinc-600" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-zinc-900 tracking-tight truncate">{repo.name}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] tracking-tight shrink-0 ${repo.isPrivate ? 'bg-zinc-100 text-zinc-500' : 'bg-emerald-50 text-emerald-600'}`}>
                              {repo.isPrivate ? 'Private' : 'Public'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3v12M6 15c0 3.314 2.686 6 6 6s6-2.686 6-6" strokeLinecap="round"/><circle cx="6" cy="3" r="2"/><circle cx="18" cy="15" r="2"/></svg>
                              main
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="shrink-0">
                          {isConnected ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-[7px]">
                              <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              <span className="text-[11px] font-semibold text-emerald-600">Connected</span>
                            </div>
                          ) : isConnecting ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-[7px]">
                              <svg className="w-3 h-3 text-indigo-500 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" /></svg>
                              <span className="text-[11px] font-semibold text-indigo-600">Connecting</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 rounded-[7px] group-hover:bg-zinc-700 transition-colors">
                              <span className="text-[11px] font-semibold text-white">Connect</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <span className="text-[11.5px] text-zinc-400 tracking-tight">
                {unconnected.length} repositories available
              </span>
              <div className="flex items-center gap-1.5 text-[11.5px] text-zinc-400">
                <FaGithub className="w-3 h-3" />
                <span>Acme Corp · GitHub</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
