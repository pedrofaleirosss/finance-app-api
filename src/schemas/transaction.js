import z from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
  user_id: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'User ID is required.'
          : 'User ID must be a string.',
    })
    .uuid({
      message: 'User ID must be a valid UUID.',
    }),
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Name is required.'
          : 'Name must be a string.',
    })
    .trim()
    .min(1, { message: 'Name is required.' }),
  date: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Date is required.'
          : 'Date must be a string.',
    })
    .datetime('Date must be a valid ISO datetime.')
    .pipe(z.coerce.date()),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    error: (issue) =>
      issue.input === undefined
        ? 'Type is required.'
        : 'Type must be either EARNING, EXPENSE, or INVESTMENT.',
  }),
  amount: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? 'Amount is required.'
          : 'Amount must be a number.',
    })
    .min(1, { message: 'Amount must be greater than zero.' })
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
      }),
    ),
});
