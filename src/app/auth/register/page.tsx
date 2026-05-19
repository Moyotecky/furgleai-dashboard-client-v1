import React from 'react';
import { AuthLayout, SignUpForm } from '@/modules/auth';

export const metadata = {
  title: 'Register - FurgleAI Security OS',
  description: 'Create an account to start scanning your repositories and monitoring security pipelines.',
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
