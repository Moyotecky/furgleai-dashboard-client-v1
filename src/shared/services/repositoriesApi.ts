/**
 * Repositories API Service
 */

import { apiGet, apiPost, apiPatch, apiDelete } from '../lib/apiClient';

// ─── Types ────────────────────────────────────────────────────────────────

export interface VulnerabilitySummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface LastScan {
  timestamp: string;
  timestampISO: string;
  status: string;
  duration: number;
  foundVulnerabilities: number;
}

export interface Repository {
  id: string;
  name: string;
  slug: string;
  description: string;
  owner: string;
  url: string;
  status: 'active' | 'scanning' | 'error' | 'initializing' | 'disconnected';
  score: number;
  scoreHistory: { date: string; score: number }[];
  branch: string;
  language: string;
  isPrivate: boolean;
  stars: number;
  forks?: number;
  watchers?: number;
  vulnerabilities: VulnerabilitySummary;
  lastScan: LastScan;
  connectedAt: string;
  scanFrequency: 'continuous' | 'daily' | 'weekly';
  nextScheduledScan?: string;
  aiAutopatch: boolean;
  webhookEnabled?: boolean;
  webhookStatus?: string;
  defaultBranch?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RepositorySettings {
  id: string;
  scanFrequency: string;
  aiAutopatch: boolean;
  webhookEnabled: boolean;
  webhookUrl: string;
  notificationsEnabled: boolean;
  branchProtectionRules: boolean;
  autoMergeEnabled: boolean;
}

export interface RepositoryDetail {
  repository: Repository;
  settings: RepositorySettings;
  statistics: {
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    averageScanDuration: number;
    totalVulnerabilitiesFound: number;
    totalVulnerabilitiesFixed: number;
    fixRate: number;
  };
  team: { admins: number; developers: number };
}

export interface RepositoryListResponse {
  items: Repository[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  summary: {
    totalRepositories: number;
    activeRepositories: number;
    scannedToday: number;
    averageScore: number;
    vulnerabilityTotals: VulnerabilitySummary;
  };
}

export interface AvailableRepository {
  id: string;
  name: string;
  language: string;
  isPrivate: boolean;
}

// ─── Repository API calls ──────────────────────────────────────────────────

export const repositoriesApi = {
  async list(params?: { page?: number; limit?: number; search?: string }): Promise<RepositoryListResponse> {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiGet<RepositoryListResponse>(`/api/repositories${qs}`);
  },

  async getAvailable(): Promise<{ items: AvailableRepository[] }> {
    return apiGet('/api/repositories/available');
  },

  async getBySlug(slug: string): Promise<RepositoryDetail> {
    return apiGet<RepositoryDetail>(`/api/repositories/${slug}`);
  },

  async connect(params: {
    repositoryId: string;
    branch: string;
    scanFrequency: string;
    aiAutopatch: boolean;
    name: string;
    url: string;
  }): Promise<{
    repository: Repository;
    webhook: { id: string; url: string; events: string[]; active: boolean; createdAt: string };
    scan: { id: string; status: string; estimatedCompletionAt: string; position: number };
  }> {
    return apiPost('/api/repositories/connect', params);
  },

  async delete(slug: string): Promise<{
    repository: { id: string; name: string; status: string; disconnectedAt: string };
    webhook: { id: string; deleted: boolean; deletedAt: string };
  }> {
    return apiDelete(`/api/repositories/${slug}`);
  },

  async update(slug: string, changes: {
    scanFrequency?: string;
    aiAutopatch?: boolean;
    notificationsEnabled?: boolean;
    branch?: string;
  }): Promise<{ repository: Partial<Repository> }> {
    return apiPatch(`/api/repositories/${slug}`, changes);
  },

  async triggerScan(slug: string, params?: { depth?: string; includeSecrets?: boolean }): Promise<{
    scan: {
      id: string;
      repositorySlug: string;
      status: string;
      progress: { stage: string; percentage: number };
      startedAt: string;
      estimatedCompletionAt: string;
    };
  }> {
    return apiPost(`/api/repositories/${slug}/scan`, params ?? { depth: 'full', includeSecrets: true });
  },

  async getVulnerabilities(slug: string, params?: { page?: number; limit?: number }): Promise<{
    repository: { slug: string; name: string };
    items: import('./vulnerabilitiesApi').Vulnerability[];
    pagination: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean };
    summary: {
      totalVulnerabilities: number;
      bySeverity: { critical: number; high: number; medium: number; low: number };
      byStatus: Record<string, number>;
    };
  }> {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiGet(`/api/repositories/${slug}/vulnerabilities${qs}`);
  },

  async getActivity(slug: string, params?: { page?: number; limit?: number; type?: string }): Promise<{
    repository: { slug: string; name: string };
    items: {
      id: string;
      timestamp: string;
      timestampISO: string;
      type: string;
      title: string;
      description: string;
      severity: string;
      initiator: { type: string; name: string; id: string };
      impact: { type: string; value: number; label: string };
      details: Record<string, string>;
      status: string;
    }[];
    pagination: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean };
    summary: { totalEvents: number; byType: Record<string, number>; byStatus: Record<string, number> };
  }> {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.type) query.set('type', params.type);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiGet(`/api/repositories/${slug}/activity${qs}`);
  },

  async getSecrets(slug: string): Promise<{
    repository: { slug: string; name: string };
    items: {
      id: string;
      type: string;
      pattern: string;
      file: string;
      lineNumber: number;
      severity: string;
      exposed: boolean;
      foundAt: string;
      status: string;
      remediedAt: string | null;
    }[];
    pagination: { total: number; exposed: number; remediated: number };
  }> {
    return apiGet(`/api/repositories/${slug}/secrets`);
  },

  async getLiveScan(slug: string): Promise<{
    repository: { slug: string; name: string };
    scanStatus: {
      currentScan: {
        id: string;
        status: string;
        startedAt: string;
        estimatedCompletionAt: string;
        progress: { stage: string; percentage: number; currentFile?: string; filesProcessed?: number; filesRemaining?: number };
        findings: { vulnerabilities: number; secrets: number; codeQuality: number };
      } | null;
      previousScans: unknown[];
    };
  }> {
    return apiGet(`/api/repositories/${slug}/live-scan`);
  },

  async getPullRequests(slug: string): Promise<{
    repository: { slug: string; name: string };
    items: {
      id: string;
      number: number;
      title: string;
      description: string;
      url: string;
      state: string;
      createdAt: string;
      updatedAt: string;
      createdBy: string;
      relatedVulnerability: { id: string; title: string };
      reviewStatus: string;
      reviewers: string[];
      approvals: number;
      requestedChanges: number;
      comments: number;
      commits: number;
    }[];
    pagination: { total: number; open: number; merged: number; closed: number };
  }> {
    return apiGet(`/api/repositories/${slug}/pull-requests`);
  },
};
