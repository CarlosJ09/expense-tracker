import { z } from "zod";
import { userResponseSchema } from "@/dtos/user.dto";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export type LoginRequestDto = z.infer<typeof loginSchema.shape.body>;

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
