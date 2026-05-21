import React from 'react';
import { RepoSettingsView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Settings - FurgleAI`,
  };
}

export default function RepositorySettingsPage() {
  return <RepoSettingsView />;
}
