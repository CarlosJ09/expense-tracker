import { Request, Response, NextFunction } from "express";
import { getUser, getUsers, updateUser, deleteUser } from "@/services/user";

const getUserController = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = params;
    const user = await getUser(id);

    res.send(user);
  } catch (error) {
    next(error);
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

const updateUserController = async (
  { body, params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = params;
    const user = await updateUser(id, body);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteUser(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { getUserController, getUsersController, updateUserController, deleteUserController };
