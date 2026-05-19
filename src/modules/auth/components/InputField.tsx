'use client';

import React, { useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({ label, error, type, className = '', ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Custom curved eyelash closed eye SVG icon matching the screenshot exactly
  const ClosedEyeIcon = () => (
    <svg
      className="w-[22px] h-[22px] text-zinc-400 stroke-[1.5]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bottom arch representing closed eyelid */}
      <path d="M3 10C8 15 16 15 21 10" />
      {/* Outer eyelashes radiating outwards/downwards */}
      <path d="M3 10L1.5 12" />
      <path d="M7 12.8L5.8 15" />
      <path d="M12 13.5V16" />
      <path d="M17 12.8L18.2 15" />
      <path d="M21 10L22.5 12" />
    </svg>
  );

  // Custom standard matching stroke open eye SVG icon
  const OpenEyeIcon = () => (
    <svg
      className="w-[22px] h-[22px] text-zinc-400 stroke-[1.5]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-tertiary">
      <label className="text-[13.5px] font-semibold text-zinc-800 tracking-tight">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={inputType}
          className={`w-full h-[40px] px-4 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[14px] outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight ${
            isPassword ? 'pr-12' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-[11.5px] text-red-500 font-normal mt-0.5 animate-fadeIn tracking-tight">
          {error}
        </span>
      )}
    </div>
  );
}
