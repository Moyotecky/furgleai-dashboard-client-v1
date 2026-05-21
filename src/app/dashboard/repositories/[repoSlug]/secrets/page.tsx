import React from 'react';
import { SecretsView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Secrets - FurgleAI`,
  };
}

export default function RepositorySecretsPage() {
  return <SecretsView />;
}
