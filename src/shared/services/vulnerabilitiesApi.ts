/**
 * Vulnerabilities API Service
 */

import { apiGet, apiPost } from '../lib/apiClient';

// ─── Types ────────────────────────────────────────────────────────────────

export type VulnerabilityStatus =
  | 'READY_TO_FIX'
  | 'FIX_GENERATING'
  | 'FIX_GENERATED'
  | 'PR_CREATED'
  | 'MANUAL_REVIEW'
  | 'BLOCKED'
  | 'DISMISSED'
  | 'MUTED';

export type VulnerabilitySeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Vulnerability {
  id: string;
  severity: VulnerabilitySeverity;
  title: string;
  status: VulnerabilityStatus;
  source: string;
  sourceDetails?: {
    tool: string;
    scanId: string;
    scanDate: string;
  };
  file: string;
  lineNumber: number;
  lineOfCode?: string;
  description: string;
  fullDescription?: string;
  attackPath: string[];
  codeSegment: { before: string; after: string } | string;
  patchCode: string;
  confidence: number;
  cwe?: { id: string; title: string; url: string };
  cvss?: { version: string; score: number; severity: string; vector: string };
  tags: string[];
  repoSlug: string;
  discoveredAt: string;
  updatedAt: string;
  fixStatus: {
    fixGenerated: boolean;
    fixGeneratedAt: string | null;
    prCreated: boolean;
    prUrl: string | null;
    approved: boolean;
    approvedAt: string | null;
    dismissed?: boolean;
    dismissedReason?: string | null;
  };
  references?: string[];
  relatedVulnerabilities?: string[];
  history?: { timestamp: string; action: string; details: string }[];
}

export interface VulnerabilityListResponse {
  items: Vulnerability[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  summary: {
    totalVulnerabilities: number;
    byStatus: Record<VulnerabilityStatus, number>;
    bySeverity: { critical: number; high: number; medium: number; low: number };
    fixAutomationRate: number;
  };
}

export interface FixJob {
  id: string;
  vulnerabilityId: string;
  status: 'generating' | 'completed' | 'failed';
  progress: {
    stage: string;
    percentage: number;
    estimatedTimeRemaining?: number;
  };
  startedAt: string;
  estimatedCompletionAt: string;
  completedAt?: string;
  totalDuration?: number;
  result?: {
    patchCode: string;
    explanation: string;
    confidence: number;
    testsPassed: boolean;
    readyForReview: boolean;
  };
  stages?: { name: string; status: 'pending' | 'in_progress' | 'done' }[];
}

// ─── Vulnerabilities API calls ────────────────────────────────────────────

export const vulnerabilitiesApi = {
  async list(params?: {
    page?: number;
    limit?: number;
    search?: string;
    severity?: string;
    status?: string;
  }): Promise<VulnerabilityListResponse> {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    if (params?.severity) query.set('severity', params.severity);
    if (params?.status) query.set('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiGet<VulnerabilityListResponse>(`/api/vulnerabilities${qs}`);
  },

  async getById(id: string): Promise<{ vulnerability: Vulnerability }> {
    return apiGet(`/api/vulnerabilities/${id}`);
  },

  async generateFix(id: string, params?: { preferredApproach?: string; additionalContext?: string }): Promise<{
    vulnerability: { id: string; status: VulnerabilityStatus; title: string };
    fix: FixJob;
  }> {
    return apiPost(`/api/vulnerabilities/${id}/fix`, params ?? {});
  },

  async getFixStatus(id: string): Promise<{ fix: FixJob }> {
    return apiGet(`/api/vulnerabilities/${id}/fix/status`);
  },

  async approveFix(id: string, params: {
    fixId: string;
    prTitle: string;
    autoMerge: boolean;
    reviewers?: string[];
  }): Promise<{
    vulnerability: { id: string; status: VulnerabilityStatus };
    pullRequest: {
      id: string;
      number: number;
      title: string;
      url: string;
      state: string;
      createdAt: string;
      createdBy: string;
      description: string;
      reviewers: string[];
      autoMergeEnabled: boolean;
    };
  }> {
    return apiPost(`/api/vulnerabilities/${id}/approve-fix`, params);
  },

  async dismiss(id: string, params: {
    reason: 'false_positive' | 'acceptable_risk' | 'wont_fix' | 'duplicate';
    explanation?: string;
    dismissedUntil?: string;
  }): Promise<{
    vulnerability: {
      id: string;
      status: 'DISMISSED';
      dismissedAt: string;
      dismissedBy: string;
      dismissReason: string;
      dismissExplanation: string;
      dismissedUntil: string | null;
    };
  }> {
    return apiPost(`/api/vulnerabilities/${id}/dismiss`, params);
  },
};
