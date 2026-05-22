import z from 'zod';

export const createUserSchema = z.object({
  first_name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'First name is required.'
          : 'First name must be a string.',
    })
    .trim()
    .min(1, {
      message: 'First name is required.',
    }),
  last_name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Last name is required.'
          : 'Last name must be a string.',
    })
    .trim()
    .min(1, {
      message: 'Last name is required.',
    }),
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Email is required.'
          : 'Email must be a string.',
    })
    .email({
      message: 'Invalid email address.',
    }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Password is required.'
          : 'Password must be a string.',
    })
    .trim()
    .min(6, {
      message: 'Password must be at least 6 characters long.',
    }),
});
