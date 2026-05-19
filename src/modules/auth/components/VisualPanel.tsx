'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function VisualPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-end p-20 w-1/2 min-h-screen bg-[#0f1319] overflow-hidden select-none">

      {/* Dynamic Watermark Vector Chevron Overlays */}
      <div className="absolute top-1/4 right-0 w-[120%] h-full pointer-events-none opacity-20 transform translate-x-12 translate-y-12">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full text-white/[0.015]"
          fill="currentColor"
        >
          {/* Top chevron */}
          <path
            d="M100 350 L250 200 L400 350"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Bottom chevron */}
          <path
            d="M100 240 L250 90 L400 240"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] pointer-events-none opacity-25">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full text-white/[0.01]"
          fill="currentColor"
        >
          {/* Giant top-right watermark chevron */}
          <path
            d="M150 300 L250 200 L350 300"
            stroke="rgba(255, 255, 255, 0.015)"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Background soft ambient radial glow */}
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[80px] pointer-events-none" />

      {/* Content Section (Quote) */}
      <div className="relative z-10 max-w-lg flex flex-col gap-6 text-left">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[28px] md:text-[32px] font-semibold font-secondary leading-[1.3] text-white/90 tracking-tighter"
        >
          FurgleAI: It&apos;s the design equivalent of discovering the theory of relativity for your codebase security!
        </motion.p>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-lg font-medium font-tertiary text-zinc-400 tracking-tight"
        >
          - Dan Brown - The DaVinci Code
        </motion.span>
      </div>
    </div>
  );
}
