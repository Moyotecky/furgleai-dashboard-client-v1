import React from 'react';
import { ArchitectureView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Architecture - FurgleAI`,
  };
}

export default function RepositoryArchitecturePage() {
  return <ArchitectureView />;
}
