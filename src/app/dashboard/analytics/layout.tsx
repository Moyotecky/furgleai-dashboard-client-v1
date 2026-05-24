import React from 'react';
import { AnalyticsLayout } from '@/modules/analytics';

export default function AnalyticsRootLayout({ children }: { children: React.ReactNode }) {
  return <AnalyticsLayout>{children}</AnalyticsLayout>;
}
