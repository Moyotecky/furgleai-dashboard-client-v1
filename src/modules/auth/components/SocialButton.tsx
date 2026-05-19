'use client';

import React from 'react';

interface SocialButtonProps {
  provider: 'google' | 'apple';
  onClick?: () => void;
}

export default function SocialButton({ provider, onClick }: SocialButtonProps) {
  const isGoogle = provider === 'google';

  const label = isGoogle ? 'Continue with Google' : 'Continue with Apple';

  // Vector SVG definitions matching original brand identities perfectly
  const GoogleIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.745 1.055 14.99 0 12 0 7.354 0 3.307 2.68 1.34 6.623l3.926 3.142z"
      />
      <path
        fill="#4285F4"
        d="M16.04 19.182c-1.16.732-2.527 1.164-4.04 1.164-3.768 0-6.953-2.527-8.09-5.964l-3.93 3.045C2.086 21.36 6.723 24 12 24c3.082 0 5.92-.99 8.127-2.69l-4.086-2.128z"
      />
      <path
        fill="#FBBC05"
        d="M3.91 14.382A7.16 7.16 0 0 1 3.5 12c0-.827.14-1.62.396-2.364L.37 6.495A11.968 11.968 0 0 0 0 12c0 1.955.467 3.8 1.295 5.436l2.614-3.054z"
      />
      <path
        fill="#34A853"
        d="M23.49 10.1c.334.618.51 1.295.51 2.01 0 .764-.202 1.482-.57 2.128l3.666 2.855C23.94 15.355 24 13.727 24 12c0-1.855-.382-3.618-1.064-5.227l-3.832 3.1c.365.644.568 1.373.568 2.127 0 .346-.04.68-.118 1.002H12v-4.9h6.49z"
      />
    </svg>
  );

  const AppleIcon = () => (
    <svg className="w-5 h-5 shrink-0 fill-zinc-950" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.97.08 2.07-.45 2.81-1.33z" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[40px] flex items-center justify-center gap-3 px-4 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[14px] font-semibold font-secondary hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-sm shadow-black/[0.01]"
    >
      {isGoogle ? <GoogleIcon /> : <AppleIcon />}
      <span>{label}</span>
    </button>
  );
}
