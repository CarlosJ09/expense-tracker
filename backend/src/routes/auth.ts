import { Router } from "express";
import { registerController, loginController } from "@/controllers/auth";
import { validate } from "@/middlewares/validate";
import { registerSchema } from "@/dtos/auth/register.dto";
import { loginSchema } from "@/dtos/auth/login.dto";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

export { router };
