import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters long" }),
  userId: z.string().uuid({ message: "Invalid user ID format" }),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long" })
    .optional(),
  userId: z.string().uuid({ message: "Invalid user ID format" }),
});

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

// Category Response DTO
export const categoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CategoryResponseDto = z.infer<typeof categoryResponseSchema>;
