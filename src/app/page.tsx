'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenManager } from '@/shared/lib/tokenManager';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (tokenManager.isAuthenticated()) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [router]);

  return null;
}

