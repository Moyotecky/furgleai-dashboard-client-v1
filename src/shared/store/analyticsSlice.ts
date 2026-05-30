import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsOverview, AIExecutionAnalytics, TeamAnalytics, analyticsApi } from '../services/analyticsApi';

export interface AnalyticsState {
  overview: AnalyticsOverview | null;
  aiExecution: AIExecutionAnalytics | null;
  teamAnalytics: TeamAnalytics | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: AnalyticsState = {
  overview: null,
  aiExecution: null,
  teamAnalytics: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchAnalyticsOverview = createAsyncThunk(
  'analytics/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getOverview();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch analytics overview');
    }
  }
);

export const fetchAIExecutionAnalytics = createAsyncThunk(
  'analytics/fetchAIExecution',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getAIExecution();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch AI execution analytics');
    }
  }
);

export const fetchTeamAnalytics = createAsyncThunk(
  'analytics/fetchTeam',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getTeam();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch team analytics');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ── Overview ──────────────────────────────────────────────────────────────
    builder.addCase(fetchAnalyticsOverview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAnalyticsOverview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.overview = action.payload;
      state.lastFetched = Date.now();
    });
    builder.addCase(fetchAnalyticsOverview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // ── AI Execution ──────────────────────────────────────────────────────────
    builder.addCase(fetchAIExecutionAnalytics.fulfilled, (state, action) => {
      state.aiExecution = action.payload;
    });

    // ── Team ──────────────────────────────────────────────────────────────────
    builder.addCase(fetchTeamAnalytics.fulfilled, (state, action) => {
      state.teamAnalytics = action.payload;
    });
  },
});

export default analyticsSlice.reducer;
