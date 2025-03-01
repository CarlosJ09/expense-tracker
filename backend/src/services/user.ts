import { User } from "@prisma/client";
import prisma from "myconfig/prisma/client";
import AppError from "@/utils/app-error";

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new AppError("User not found", 404);

  return user;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUser = async (id: string, data: User) => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("User not found", 404);
    }
    throw new AppError("Something went wrong while updating the user", 500);
  }
};

const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("User not found", 404);
    }
    throw new AppError("Something went wrong while deleting the user", 500);
  }
};

export { getUser, getUsers, updateUser, deleteUser };
