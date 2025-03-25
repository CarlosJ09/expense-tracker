import { Request, Response, NextFunction } from "express";
import { getBudget, getBudgets, createBudget, updateBudget, deleteBudget } from "@/services/budget";

const getBudgetController = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = params;
    const budget = await getBudget(id);

    res.send(budget);
  } catch (error) {
    next(error);
  }
};

const getBudgetsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const budgets = await getBudgets();

    res.send(budgets);
  } catch (error) {
    next(error);
  }
};

const createBudgetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const budget = await createBudget(req.body);

    res.status(201).send(budget);
  } catch (error) {
    next(error);
  }
};

const updateBudgetController = async (
  { body, params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = params;
    const budget = await updateBudget(id, body);

    res.send(budget);
  } catch (error) {
    next(error);
  }
};

const deleteBudgetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await deleteBudget(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getBudgetController,
  getBudgetsController,
  createBudgetController,
  updateBudgetController,
  deleteBudgetController,
};
