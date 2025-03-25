import prisma from "myconfig/prisma/client";
import AppError from "@/utils/app-error";
import { CreateCategoryDto, UpdateCategoryDto } from "@/dtos/category.dto";

const getCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) throw new AppError("Category not found", 404);

  return category;
};

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const createCategory = async (data: CreateCategoryDto) => {
  try {
    return await prisma.category.create({ data });
  } catch (error: any) {
    throw new AppError("Something went wrong while updating the category", 500);
  }
};

const updateCategory = async (id: string, data: UpdateCategoryDto) => {
  try {
    return await prisma.category.update({ where: { id }, data });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Category not found", 404);
    }
    throw new AppError("Something went wrong while updating the category", 500);
  }
};

const deleteCategory = async (id: string) => {
  try {
    return await prisma.category.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Category not found", 404);
    }
    throw new AppError("Something went wrong while deleting the category", 500);
  }
};

export { getCategory, getCategories, createCategory, updateCategory, deleteCategory };
