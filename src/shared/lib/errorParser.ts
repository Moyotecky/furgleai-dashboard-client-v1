/**
 * Error Parser — Maps API error codes to human-readable messages
 * Inspired by Stripe's approach: specific, actionable, non-technical
 */

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  httpStatus: number;
}

export interface ParsedError {
  /** User-facing title */
  title: string;
  /** User-facing body message */
  message: string;
  /** Which form field is affected (if applicable) */
  field?: string;
  /** Whether this is a network/server error vs user error */
  isServerError: boolean;
}

// Map API error codes to friendly UI messages
const ERROR_MAP: Record<string, { title: string; message: string; field?: string }> = {
  // Auth errors
  INVALID_CREDENTIALS: {
    title: 'Sign in failed',
    message: 'The email or password you entered is incorrect. Please try again.',
    field: 'password',
  },
  USER_NOT_FOUND: {
    title: 'Account not found',
    message: 'No account exists with this email address.',
    field: 'email',
  },
  EMAIL_ALREADY_EXISTS: {
    title: 'Email already registered',
    message: 'An account with this email already exists. Try signing in instead.',
    field: 'email',
  },
  USERNAME_TAKEN: {
    title: 'Username unavailable',
    message: 'This username is already taken. Please choose a different one.',
    field: 'username',
  },
  INVALID_CODE: {
    title: 'Invalid code',
    message: 'The verification code you entered is incorrect. Please check and try again.',
  },
  CODE_EXPIRED: {
    title: 'Code expired',
    message: 'Your verification code has expired. Please request a new one.',
  },
  INVALID_REFRESH_TOKEN: {
    title: 'Session expired',
    message: 'Your session has expired. Please sign in again.',
  },

  // Repository errors
  REPOSITORY_NOT_FOUND: {
    title: 'Repository not found',
    message: 'This repository could not be found or has been disconnected.',
  },
  PLAN_RESTRICTION: {
    title: 'Plan upgrade required',
    message: 'This feature is not available on your current plan. Upgrade to unlock.',
  },
  PLAN_LIMIT_EXCEEDED: {
    title: 'Repository limit reached',
    message: "You've reached the maximum number of repositories for your plan.",
  },

  // Vulnerability errors
  VULNERABILITY_NOT_FOUND: {
    title: 'Vulnerability not found',
    message: 'This vulnerability could not be found. It may have already been resolved.',
  },
  ALREADY_DISMISSED: {
    title: 'Already dismissed',
    message: 'This vulnerability has already been dismissed.',
  },

  // General errors
  VALIDATION_ERROR: {
    title: 'Validation error',
    message: 'Some fields have invalid values. Please review and try again.',
  },
  RATE_LIMITED: {
    title: 'Too many requests',
    message: "You're moving too fast! Please wait a moment before trying again.",
  },
  SERVER_ERROR: {
    title: 'Something went wrong',
    message: 'Our servers are having trouble right now. Please try again in a moment.',
  },
};

const NETWORK_ERROR: ParsedError = {
  title: 'Connection failed',
  message: 'Unable to reach the server. Please check your internet connection and try again.',
  isServerError: true,
};

const UNKNOWN_ERROR: ParsedError = {
  title: 'Something went wrong',
  message: 'An unexpected error occurred. Please try again.',
  isServerError: true,
};

export function parseApiError(error: unknown): ParsedError {
  // Network/fetch error
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return NETWORK_ERROR;
  }

  // Our ApiError shape
  if (error && typeof error === 'object' && 'code' in error) {
    const apiErr = error as ApiError;
    const mapped = ERROR_MAP[apiErr.code];
    if (mapped) {
      return {
        title: mapped.title,
        message: mapped.message,
        field: mapped.field,
        isServerError: apiErr.httpStatus >= 500,
      };
    }
    // Fallback to server message
    return {
      title: 'Error',
      message: apiErr.message || 'An error occurred.',
      isServerError: apiErr.httpStatus >= 500,
    };
  }

  // Generic Error
  if (error instanceof Error) {
    return {
      title: 'Error',
      message: error.message,
      isServerError: false,
    };
  }

  return UNKNOWN_ERROR;
}

/**
 * Get field-specific error message for inline form display
 */
export function getFieldError(error: unknown, field: string): string | undefined {
  if (!error) return undefined;
  const parsed = parseApiError(error);
  if (parsed.field === field) return parsed.message;
  return undefined;
}
