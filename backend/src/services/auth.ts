import { User } from "@prisma/client";
import prisma from "myconfig/prisma/client";
import { encryptPassword, comparePasswords } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { LoginRequest, LoginResponse } from "@/dtos/auth.dto";
import AppError from "@/utils/error-handler";

const registerNewUser = async (payload: User) => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await encryptPassword(payload.password);
  payload.password = hashedPassword;

  return await prisma.user.create({ data: payload });
};

const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }

  const token = generateToken({ id: user.id });

  if (!token) {
    throw new AppError("Error generating token", 500);
  }

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export { registerNewUser, login };
