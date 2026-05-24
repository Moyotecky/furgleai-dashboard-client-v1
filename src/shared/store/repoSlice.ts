import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Repository {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'scanning' | 'error';
  score: number;
  branch: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  lastScan: string;
  connectedAt: string;
  isPrivate: boolean;
  scanFrequency: 'continuous' | 'daily' | 'weekly';
  aiAutopatch: boolean;
}

export interface RepoState {
  items: Repository[];
  unconnectedItems: Omit<Repository, 'connectedAt'>[];
}

const initialRepositories: Repository[] = [
  {
    id: '1',
    name: 'payments-api',
    slug: 'payments-api',
    status: 'active',
    score: 82,
    branch: 'main',
    critical: 1,
    high: 2,
    medium: 3,
    low: 5,
    lastScan: '3m ago',
    connectedAt: 'Jan 14, 2026',
    isPrivate: true,
    scanFrequency: 'continuous',
    aiAutopatch: true,
  },
  {
    id: '2',
    name: 'auth-service',
    slug: 'auth-service',
    status: 'active',
    score: 94,
    branch: 'main',
    critical: 0,
    high: 1,
    medium: 1,
    low: 2,
    lastScan: '2h ago',
    connectedAt: 'Feb 08, 2026',
    isPrivate: true,
    scanFrequency: 'continuous',
    aiAutopatch: true,
  },
  {
    id: '3',
    name: 'infra-core',
    slug: 'infra-core',
    status: 'error',
    score: 68,
    branch: 'master',
    critical: 3,
    high: 4,
    medium: 2,
    low: 1,
    lastScan: '1d ago',
    connectedAt: 'Mar 22, 2026',
    isPrivate: true,
    scanFrequency: 'daily',
    aiAutopatch: false,
  },
];

const initialUnconnected: Omit<Repository, 'connectedAt'>[] = [
  {
    id: '4',
    name: 'gateway-router',
    slug: 'gateway-router',
    status: 'active',
    score: 91,
    branch: 'main',
    critical: 0,
    high: 2,
    medium: 0,
    low: 1,
    lastScan: 'Never scanned',
    isPrivate: false,
    scanFrequency: 'continuous',
    aiAutopatch: true,
  },
  {
    id: '5',
    name: 'billing-worker',
    slug: 'billing-worker',
    status: 'active',
    score: 79,
    branch: 'main',
    critical: 0,
    high: 3,
    medium: 4,
    low: 8,
    lastScan: 'Never scanned',
    isPrivate: true,
    scanFrequency: 'continuous',
    aiAutopatch: true,
  },
  {
    id: '6',
    name: 'notification-service',
    slug: 'notification-service',
    status: 'active',
    score: 88,
    branch: 'main',
    critical: 0,
    high: 1,
    medium: 2,
    low: 4,
    lastScan: 'Never scanned',
    isPrivate: false,
    scanFrequency: 'continuous',
    aiAutopatch: false,
  },
  {
    id: '7',
    name: 'data-lake-pipeline',
    slug: 'data-lake-pipeline',
    status: 'error',
    score: 55,
    branch: 'develop',
    critical: 5,
    high: 8,
    medium: 12,
    low: 19,
    lastScan: 'Never scanned',
    isPrivate: true,
    scanFrequency: 'daily',
    aiAutopatch: false,
  },
  {
    id: '8',
    name: 'admin-dashboard',
    slug: 'admin-dashboard',
    status: 'active',
    score: 96,
    branch: 'main',
    critical: 0,
    high: 0,
    medium: 2,
    low: 3,
    lastScan: 'Never scanned',
    isPrivate: true,
    scanFrequency: 'weekly',
    aiAutopatch: true,
  },
];

const initialState: RepoState = {
  items: initialRepositories,
  unconnectedItems: initialUnconnected,
};

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    connectRepo: (state, action: PayloadAction<string>) => {
      const unconnectedIndex = state.unconnectedItems.findIndex(item => item.slug === action.payload);
      if (unconnectedIndex !== -1) {
        const unconnected = state.unconnectedItems[unconnectedIndex];
        // Move to connected items with the current date
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = new Date().toLocaleDateString('en-US', options);
        
        state.items.push({
          ...unconnected,
          connectedAt: formattedDate,
          lastScan: 'Just now',
          status: 'scanning', // Start with scanning state!
        });
        // Remove from unconnected items list
        state.unconnectedItems.splice(unconnectedIndex, 1);
      }
    },
    finishScanningRepo: (state, action: PayloadAction<string>) => {
      const repo = state.items.find(item => item.slug === action.payload);
      if (repo && repo.status === 'scanning') {
        repo.status = 'active';
      }
    },
    deleteRepo: (state, action: PayloadAction<string>) => {
      const repoIndex = state.items.findIndex(item => item.slug === action.payload);
      if (repoIndex !== -1) {
        const deletedRepo = state.items[repoIndex];
        // Move back to unconnected items
        const { connectedAt, ...unconnectedVersion } = deletedRepo;
        state.unconnectedItems.push({
          ...unconnectedVersion,
          status: 'active',
          lastScan: 'Never scanned'
        });
        // Remove from connected items list
        state.items.splice(repoIndex, 1);
      }
    },
    updateRepo: (state, action: PayloadAction<{ slug: string; changes: Partial<Repository> }>) => {
      const repo = state.items.find(item => item.slug === action.payload.slug);
      if (repo) {
        Object.assign(repo, action.payload.changes);
      }
    },
  },
});

export const { connectRepo, finishScanningRepo, deleteRepo, updateRepo } = repoSlice.actions;
export default repoSlice.reducer;
