import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile, authApi } from '../services/authApi';
import { tokenManager } from '../lib/tokenManager';

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // true by default until initial session check completes
  error: null,
  isInitialized: false,
};

// ─── Async Thunks ────────────────────────────────────────────────────────

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { rejectWithValue }) => {
  if (!tokenManager.isAuthenticated()) {
    return rejectWithValue('No tokens available');
  }

  try {
    const response = await authApi.me();
    return response.user;
  } catch (error: any) {
    // If it's a 401, the apiClient already handles token refresh, 
    // so if it still fails here, the session is truly dead.
    return rejectWithValue(error.message || 'Session expired');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    const sessionId = tokenManager.getSessionId();
    if (sessionId) {
      await authApi.logout(sessionId);
    }
  } catch (error) {
    // Ignore logout failures on backend
  } finally {
    tokenManager.clearAll();
  }
});

// ─── Slice ───────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: (state, action: PayloadAction<{ user: UserProfile; accessToken: string; refreshToken: string; sessionId?: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      tokenManager.setTokens({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        sessionId: action.payload.sessionId,
      });
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      tokenManager.clearAll();
    },
  },
  extraReducers: (builder) => {
    // Initialize Auth
    builder.addCase(initializeAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    });
    builder.addCase(initializeAuth.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setAuthTokens, clearAuth } = authSlice.actions;
export default authSlice.reducer;
