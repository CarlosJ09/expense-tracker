import { Request, Response, NextFunction } from "express";
import {
  getExpense,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/services/expense";

const getExpenseController = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = params;
    const expense = await getExpense(id);

    res.send(expense);
  } catch (error) {
    next(error);
  }
};

const getExpensesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await getExpenses();

    res.send(expenses);
  } catch (error) {
    next(error);
  }
};

const createExpenseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expense = await createExpense(req.body);

    res.status(201).send(expense);
  } catch (error) {
    next(error);
  }
};

const updateExpenseController = async (
  { body, params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = params;
    const expense = await updateExpense(id, body);

    res.send(expense);
  } catch (error) {
    next(error);
  }
};

const deleteExpenseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await deleteExpense(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getExpenseController,
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
};
