import { Router } from "express";
import {
  getExpenseController,
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
} from "@/controllers/expense";
import { checkSession } from "@/middlewares/session";
import { validate } from "@/middlewares/validate";
import { createExpenseSchema, updateExpenseSchema } from "@/dtos/expense.dto";
const router = Router();

router.use(checkSession);

router.get("/", getExpenseController);
router.get("/:id", getExpensesController);
router.post("/", validate(createExpenseSchema), createExpenseController);
router.put("/:id", validate(updateExpenseSchema), updateExpenseController);
router.delete("/:id", deleteExpenseController);

export { router };
