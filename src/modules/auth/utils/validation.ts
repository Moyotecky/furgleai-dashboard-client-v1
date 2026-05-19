import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username cannot exceed 20 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Username can only contain letters, numbers, underscores, and hyphens',
    }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'Verification code must be exactly 6 digits' })
    .regex(/^[0-9]+$/, { message: 'Verification code must contain only numbers' }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
