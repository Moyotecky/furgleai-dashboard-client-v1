import React from 'react';
import { LiveScanView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Live Scan - FurgleAI`,
  };
}

export default function RepositoryLiveScanPage() {
  return <LiveScanView />;
}
