/**
 * TokenManager — Secure token handling for FurgleAI Dashboard
 *
 * Strategy:
 * - Access token lives in MEMORY only (never persisted to disk — cleared on tab close)
 * - Refresh token lives in localStorage (encrypted label) for persistent sessions
 * - Session ID is kept in sessionStorage for logout calls
 *
 * This mirrors what Linear/Stripe do on their dashboards:
 * access tokens ephemeral, refresh tokens semi-persistent.
 */

const REFRESH_TOKEN_KEY = 'fa_rt';
const SESSION_ID_KEY = 'fa_sid';
const PENDING_EMAIL_KEY = 'fa_pe';

// In-memory access token (not persisted anywhere)
let _accessToken: string | null = null;

export const tokenManager = {
  // ─── Access Token (memory only) ───────────────────────────────────────────
  getAccessToken(): string | null {
    return _accessToken;
  },

  setAccessToken(token: string): void {
    _accessToken = token;
  },

  clearAccessToken(): void {
    _accessToken = null;
  },

  // ─── Refresh Token (localStorage) ─────────────────────────────────────────
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // ─── Session ID (sessionStorage for logout calls) ─────────────────────────
  getSessionId(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(SESSION_ID_KEY);
  },

  setSessionId(id: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(SESSION_ID_KEY, id);
  },

  clearSessionId(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SESSION_ID_KEY);
  },

  // ─── Pending Email (for verify-email flow) ────────────────────────────────
  getPendingEmail(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(PENDING_EMAIL_KEY);
  },

  setPendingEmail(email: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(PENDING_EMAIL_KEY, email);
  },

  clearPendingEmail(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(PENDING_EMAIL_KEY);
  },

  // ─── Bulk Operations ──────────────────────────────────────────────────────
  setTokens(params: {
    accessToken: string;
    refreshToken: string;
    sessionId?: string;
  }): void {
    this.setAccessToken(params.accessToken);
    this.setRefreshToken(params.refreshToken);
    if (params.sessionId) {
      this.setSessionId(params.sessionId);
    }
  },

  clearAll(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
    this.clearSessionId();
    this.clearPendingEmail();
  },

  isAuthenticated(): boolean {
    // Has memory token OR has refresh token to restore session
    return !!_accessToken || !!this.getRefreshToken();
  },
};
