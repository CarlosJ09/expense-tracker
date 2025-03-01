import prisma from "myconfig/prisma/client";
import { encryptPassword, comparePasswords } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { LoginRequestDto, LoginResponseDto } from "@/dtos/auth/login.dto";
import { toUserResponseDto } from "@/dtos/user/user.dto";
import { RegisterRequestDto, RegisterResponseDto } from "@/dtos/auth/register.dto";
import AppError from "@/utils/app-error";

const registerUserService = async (payload: RegisterRequestDto): Promise<RegisterResponseDto> => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await encryptPassword(payload.password);
  payload.password = hashedPassword;
  const user = await prisma.user.create({ data: payload });

  const token = generateToken({ id: user.id });

  if (!token) {
    throw new AppError("Error creating user", 500);
  }

  return {
    token: token,
    user: toUserResponseDto(user),
  };
};

const loginUserService = async ({
  email,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Email or password is incorrect", 401);
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
    user: toUserResponseDto(user),
  };
};

export { registerUserService, loginUserService };
