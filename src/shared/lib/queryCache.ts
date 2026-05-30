/**
 * Query Cache — Simple TTL-based in-memory cache
 * Prevents redundant API calls within the same session (like SWR/React Query)
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class QueryCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    });
  }

  invalidate(keyPrefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.cache.delete(key);
      }
    }
  }

  invalidateAll(): void {
    this.cache.clear();
  }
}

export const queryCache = new QueryCache();

// ─── TTL Constants (in ms) ────────────────────────────────────────────────
export const CACHE_TTL = {
  ME: 5 * 60 * 1000,          // 5 min — user profile
  REPOS: 30 * 1000,           // 30s — repository list
  REPO_DETAIL: 30 * 1000,     // 30s — single repo
  VULNERABILITIES: 30 * 1000, // 30s — vuln list
  ANALYTICS: 2 * 60 * 1000,   // 2 min — analytics data
  ACTIVITY: 30 * 1000,        // 30s — activity feed
  LIVE_SCAN: 10 * 1000,       // 10s — live scan (short)
  PULL_REQUESTS: 30 * 1000,   // 30s — PRs
  SECRETS: 30 * 1000,         // 30s — secrets
};
