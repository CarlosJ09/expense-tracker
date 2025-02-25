import { Request, Response } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "@/services/user";
import { handleHttp } from "@/utils/error-handler";

const getUserController = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = await getUser(id);

    res.send(user);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_GET_USER", e);
  }
};

const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.send(users);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_GET_USERS", e);
  }
};

const createUserController = ({ body }: Request, res: Response) => {
  try {
    const user = createUser(body);

    res.send(user);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_CREATE_USER", e);
  }
};

const updateUserController = ({ body, params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = updateUser(id, body);

    res.send(user);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_UPDATE_USER", e);
  }
};

const deleteUserController = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    deleteUser(id);

    res.send({ message: "User deleted" });
  } catch (e) {
    handleHttp(res.status(500), "ERROR_DELETE_USER", e);
  }
};

export {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
};
