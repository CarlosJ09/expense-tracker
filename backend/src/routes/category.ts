import { Router } from "express";
import {
  getCategoryController,
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "@/controllers/category";
import { checkSession } from "@/middlewares/session";
import { validate } from "@/middlewares/validate";
import { createCategorySchema, updateCategorySchema } from "@/dtos/category.dto";
const router = Router();

router.use(checkSession);

router.get("/", getCategoryController);
router.get("/:id", getCategoriesController);
router.post("/", validate(createCategorySchema), createCategoryController);
router.put("/:id", validate(updateCategorySchema), updateCategoryController);
router.delete("/:id", deleteCategoryController);

export { router };
