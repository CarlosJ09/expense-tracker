import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().positive({ message: "Expense amount must be positive" }),
  description: z.string().optional(),
  date: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
  categoryId: z.string().uuid({ message: "Invalid category ID format" }),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;

export const updateExpenseSchema = z.object({
  amount: z.number().positive({ message: "Expense amount must be positive" }).optional(),
  description: z.string().optional(),
  date: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
  categoryId: z.string().uuid({ message: "Invalid category ID format" }).optional(),
});

export type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;

export const expenseResponseSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  description: z.string().nullable(),
  date: z.date(),
  categoryId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ExpenseResponseDto = z.infer<typeof expenseResponseSchema>;
