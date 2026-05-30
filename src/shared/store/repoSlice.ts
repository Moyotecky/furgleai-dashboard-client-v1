import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Repository as ApiRepository, AvailableRepository, repositoriesApi } from '../services/repositoriesApi';

// Extend the API Repository shape with any UI-specific needs if necessary
export type Repository = ApiRepository;

export interface RepoState {
  items: Repository[];
  unconnectedItems: AvailableRepository[];
  isLoading: boolean;
  isUnconnectedLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: RepoState = {
  items: [],
  unconnectedItems: [],
  isLoading: false,
  isUnconnectedLoading: false,
  error: null,
  lastFetched: null,
};

// ─── Async Thunks ────────────────────────────────────────────────────────

export const fetchRepositories = createAsyncThunk('repos/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await repositoriesApi.list({ limit: 100 });
    return response.items;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch repositories');
  }
});

export const fetchAvailableRepositories = createAsyncThunk('repos/fetchAvailable', async (_, { rejectWithValue }) => {
  try {
    const response = await repositoriesApi.getAvailable();
    return response.items;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch available repositories');
  }
});

// ─── Slice ───────────────────────────────────────────────────────────────

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    // Optimistic updates
    addConnectedRepo: (state, action: PayloadAction<Repository>) => {
      state.items.unshift(action.payload);
      state.unconnectedItems = state.unconnectedItems.filter((r) => r.id !== action.payload.id);
    },
    removeConnectedRepo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.slug !== action.payload);
    },
    updateRepoOptimistic: (state, action: PayloadAction<{ slug: string; changes: Partial<Repository> }>) => {
      const repo = state.items.find((r) => r.slug === action.payload.slug);
      if (repo) {
        Object.assign(repo, action.payload.changes);
      }
    },
  },
  extraReducers: (builder) => {
    // fetchRepositories
    builder.addCase(fetchRepositories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.lastFetched = Date.now();
    });
    builder.addCase(fetchRepositories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // fetchAvailableRepositories
    builder.addCase(fetchAvailableRepositories.pending, (state) => {
      state.isUnconnectedLoading = true;
    });
    builder.addCase(fetchAvailableRepositories.fulfilled, (state, action) => {
      state.isUnconnectedLoading = false;
      state.unconnectedItems = action.payload;
    });
    builder.addCase(fetchAvailableRepositories.rejected, (state) => {
      state.isUnconnectedLoading = false;
    });
  },
});

export const { addConnectedRepo, removeConnectedRepo, updateRepoOptimistic } = repoSlice.actions;
export default repoSlice.reducer;
