import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import repoReducer from './repoSlice';
import vulnerabilityReducer from './vulnerabilitySlice';
import analyticsReducer from './analyticsSlice';
import onboardingReducer from './onboardingSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    repos: repoReducer,
    vulnerabilities: vulnerabilityReducer,
    analytics: analyticsReducer,
    onboarding: onboardingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
