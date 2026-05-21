import React from 'react';
import { PullRequestsView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Pull Requests - FurgleAI`,
  };
}

export default function RepositoryPullRequestsPage() {
  return <PullRequestsView />;
}
