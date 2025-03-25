import { Router } from "express";
import {
  getBudgetController,
  getBudgetsController,
  createBudgetController,
  updateBudgetController,
  deleteBudgetController,
} from "@/controllers/budget";
import { checkSession } from "@/middlewares/session";
import { validate } from "@/middlewares/validate";
import { createBudgetSchema, updateBudgetSchema } from "@/dtos/budget.dto";
const router = Router();

router.use(checkSession);

router.get("/", getBudgetsController);
router.get("/:id", getBudgetController);
router.post("/", validate(createBudgetSchema), createBudgetController);
router.put("/:id", validate(updateBudgetSchema), updateBudgetController);
router.delete("/:id", deleteBudgetController);

export { router };
