import { z } from "zod";
import { userResponseSchema } from "@/dtos/user/user.dto";

export const registerRequestSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;

export const registerResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export type RegisterResponseDto = z.infer<typeof registerResponseSchema>;
