import { User } from "@prisma/client";
import prisma from "@@prisma/client";
import { encryptPassword, comparePasswords } from "@/utils/bcrypt";
import { Auth } from "@/interfaces/auth";
import { generateToken } from "@/utils/jwt";

const registerNewUser = async (payload: User) => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (userAlreadyExists) {
    return "User already exists";
  }

  const hashedPassword = await encryptPassword(payload.password);
  payload.password = hashedPassword;

  const user = await prisma.user.create({ data: payload });

  return user;
};

const login = async ({ email, password }: Auth) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return "User not found";
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return "Invalid password";
  }

  const token = generateToken({ id: user.id });

  const data = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  return data;
};

export { registerNewUser, login };
