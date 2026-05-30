'use client';

import React, { useState, useRef, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { motion } from 'framer-motion';

import { verifyEmailSchema } from '../utils/validation';

import { authApi } from '@/shared/services/authApi';

import { tokenManager } from '@/shared/lib/tokenManager';

import { parseApiError } from '@/shared/lib/errorParser';

import { useToast } from '@/shared/lib/toastContext';

export default function VerifyEmailForm() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const { toast } = useToast();

  const isRecovery = searchParams.get('recovery') === 'true';

  // 6 digits code entry state

  const [code, setCode] = useState<string[]>(Array(6).fill(''));

  // UI States

  const [error, setError] = useState<string | undefined>(undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // References to input nodes for automatic focus shifting

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {

    if (inputsRef.current[0]) {

      inputsRef.current[0].focus();

    }

  }, []);

  const handleChange = (index: number, value: string) => {

    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];

    newCode[index] = value;

    setCode(newCode);

    setError(undefined);

    if (value && index < 5) {

      inputsRef.current[index + 1]?.focus();

    }

  };

  const handleKeyDown = (

    index: number,

    e: React.KeyboardEvent<HTMLInputElement>

  ) => {

    if (e.key === 'Backspace' && !code[index] && index > 0) {

      inputsRef.current[index - 1]?.focus();

    }

  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {

    e.preventDefault();

    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newCode = Array(6).fill('');

    for (let i = 0; i < pastedData.length; i++) {

      newCode[i] = pastedData[i];

    }

    setCode(newCode);

    const focusIndex = Math.min(pastedData.length, 5);

    inputsRef.current[focusIndex]?.focus();

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError(undefined);

    const fullCodeStr = code.join('');

    const result = verifyEmailSchema.safeParse({

      code: fullCodeStr,

    });

    if (!result.success) {

      setError(result.error.issues[0].message);

      return;

    }

    setIsSubmitting(true);

    try {

      const email = tokenManager.getPendingEmail();

      if (!email && !isRecovery) {

        setError('No pending registration found. Please sign up again.');

        setIsSubmitting(false);

        return;

      }

      await authApi.verifyEmail(

        email || 'recovery@temp.com',

        fullCodeStr

      );

      tokenManager.clearPendingEmail();

      if (isRecovery) {

        toast({

          type: 'success',

          title: 'Verified',

          message: 'Recovery successful.',

        });

        router.push('/auth/login?recovered=true');

      } else {

        toast({

          type: 'success',

          title: 'Email Verified',

          message: 'Welcome to FurgleAI.',

        });

        router.push('/auth/success');

      }

    } catch (err) {

      const parsed = parseApiError(err);

      setError(

        parsed.message ||

        'Invalid verification code. Please request a new one.'

      );

    } finally {

      setIsSubmitting(false);

    }

  };

  const handleResend = async () => {

    const email = tokenManager.getPendingEmail();

    if (!email) {

      toast({

        type: 'error',

        title: 'Missing Email',

        message: 'Could not identify your email.',

      });

      return;

    }

    try {

      await authApi.resendVerification(email);

      toast({

        type: 'info',

        title: 'Code Sent',

        message: 'A new verification code has been sent.',

      });

    } catch (err) {

      const parsed = parseApiError(err);

      toast({

        type: 'error',

        title: 'Resend Failed',

        message: parsed.message,

      });

    }

  };

  const Logo = () => (

    <div className="w-11 h-11 bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md select-none">

      {/* SVG */}

    </div>

  );

  return (
    <div className="w-full max-w-[420px] flex flex-col justify-center px-4 py-8 md:py-12 bg-white text-zinc-950 font-sans min-h-screen">

      {/* Brand Logo Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <Logo />
      </motion.div>

      {/* Main Title Headings */}
      <div className="flex flex-col gap-1.5 mb-8 text-left">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[32px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight"
        >
          {isRecovery ? 'Verify Recovery' : 'Verify Email'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[14px] font-medium text-zinc-500 font-tertiary leading-relaxed tracking-tight"
        >
          Please enter the 6-digit confirmation code sent to your inbox to unlock your FurgleAI node secure configurations.
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 mt-4 text-left">

        {/* Verification Inputs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="flex justify-between gap-2.5"
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputsRef.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-10 h-11 md:w-12 md:h-13 text-center text-lg md:text-xl font-bold font-secondary text-zinc-950 bg-white border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/20'
                } rounded-2xl outline-none focus:ring-2 transition-all duration-150 select-all`}
            />
          ))}
        </motion.div>

        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11.5px] text-red-500 font-normal tracking-tight font-tertiary"
          >
            {error}
          </motion.span>
        )}

        {/* Resend actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight"
        >
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            className="font-bold text-zinc-950 hover:underline focus:outline-none cursor-pointer"
            onClick={handleResend}
          >
            Resend Code
          </button>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="mt-2"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[40px] px-4 bg-zinc-950 text-white font-semibold font-secondary rounded-xl hover:bg-zinc-900 active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 tracking-tight"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Code</span>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}