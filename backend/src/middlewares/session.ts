import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";

export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawToken = req.headers.authorization || "";
    const token = rawToken.split(" ").pop();

    if (!token) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const user = verifyToken(token);

    if (!user) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    res.status(400).send({ error: "INVALID_SESSION" });
  }
};
