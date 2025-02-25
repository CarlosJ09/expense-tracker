import { Request, Response } from "express";
import { registerNewUser, login } from "@/services/auth";
import { handleHttp } from "@/utils/error-handler";

const registerController = async ({ body }: Request, res: Response) => {
  try {
    const user = registerNewUser(body);

    res.send(user);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_REGISTER_USER", e);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await login({ email, password });

    res.send(user);
  } catch (e) {
    handleHttp(res.status(500), "ERROR_LOGIN_USER", e);
  }
};

export { registerController, loginController };
