import { Router } from "express";
import {
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "@/controllers/user";
import { checkSession } from "@/middlewares/session";
import { validate } from "@/middlewares/validate";
import { updateUserSchema } from "@/dtos/user.dto";
const router = Router();

router.use(checkSession);

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.put("/:id", validate(updateUserSchema), updateUserController);
router.delete("/:id", deleteUserController);

export { router };
