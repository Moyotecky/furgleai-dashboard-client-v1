import React from 'react';
import { ActivityView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Activity - FurgleAI`,
  };
}

export default function RepositoryActivityPage() {
  return <ActivityView />;
}
