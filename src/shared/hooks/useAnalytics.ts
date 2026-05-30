import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnalyticsOverview } from '../store/analyticsSlice';
import { analyticsApi, RiskTrendData, RepoAnalytics, TeamAnalytics, AIExecutionAnalytics } from '../services/analyticsApi';
import { useToast } from '../lib/toastContext';

export function useAnalytics() {
  const dispatch = useAppDispatch();
  const { overview, aiExecution, teamAnalytics, isLoading, lastFetched, error } = useAppSelector((state) => state.analytics);
  const { toast } = useToast();

  const loadOverview = useCallback((force = false) => {
    if (force || !lastFetched || Date.now() - lastFetched > 120000) {
      dispatch(fetchAnalyticsOverview());
    }
  }, [dispatch, lastFetched]);

  const loadRiskTrend = useCallback(async (period: 'week' | 'month' | 'quarter'): Promise<RiskTrendData[] | null> => {
    try {
      const response = await analyticsApi.getRiskTrend({ period });
      return response.trend;
    } catch (e: any) {
      toast({ type: 'error', title: 'Analytics Error', message: 'Could not load risk trend data.' });
      return null;
    }
  }, [toast]);

  const loadRepoAnalytics = useCallback(async (): Promise<RepoAnalytics | null> => {
    try {
      return await analyticsApi.getRepositories();
    } catch (e: any) {
      toast({ type: 'error', title: 'Analytics Error', message: 'Could not load repository analytics.' });
      return null;
    }
  }, [toast]);

  const loadTeamAnalytics = useCallback(async (): Promise<TeamAnalytics | null> => {
    try {
      return await analyticsApi.getTeam();
    } catch (e: any) {
      toast({ type: 'error', title: 'Analytics Error', message: 'Could not load team analytics.' });
      return null;
    }
  }, [toast]);

  const loadAIExecutionAnalytics = useCallback(async (): Promise<AIExecutionAnalytics | null> => {
    try {
      return await analyticsApi.getAIExecution();
    } catch (e: any) {
      toast({ type: 'error', title: 'Analytics Error', message: 'Could not load AI execution analytics.' });
      return null;
    }
  }, [toast]);

  return {
    overview,
    aiExecution,
    teamAnalytics,
    isLoading,
    error,
    loadOverview,
    loadRiskTrend,
    loadRepoAnalytics,
    loadTeamAnalytics,
    loadAIExecutionAnalytics,
  };
}
