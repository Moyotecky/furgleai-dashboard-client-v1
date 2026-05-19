'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { forgotPasswordSchema } from '../utils/validation';

export default function ForgotPasswordForm() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  
  // UI States
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Logo SVG
  const Logo = () => (
    <div className="w-11 h-11 bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md select-none">
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor">
        <path
          d="M6 17 L12 11 L18 17"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 11 L12 5 L18 11"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const result = forgotPasswordSchema.shape.email.safeParse(val);
    setError(result.success ? undefined : result.error.issues[0].message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Delay before redirecting to code verification
      setTimeout(() => {
        router.push('/auth/verify-email?recovery=true');
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Reset Password
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[14px] font-medium text-zinc-500 font-tertiary leading-relaxed tracking-tight"
        >
          Enter your registered email address and we will send you a 6-digit secure recovery verification code.
        </motion.p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col gap-2 text-left"
        >
          <h4 className="text-[15px] font-bold text-emerald-950 font-secondary tracking-tight">
            Verification Code Sent!
          </h4>
          <p className="text-[13.5px] text-emerald-800 font-medium font-tertiary tracking-tight leading-relaxed">
            A secure recovery code has been dispatched to <strong className="font-bold">{email}</strong>. We are redirecting you to the verification screen.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 mt-4 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            <InputField
              label="Email Address"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={error}
              required
            />
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
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
                  <span>Sending Code...</span>
                </>
              ) : (
                <span>Send Code</span>
              )}
            </button>
          </motion.div>

          {/* Switch to login link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 text-center text-[14px] font-tertiary text-zinc-500"
          >
            Remembered your password?{' '}
            <button
              type="button"
              className="font-bold text-zinc-950 hover:underline focus:outline-none cursor-pointer"
              onClick={() => router.push('/auth/login')}
            >
              Sign In
            </button>
          </motion.div>
        </form>
      )}
    </div>
  );
}
