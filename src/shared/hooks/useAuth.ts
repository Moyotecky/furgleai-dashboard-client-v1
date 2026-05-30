import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authApi } from '../services/authApi';
import { setAuthTokens, clearAuth } from '../store/authSlice';
import { useToast } from '../lib/toastContext';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading: isAuthLoading, isInitialized } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password, rememberMe);
      dispatch(setAuthTokens({
        user: response.user,
        accessToken: response.authentication.accessToken,
        refreshToken: response.authentication.refreshToken,
        sessionId: response.session.id,
      }));
      return response;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const register = useCallback(async (params: Parameters<typeof authApi.register>[0]) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(params);
      // For register, we typically require email verification before setting full auth state,
      // but if the API returns tokens right away, we could set them. 
      // The API spec returns auth tokens, but also verification requirements.
      if (!response.verification.required) {
        dispatch(setAuthTokens({
          user: response.user,
          accessToken: response.authentication.accessToken,
          refreshToken: response.authentication.refreshToken,
        }));
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // The thunk handles the API call and clearing local state
      const { logoutUser } = await import('../store/authSlice');
      await dispatch(logoutUser()).unwrap();
      // Optional: force redirect or let auth guard handle it
    } catch (e: any) {
      toast({ type: 'error', title: 'Logout Failed', message: e.message || 'Could not log out properly.' });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, toast]);

  return {
    user,
    isAuthenticated,
    isInitialized,
    isGlobalLoading: isAuthLoading,
    isActionLoading: isLoading,
    login,
    register,
    logout,
  };
}
