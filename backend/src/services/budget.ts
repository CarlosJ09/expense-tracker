import prisma from "myconfig/prisma/client";
import AppError from "@/utils/app-error";
import { CreateBudgetDto, UpdateBudgetDto } from "@/dtos/budget.dto";

const getBudget = async (id: string) => {
  const budget = await prisma.budget.findUnique({
    where: { id },
  });

  if (!budget) throw new AppError("Budget not found", 404);

  return budget;
};

const getBudgets = async () => {
  const budgets = await prisma.budget.findMany();
  return budgets;
};

const createBudget = async (data: CreateBudgetDto) => {
  try {
    return await prisma.budget.create({ data });
  } catch (error: any) {
    throw new AppError("Something went wrong while updating the budget", 500);
  }
};

const updateBudget = async (id: string, data: UpdateBudgetDto) => {
  try {
    return await prisma.budget.update({ where: { id }, data });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Budget not found", 404);
    }
    throw new AppError("Something went wrong while updating the budget", 500);
  }
};

const deleteBudget = async (id: string) => {
  try {
    return await prisma.budget.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Budget not found", 404);
    }
    throw new AppError("Something went wrong while deleting the budget", 500);
  }
};

export { getBudget, getBudgets, createBudget, updateBudget, deleteBudget };
