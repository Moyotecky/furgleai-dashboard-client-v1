'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { tokenManager } from '@/shared/lib/tokenManager';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = tokenManager.isAuthenticated();
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);

  // Briefly render nothing while checking auth to avoid hydration mismatch and flash of protected content
  if (isAuthenticated === null || !isAuthenticated) {
    return <div className="min-h-screen bg-black flex items-center justify-center" />;
  }

  return <>{children}</>;
}
