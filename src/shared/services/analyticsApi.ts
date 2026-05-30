/**
 * Analytics API Service
 */

import { apiGet } from '../lib/apiClient';

// ─── Types ────────────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  metrics: {
    securityScore: number;
    scoreTrend: { value: number; direction: string; percentage: number };
    totalVulnerabilities: number;
    activeRepositories: number;
    aiIntroducedRiskPct: number;
    openCritical: number;
    openHigh: number;
    openMedium: number;
    openLow: number;
  };
  vulnerabilityCategories: {
    label: string;
    icon: string;
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    passPct: number;
  }[];
  aiRiskSources: {
    label: string;
    severity: string;
    aiPct: number;
    repo: string;
    trend: string;
    count: number;
  }[];
  securityEvents: {
    id: string;
    type: string;
    msg: string;
    detail: string;
    time: string;
    color: string;
  }[];
}

export interface RiskTrendData {
  period: string;
  granularity: string;
  labels: string[];
  data: number[];
  min: number;
  max: number;
  startScore: number;
  endScore: number;
  change: number;
}

export interface RepoAnalytics {
  overall: {
    mostVulnerable: { slug: string; name: string; score: number; critical: number }[];
    mostSecure: { slug: string; name: string; score: number }[];
    biggestMovers: { slug: string; name: string; change: number; direction: string }[];
  };
  details: {
    slug: string;
    name: string;
    score: number;
    vulnerabilities: { critical: number; high: number; medium: number; low: number };
    fixRate: number;
    aiAutopatchUsage: number;
    lastScanDate: string;
  }[];
}

export interface TeamAnalytics {
  metrics: {
    activeDevelopers: number;
    totalFixesApplied: number;
    averageTimeToFix: { value: number; unit: string; trend: string; percentage: number };
    aiAdoptionRate: number;
  };
  topPerformers: {
    id: string;
    name: string;
    avatarUrl?: string;
    fixesApplied: number;
    averageTimeToFix: string;
    aiAssistedPct: number;
  }[];
  departmentComparison: {
    department: string;
    score: number;
    openCritical: number;
    fixRate: number;
  }[];
}

export interface AIExecutionAnalytics {
  summary: {
    totalFixesGenerated: number;
    fixesThisWeek: number;
    automationRate: number;
    averageGenerationTime: string;
  };
  byStatus: Record<string, number>;
  successMetrics: Record<string, number>;
  trends: Record<string, number>;
  topPerformers: { vulnerabilityType: string; fixSuccessRate: number; count: number }[];
  modelUsage: { model: string; usagePercentage: number }[];
  latencyData: { time: string; latencyMs: number }[];
  throughputData: { time: string; requests: number }[];
  costData: { date: string; cost: number }[];
  redisSavings: { cacheHits: number; cacheMisses: number; timeSavedHours: number; costSavedUsd: number };
  recentFixes?: any[]; // optional fallback for existing UI
}

export interface ArchitectureAnalytics {
  dependencies: { name: string; version: string; status: string; vulnerabilities: number; outdated: boolean }[];
  secrets: { type: string; file: string; severity: string; status: string; repo: string }[];
}

export interface PipelineAnalytics {
  liveScanFeed: {
    status: string;
    activeNodes: string[];
    completedNodes: string[];
    pendingNodes: string[];
    currentStage: string;
    progress: number;
    events: { timestamp: string; message: string }[];
  };
}

// ─── Analytics API calls ───────────────────────────────────────────────────

export const analyticsApi = {
  async getOverview(): Promise<AnalyticsOverview> {
    return apiGet('/api/analytics/overview');
  },

  async getRiskTrend(params?: { period?: 'week' | 'month' | 'quarter'; granularity?: 'day' | 'week' }): Promise<{ period: any, trend: RiskTrendData[], summary: any }> {
    const query = new URLSearchParams();
    if (params?.period) query.set('period', params.period);
    if (params?.granularity) query.set('granularity', params.granularity);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiGet(`/api/analytics/risk-trend${qs}`);
  },

  async getRepositories(): Promise<RepoAnalytics> {
    return apiGet('/api/analytics/repositories');
  },

  async getTeam(): Promise<TeamAnalytics> {
    return apiGet('/api/analytics/team');
  },

  async getAIExecution(): Promise<AIExecutionAnalytics> {
    return apiGet('/api/analytics/ai-execution');
  },

  async getArchitecture(): Promise<ArchitectureAnalytics> {
    return apiGet('/api/analytics/architecture');
  },

  async getPipeline(): Promise<PipelineAnalytics> {
    return apiGet('/api/analytics/pipeline');
  }
};
