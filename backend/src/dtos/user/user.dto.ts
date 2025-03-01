import { z } from "zod";
import { User } from "@prisma/client";

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;

export const updateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address format" }).optional(),
});

export type UpdateUserRequestDto = z.infer<typeof updateUserRequestSchema>;

export const toUserResponseDto = (user: User): UserResponseDto => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
