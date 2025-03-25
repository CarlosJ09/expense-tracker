import { Request, Response, NextFunction } from "express";
import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category";

const getCategoryController = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = params;
    const category = await getCategory(id);

    res.send(category);
  } catch (error) {
    next(error);
  }
};

const getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategories();

    res.send(categories);
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
};

const updateCategoryController = async (
  { body, params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = params;
    const category = await updateCategory(id, body);

    res.send(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await deleteCategory(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getCategoryController,
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
