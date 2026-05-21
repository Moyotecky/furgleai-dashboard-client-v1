import React from 'react';
import { RepoLayout } from '@/modules/repo';

export default async function RepositoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ repoSlug: string }>;
}) {
  const { repoSlug } = await params;
  return (
    <RepoLayout repoSlug={repoSlug}>
      {children}
    </RepoLayout>
  );
}
