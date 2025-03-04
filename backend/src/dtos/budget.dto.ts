import { z } from "zod";

export const createBudgetSchema = z
  .object({
    amount: z.number().positive({ message: "Budget amount must be positive" }),
    categoryId: z.string().uuid({ message: "Invalid category ID format" }),
    startDate: z.string().or(z.date()).pipe(z.coerce.date()),
    endDate: z.string().or(z.date()).pipe(z.coerce.date()),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type CreateBudgetDto = z.infer<typeof createBudgetSchema>;

export const updateBudgetSchema = z.object({
  amount: z.number().positive({ message: "Budget amount must be positive" }).optional(),
  categoryId: z.string().uuid({ message: "Invalid category ID format" }).optional(),
  startDate: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
  endDate: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
});

export type UpdateBudgetDto = z.infer<typeof updateBudgetSchema>;

export const budgetResponseSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  categoryId: z.string().uuid(),
  userId: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BudgetResponseDto = z.infer<typeof budgetResponseSchema>;
