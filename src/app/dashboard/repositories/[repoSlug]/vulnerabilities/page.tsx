import React from 'react';
import { RepoVulnerabilitiesView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Vulnerabilities - FurgleAI`,
  };
}

export default function RepositoryVulnerabilitiesPage() {
  return <RepoVulnerabilitiesView />;
}
