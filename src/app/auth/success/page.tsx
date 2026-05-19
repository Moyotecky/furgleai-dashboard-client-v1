import React from 'react';
import { AuthLayout, SignUpSuccessView } from '@/modules/auth';

export const metadata = {
  title: 'Activation Success - FurgleAI Security OS',
  description: 'Your FurgleAI node has been activated successfully. Enter the dashboard to secure your repositories.',
};

export default function SignUpSuccessPage() {
  return (
    <AuthLayout>
      <SignUpSuccessView />
    </AuthLayout>
  );
}
