'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function SignUpSuccessView() {
  const router = useRouter();

  // Circle scaling animation keys
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.4,
      },
    },
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col justify-center items-center px-6 py-12 md:py-16 bg-white text-zinc-950 font-sans min-h-screen text-center relative overflow-hidden select-none">
      
      {/* Background Soft Premium Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-zinc-950/[0.02] rounded-full blur-[40px] pointer-events-none" />

      {/* Main Success Circular Ripple Frame */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Secondary ring halo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.15, opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
          className="absolute w-20 h-20 rounded-full border border-zinc-950/20 pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.35, opacity: [0, 0.2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
          className="absolute w-20 h-20 rounded-full border border-zinc-950/10 pointer-events-none"
        />

        {/* Core animated checkmark bubble */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center shadow-lg shadow-black/10 relative z-10"
        >
          <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <motion.path
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
              d="M20 6L9 17L4 12"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Hero Typography */}
      <div className="flex flex-col gap-2.5 mb-8 text-center max-w-sm">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[32px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight"
        >
          Platform Activated
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[14px] font-medium text-zinc-500 font-tertiary leading-relaxed tracking-tight"
        >
          Your FurgleAI Security node has been verified. You can now configure workflows and monitor live scan operations.
        </motion.p>
      </div>

      {/* Action Portal Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="w-full mt-2"
      >
        <button
          onClick={() => router.push('/auth/onboarding')}
          className="w-full h-[40px] px-6 bg-zinc-950 text-white font-semibold font-secondary rounded-xl hover:bg-zinc-900 active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 relative overflow-hidden group tracking-tight"
        >
          {/* Subtle button internal backdrop glow */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span>Enter Dashboard</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
