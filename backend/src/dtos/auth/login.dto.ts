import { z } from "zod";
import { userResponseSchema } from "@/dtos/user/user.dto";

export const loginRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
