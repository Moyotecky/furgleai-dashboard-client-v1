'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/shared/store/authSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SocialButton from './SocialButton';
import InputField from './InputField';
import { loginSchema } from '../utils/validation';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI States
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Real-time onChange field validations
  const handleEmailChange = (val: string) => {
    setEmail(val);
    const result = loginSchema.shape.email.safeParse(val);
    setErrors((prev) => ({
      ...prev,
      email: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    const result = loginSchema.shape.password.safeParse(val);
    setErrors((prev) => ({
      ...prev,
      password: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const validateForm = () => {
    const result = loginSchema.safeParse({ email, password });
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: typeof errors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof typeof errors;
      if (path) {
        fieldErrors[path] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    dispatch(loginStart());

    try {
      // Simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const fakeUser = {
        id: 'usr_furgle_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: 'developer',
      };
      
      dispatch(loginSuccess({ user: fakeUser, token: 'fake_jwt_token_furgle' }));
      router.push('/');
    } catch (err) {
      dispatch(loginFailure('Invalid email or password.'));
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
          Welcome Back
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[14px] font-medium text-zinc-500 font-tertiary leading-relaxed tracking-tight"
        >
          Sign in to FurgleAI Security OS to access your real-time secure telemetry dashboards.
        </motion.p>
      </div>

      {/* Social Logins */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3 mb-6"
      >
        <SocialButton provider="google" onClick={() => console.log('Google Login')} />
        <SocialButton provider="apple" onClick={() => console.log('Apple Login')} />
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative flex items-center justify-center my-4"
      >
        <div className="w-full border-t border-zinc-150" />
        <span className="absolute bg-white px-4 text-xs font-semibold text-zinc-400 tracking-wider font-tertiary">
          OR
        </span>
      </motion.div>

      {/* Standard Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 mt-4 text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <InputField
            label="Email"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={errors.email}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex justify-between items-center">
              <label className="text-[13.5px] font-semibold text-zinc-800 tracking-tight font-tertiary">
                Password
              </label>
              <button
                type="button"
                className="text-[12.5px] font-bold text-zinc-950 hover:underline font-tertiary focus:outline-none"
                onClick={() => router.push('/auth/forgot')}
              >
                Forgot password?
              </button>
            </div>
            <InputField
              label=""
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={errors.password}
              required
            />
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, cubicBezier: [0.16, 1, 0.3, 1] }}
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
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </motion.div>

        {/* Switch to register link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center text-[14px] font-tertiary text-zinc-500"
        >
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="font-bold text-zinc-950 hover:underline focus:outline-none cursor-pointer"
            onClick={() => router.push('/auth/register')}
          >
            Create one
          </button>
        </motion.div>
      </form>
    </div>
  );
}
