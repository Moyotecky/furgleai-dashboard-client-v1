import React from 'react';
import { RepositoriesView } from '@/modules/dashboard';

export const metadata = {
  title: 'Repositories - FurgleAI',
  description: 'Manage and monitor all connected GitHub repositories in FurgleAI.',
};

export default function RepositoriesPage() {
  return <RepositoriesView />;
}
