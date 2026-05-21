import React from 'react';
import { RepoOverviewView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Overview - FurgleAI`,
  };
}

export default function RepositoryOverviewPage() {
  return <RepoOverviewView />;
}
