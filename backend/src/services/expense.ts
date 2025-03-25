import prisma from "myconfig/prisma/client";
import AppError from "@/utils/app-error";
import { CreateExpenseDto, UpdateExpenseDto } from "@/dtos/expense.dto";

const getExpense = async (id: string) => {
  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense) throw new AppError("Expense not found", 404);

  return expense;
};

const getExpenses = async () => {
  const expenses = await prisma.expense.findMany();
  return expenses;
};

const createExpense = async (data: CreateExpenseDto) => {
  try {
    return await prisma.expense.create({ data });
  } catch (error: any) {
    throw new AppError("Something went wrong while updating the expense", 500);
  }
};

const updateExpense = async (id: string, data: UpdateExpenseDto) => {
  try {
    return await prisma.expense.update({ where: { id }, data });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Expense not found", 404);
    }
    throw new AppError("Something went wrong while updating the expense", 500);
  }
};

const deleteExpense = async (id: string) => {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Expense not found", 404);
    }
    throw new AppError("Something went wrong while deleting the expense", 500);
  }
};

export { getExpense, getExpenses, createExpense, updateExpense, deleteExpense };
