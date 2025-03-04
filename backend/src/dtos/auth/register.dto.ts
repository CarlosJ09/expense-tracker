import { z } from "zod";
import { userResponseSchema } from "@/dtos/user.dto";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email({ message: "Invalid email address format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export type RegisterRequestDto = z.infer<typeof registerSchema.shape.body>;

export const registerResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export type RegisterResponseDto = z.infer<typeof registerResponseSchema>;
