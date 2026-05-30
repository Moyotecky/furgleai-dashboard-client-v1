import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { vulnerabilitiesApi, Vulnerability, FixJob } from '../services/vulnerabilitiesApi';
import { fetchVulnerabilities, updateVulnerabilityOptimistic } from '../store/vulnerabilitySlice';
import { useToast } from '../lib/toastContext';

export function useVulnerabilities() {
  const dispatch = useAppDispatch();
  const { items: vulnerabilities, summary, isLoading, lastFetched } = useAppSelector((state) => state.vulnerabilities);
  const { toast } = useToast();
  const [isActionLoading, setIsActionLoading] = useState(false);

  const loadVulnerabilities = useCallback((force = false) => {
    if (force || !lastFetched || Date.now() - lastFetched > 30000) {
      dispatch(fetchVulnerabilities());
    }
  }, [dispatch, lastFetched]);

  const generateFix = useCallback(async (id: string, params?: { preferredApproach?: string }) => {
    setIsActionLoading(true);
    try {
      const response = await vulnerabilitiesApi.generateFix(id, params);
      dispatch(updateVulnerabilityOptimistic({ id, changes: { status: 'FIX_GENERATING' } }));
      toast({ type: 'info', title: 'Fix Generation Started', message: 'FurgleAI is analyzing and generating a patch.' });
      return response.fix;
    } catch (e: any) {
      toast({ type: 'error', title: 'Generation Failed', message: e.message || 'Could not start fix generation.' });
      throw e;
    } finally {
      setIsActionLoading(false);
    }
  }, [dispatch, toast]);

  const approveFix = useCallback(async (id: string, params: { fixId: string; prTitle: string; autoMerge: boolean }) => {
    setIsActionLoading(true);
    try {
      const response = await vulnerabilitiesApi.approveFix(id, params);
      dispatch(updateVulnerabilityOptimistic({ id, changes: { status: 'PR_CREATED' } }));
      toast({ type: 'success', title: 'PR Created', message: `Successfully created pull request: ${params.prTitle}` });
      return response;
    } catch (e: any) {
      toast({ type: 'error', title: 'Approval Failed', message: e.message || 'Could not approve fix and create PR.' });
      throw e;
    } finally {
      setIsActionLoading(false);
    }
  }, [dispatch, toast]);

  const dismissVulnerability = useCallback(async (id: string, reason: 'false_positive' | 'acceptable_risk' | 'wont_fix' | 'duplicate') => {
    setIsActionLoading(true);
    try {
      await vulnerabilitiesApi.dismiss(id, { reason });
      dispatch(updateVulnerabilityOptimistic({ id, changes: { status: 'DISMISSED' } }));
      toast({ type: 'success', title: 'Vulnerability Dismissed', message: 'The finding has been removed from active alerts.' });
    } catch (e: any) {
      toast({ type: 'error', title: 'Dismissal Failed', message: e.message || 'Could not dismiss vulnerability.' });
      throw e;
    } finally {
      setIsActionLoading(false);
    }
  }, [dispatch, toast]);

  return {
    vulnerabilities,
    summary,
    isLoading,
    isActionLoading,
    loadVulnerabilities,
    generateFix,
    approveFix,
    dismissVulnerability,
  };
}
