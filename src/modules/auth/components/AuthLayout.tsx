'use client';

import React from 'react';
import VisualPanel from './VisualPanel';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-white select-none">
      {/* Left side form or animated content block */}
      <div className="flex-1 flex justify-center items-center bg-white min-h-screen">
        {children}
      </div>

      {/* Right ambient vector chevron panel */}
      <VisualPanel />
    </div>
  );
}
