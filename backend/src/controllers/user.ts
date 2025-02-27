import { Request, Response, NextFunction } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "@/services/user";

const getUserController = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = params;
        const user = await getUser(id);

        res.send(user);
    } catch (error) {
        next(error)
    }
};

const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();

        res.send(users);
    } catch (error) {
        next(error);
    }
};

const createUserController = ({ body }: Request, res: Response, next: NextFunction) => {
    try {
        const user = createUser(body);

        res.send(user);
    } catch (error) {
        next(error);
    }
};

const updateUserController = ({ body, params }: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = params;
        const user = updateUser(id, body);

        res.send(user);
    } catch (error) {
        next(error);
    }
};

const deleteUserController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        deleteUser(id);

        res.send({ message: "User deleted" });
    } catch (error) {
        next(error);
    }
};

export {
    getUserController,
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
};
