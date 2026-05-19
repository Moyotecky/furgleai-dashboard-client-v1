import React, { Suspense } from 'react';
import { AuthLayout, VerifyEmailForm } from '@/modules/auth';

export const metadata = {
  title: 'Verify Account - FurgleAI Security OS',
  description: 'Enter your secure 6-digit confirmation code to activate your security control pipelines.',
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <svg
              className="animate-spin h-8 w-8 text-zinc-950"
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
            <span className="text-sm font-semibold mt-4 text-zinc-500 font-tertiary">
              Loading verification panel...
            </span>
          </div>
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </AuthLayout>
  );
}
