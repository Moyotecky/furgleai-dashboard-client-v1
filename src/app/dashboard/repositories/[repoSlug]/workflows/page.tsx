import React from 'react';
import { WorkflowsView } from '@/modules/repo';

export async function generateMetadata({ params }: { params: Promise<{ repoSlug: string }> }) {
  const { repoSlug } = await params;
  return {
    title: `${repoSlug} - Workflows - FurgleAI`,
  };
}

export default function RepositoryWorkflowsPage() {
  return <WorkflowsView />;
}
