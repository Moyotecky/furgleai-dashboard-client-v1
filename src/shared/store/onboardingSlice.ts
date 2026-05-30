import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  email: string;
  orgName: string;
  orgHandle: string;
  country: string;
  primaryIDE: string;
  useCase: string;
  teamSize: string;
  subscribeUpdates: boolean;
  profilePic: string;
}

export interface OnboardingState {
  currentStep: number;
  formData: OnboardingFormData;
  isSubmitting: boolean;
  error: string | null;
}

// ─── Initial State ──────────────────────────────────────────────────────────

const initialState: OnboardingState = {
  currentStep: 1,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    orgName: '',
    orgHandle: '',
    country: 'United States',
    primaryIDE: 'vscode',
    useCase: 'ci_cd',
    teamSize: 'Just me',
    subscribeUpdates: false,
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  },
  isSubmitting: false,
  error: null,
};

// ─── Async Thunk ────────────────────────────────────────────────────────────

export const submitOnboardingProfile = createAsyncThunk(
  'onboarding/submit',
  async (formData: OnboardingFormData, { rejectWithValue }) => {
    try {
      const result = await authApi.completeOnboarding({
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          profilePic: formData.profilePic,
          primaryIDE: formData.primaryIDE,
          useCase: formData.useCase,
          subscribeUpdates: formData.subscribeUpdates,
        },
        workspace: {
          name: formData.orgName,
          slug: formData.orgHandle,
          billingCountry: formData.country,
          teamSize: formData.teamSize,
        },
      });
      return result;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Onboarding failed. Please try again.');
    }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────────────

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    updateFormData: (state, action: PayloadAction<Partial<OnboardingFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
      // Auto-generate org slug from orgName
      if (action.payload.orgName !== undefined) {
        state.formData.orgHandle = action.payload.orgName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    },
    resetOnboarding: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitOnboardingProfile.pending, (state) => {
      state.isSubmitting = true;
      state.error = null;
    });
    builder.addCase(submitOnboardingProfile.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(submitOnboardingProfile.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload as string;
    });
  },
});

export const { setStep, nextStep, prevStep, updateFormData, resetOnboarding, clearError } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
