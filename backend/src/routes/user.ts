import { Router } from "express";
import {
  deleteUserController,
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
} from "@/controllers/user";
import { checkSession } from "@/middlewares/session";

const router = Router();

router.use(checkSession);

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export { router };
