import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { repositoriesApi, Repository } from '../services/repositoriesApi';
import { fetchRepositories, fetchAvailableRepositories, addConnectedRepo, removeConnectedRepo, updateRepoOptimistic } from '../store/repoSlice';
import { useToast } from '../lib/toastContext';

export function useRepositories() {
  const dispatch = useAppDispatch();
  const { items: repositories, unconnectedItems: availableRepositories, isLoading, isUnconnectedLoading, lastFetched } = useAppSelector((state) => state.repos);
  const { toast } = useToast();
  const [isActionLoading, setIsActionLoading] = useState(false);

  const loadRepositories = useCallback((force = false) => {
    // Basic TTL: don't fetch if fetched within last 30 seconds, unless forced
    if (force || !lastFetched || Date.now() - lastFetched > 30000) {
      dispatch(fetchRepositories());
    }
  }, [dispatch, lastFetched]);

  const loadAvailableRepositories = useCallback(() => {
    dispatch(fetchAvailableRepositories());
  }, [dispatch]);

  const connectRepository = useCallback(async (params: Parameters<typeof repositoriesApi.connect>[0]) => {
    setIsActionLoading(true);
    try {
      const response = await repositoriesApi.connect(params);
      dispatch(addConnectedRepo(response.repository));
      toast({ type: 'success', title: 'Repository Connected', message: `${params.name} is now being monitored.` });
      return response;
    } catch (e: any) {
      toast({ type: 'error', title: 'Connection Failed', message: e.message || 'Could not connect repository.' });
      throw e;
    } finally {
      setIsActionLoading(false);
    }
  }, [dispatch, toast]);

  const disconnectRepository = useCallback(async (slug: string) => {
    setIsActionLoading(true);
    try {
      await repositoriesApi.delete(slug);
      dispatch(removeConnectedRepo(slug));
      toast({ type: 'success', title: 'Repository Disconnected', message: `Successfully disconnected ${slug}.` });
    } catch (e: any) {
      toast({ type: 'error', title: 'Disconnection Failed', message: e.message || 'Could not disconnect repository.' });
      throw e;
    } finally {
      setIsActionLoading(false);
    }
  }, [dispatch, toast]);

  const updateRepository = useCallback(async (slug: string, changes: Partial<Repository>) => {
    // Optimistic update
    dispatch(updateRepoOptimistic({ slug, changes }));
    try {
      const response = await repositoriesApi.update(slug, changes);
      // Ensure sync with server response if needed
      dispatch(updateRepoOptimistic({ slug, changes: response.repository }));
    } catch (e: any) {
      // Revert could be implemented here if optimistic update fails
      toast({ type: 'error', title: 'Update Failed', message: e.message || 'Could not update repository settings.' });
      throw e;
    }
  }, [dispatch, toast]);

  const getRepositoryBySlug = useCallback((slug: string) => {
    return repositories.find(r => r.slug === slug);
  }, [repositories]);

  return {
    repositories,
    availableRepositories,
    isLoading,
    isUnconnectedLoading,
    isActionLoading,
    loadRepositories,
    loadAvailableRepositories,
    connectRepository,
    disconnectRepository,
    updateRepository,
    getRepositoryBySlug,
  };
}
