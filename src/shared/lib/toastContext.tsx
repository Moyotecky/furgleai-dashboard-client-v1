'use client';

/**
 * Toast Notification System — Linear-style slide-in toasts
 *
 * Used globally across the dashboard for success/error feedback.
 * Max 3 visible at once, auto-dismiss after 4s.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, default 4000
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, 'id'>) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const duration = opts.duration ?? 4000;

      setToasts((prev) => {
        const next = [...prev, { ...opts, id }];
        // Max 3 visible — remove oldest if over limit
        return next.length > 3 ? next.slice(next.length - 3) : next;
      });

      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    const t = timers.current;
    return () => { t.forEach((timer) => clearTimeout(timer)); };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

// ─── Toast config ──────────────────────────────────────────────────────────
const TOAST_CONFIG: Record<ToastType, { bg: string; border: string; icon: React.ReactNode; textColor: string }> = {
  success: {
    bg: 'bg-white',
    border: 'border-l-emerald-500',
    textColor: 'text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-white',
    border: 'border-l-red-500',
    textColor: 'text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-white',
    border: 'border-l-amber-500',
    textColor: 'text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <path d="M12 9v4m0 4h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-white',
    border: 'border-l-indigo-500',
    textColor: 'text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" strokeLinecap="round" />
      </svg>
    ),
  },
};

// ─── Toast Container ───────────────────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none" aria-live="polite">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const config = TOAST_CONFIG[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 48, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`pointer-events-auto w-[340px] ${config.bg} border border-zinc-200 border-l-4 ${config.border} rounded-[10px] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] p-4 flex items-start gap-3`}
            >
              {config.icon}
              <div className="flex-1 min-w-0">
                <p className={`text-[13.5px] font-semibold tracking-tight ${config.textColor}`}>{t.title}</p>
                {t.message && (
                  <p className="text-[12px] text-zinc-500 mt-0.5 leading-relaxed tracking-tight">{t.message}</p>
                )}
              </div>
              <button
                onClick={() => onDismiss(t.id)}
                className="shrink-0 w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors rounded cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
