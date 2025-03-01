import { Request, Response, NextFunction } from "express";
import { registerUserService, loginUserService } from "@/services/auth";

const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserService({ email, password });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController };
