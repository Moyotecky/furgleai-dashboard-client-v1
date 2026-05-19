import React from 'react';
import { AuthLayout, ForgotPasswordForm } from '@/modules/auth';

export const metadata = {
  title: 'Reset Password - FurgleAI Security OS',
  description: 'Initiate password recovery for your FurgleAI Security OS administrator node.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
