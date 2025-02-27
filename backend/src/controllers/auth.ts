import { Request, Response, NextFunction } from "express";
import { registerNewUser, login } from "@/services/auth";

const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerNewUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await login({ email, password });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController };

