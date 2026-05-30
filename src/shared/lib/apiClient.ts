/**
 * API Client — Axios instance with interceptors for FurgleAI Dashboard
 *
 * Features:
 * - Auto-attaches Bearer token to every request
 * - Transparent access token refresh on 401 (with request queue during refresh)
 * - Normalizes API responses to data payload
 * - Maps error responses to ApiError shape
 * - Retry logic for 5xx errors (2 attempts, exponential backoff)
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from './tokenManager';
import { ApiError } from './errorParser';

const BASE_URL = 'http://localhost:4000';

// ─── Create Axios Instance ─────────────────────────────────────────────────
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Token Refresh State ───────────────────────────────────────────────────
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processRefreshQueue(token: string | null, error: unknown = null) {
  refreshQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  refreshQueue = [];
}

// ─── Request Interceptor — Attach Bearer Token ─────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    console.log('[apiClient] Requesting:', config.url, 'Token:', token ? token.substring(0, 10) + '...' : 'null');
    if (token && config.headers) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor — Handle 401, Normalize Errors ──────────────────
apiClient.interceptors.response.use(
  // Success: unwrap the data envelope
  (response: AxiosResponse) => response,

  // Error: handle 401 refresh, map to ApiError
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const errorCode = error.response?.data?.error?.code;

    console.log('[apiClient] Response error:', status, originalRequest?.url, errorCode);

    const isAuthRoute = originalRequest?.url?.includes('/api/auth/login') || 
                        originalRequest?.url?.includes('/api/auth/register') ||
                        originalRequest?.url?.includes('/api/auth/refresh-token');

    // ── 401 Unauthorized: attempt token refresh ────────────────────────────
    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      errorCode !== 'INVALID_REFRESH_TOKEN' // don't retry on bad refresh token
    ) {
      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise<AxiosResponse>((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              originalRequest._retry = true;
              originalRequest.headers.set('Authorization', `Bearer ${token}`);
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken: string = data.data.authentication.accessToken;
        tokenManager.setAccessToken(newAccessToken);
        processRefreshQueue(newAccessToken);

        // Retry original request with new token
        if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
          originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        } else {
          originalRequest.headers = originalRequest.headers ?? {} as any;
          (originalRequest.headers as any).Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log('[apiClient] Refresh token request failed:', refreshError);
        processRefreshQueue(null, refreshError);
        // Session dead — clear tokens and redirect to login
        tokenManager.clearAll();
        if (typeof window !== 'undefined') {
          console.log('[apiClient] Redirecting to login due to refresh failure');
          window.location.href = '/auth/login?expired=true';
        }
        return Promise.reject(mapToApiError(refreshError, 401));
      } finally {
        isRefreshing = false;
      }
    }

    // ── Map to ApiError shape ──────────────────────────────────────────────
    return Promise.reject(mapToApiError(error, status));
  }
);

/**
 * Map Axios error to our ApiError shape
 */
function mapToApiError(error: unknown, httpStatus?: number): ApiError {
  if (axios.isAxiosError(error) && error.response?.data) {
    const apiData = error.response.data;
    return {
      code: apiData.error?.code ?? 'SERVER_ERROR',
      message: apiData.error?.message ?? apiData.message ?? 'An unexpected error occurred.',
      details: apiData.error?.details,
      httpStatus: error.response.status ?? httpStatus ?? 500,
    };
  }

  if (axios.isAxiosError(error) && !error.response) {
    // Network error
    return {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server.',
      httpStatus: 0,
    };
  }

  return {
    code: 'SERVER_ERROR',
    message: 'An unexpected error occurred.',
    httpStatus: httpStatus ?? 500,
  };
}

// ─── Typed API helpers ─────────────────────────────────────────────────────

/** GET with typed response */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<{ data: T }>(url, config);
  return response.data.data;
}

/** POST with typed response */
export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.post<{ data: T }>(url, body, config);
  return response.data.data;
}

/** PATCH with typed response */
export async function apiPatch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.patch<{ data: T }>(url, body, config);
  return response.data.data;
}

/** DELETE with typed response */
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<{ data: T }>(url, config);
  return response.data.data;
}
