/**
 * Auth API Service — All authentication endpoints
 */

import { apiPost, apiGet, apiPatch } from '../lib/apiClient';

// ─── Types ────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  role: string;
  subscriptionTier: string;
  plan?: {
    name: string;
    repositories: number;
    storage: string;
    aiAutopatch: boolean;
    users: number;
    monthlyPrice: number;
    renewalDate: string;
  };
  createdAt: string;
  lastLogin: string;
  lastActivity: string;
  preferences: {
    notifications: boolean;
    emailDigest: string;
    theme: string;
  };
  permissions?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
}

export interface LoginPayload {
  user: UserProfile;
  authentication: AuthTokens;
  session: {
    id: string;
    createdAt: string;
    expiresAt: string;
    ipAddress: string;
    userAgent: string;
    twoFactorRequired: boolean;
  };
}

export interface RegisterPayload {
  user: UserProfile;
  authentication: AuthTokens;
  verification: {
    required: boolean;
    codeSent: boolean;
    codeExpiresIn: number;
    email: string;
    message: string;
  };
}

// ─── Auth API calls ────────────────────────────────────────────────────────

export const authApi = {
  async login(email: string, password: string, rememberMe = false): Promise<LoginPayload> {
    return apiPost<LoginPayload>('/api/auth/login', { email, password, rememberMe });
  },

  async register(params: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
  }): Promise<RegisterPayload> {
    return apiPost<RegisterPayload>('/api/auth/register', params);
  },

  async verifyEmail(email: string, code: string): Promise<{ user: { id: string; email: string; emailVerified: boolean; verifiedAt: string }; verification: { status: string; message: string } }> {
    return apiPost('/api/auth/verify-email', { email, code });
  },

  async resendVerification(email: string): Promise<{ verification: { codeSent: boolean; codeExpiresIn: number; email: string } }> {
    return apiPost('/api/auth/resend-verification', { email });
  },

  async forgotPassword(email: string): Promise<{ reset: { codeSent: boolean; codeExpiresIn: number; email: string; message: string } }> {
    return apiPost('/api/auth/forgot-password', { email });
  },

  async resetPassword(params: {
    email: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ reset: { status: string; email: string; passwordUpdatedAt: string } }> {
    return apiPost('/api/auth/reset-password', params);
  },

  async refreshToken(refreshToken: string): Promise<{ authentication: AuthTokens }> {
    return apiPost('/api/auth/refresh-token', { refreshToken });
  },

  async logout(sessionId: string): Promise<{ logout: { status: string; sessionTerminated: boolean; message: string } }> {
    return apiPost('/api/auth/logout', { sessionId });
  },

  async me(): Promise<{ user: UserProfile }> {
    return apiGet('/api/auth/me');
  },

  async updateMe(updates: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'preferences'>>): Promise<{ user: Partial<UserProfile> }> {
    return apiPatch('/api/auth/me', updates);
  },

  async completeOnboarding(payload: {
    profile: {
      firstName: string;
      lastName: string;
      profilePic: string;
      primaryIDE: string;
      useCase: string;
      subscribeUpdates: boolean;
    };
    workspace: {
      name: string;
      slug: string;
      billingCountry: string;
      teamSize: string;
    };
  }): Promise<{ status: string; message: string; data: { user: UserProfile; org: Record<string, unknown> } }> {
    return apiPost('/api/auth/onboarding/complete', payload);
  },
};
