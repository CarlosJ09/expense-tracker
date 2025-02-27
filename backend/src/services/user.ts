import { User } from "@prisma/client";
import prisma from "@@prisma/client";
import AppError from "@/utils/error-handler";

const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) throw new AppError('User not found', 404);

    return user;
};

const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

const createUser = async (data: User) => {
    const user = await prisma.user.create({ data });
    return user;
};

const updateUser = async (id: string, data: User) => {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
};

const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({ where: { id } });
    return user;
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
