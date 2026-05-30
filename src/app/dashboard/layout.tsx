import React from 'react';
import { DashboardLayout } from '@/modules/dashboard';
import { AuthGuard } from '@/shared/components/AuthGuard';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
