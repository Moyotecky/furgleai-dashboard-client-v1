import React from 'react';
import { AuthLayout, LoginForm } from '@/modules/auth';

export const metadata = {
  title: 'Sign In - FurgleAI Security OS',
  description: 'Log in to your FurgleAI account to monitor secure pipelines and compliance rules.',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
