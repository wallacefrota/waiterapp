import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model";
import { ResourceAlreadyExists } from "../errors/resource-already-exists.error";
import { Product } from "../models/product.model";
import { ResourceNotFound } from "../errors/resource-not-found.error";

async function listCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Category.find();

    if (!categories.length) throw new Error("Sem categorias cadastradas!");

    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { icon, name } = req.body;
    const exists = await Category.findOne({
      name,
    });

    if (exists) throw new ResourceAlreadyExists(`Categoria ${name} já existe!`);

    const category = await Category.create({ icon, name });

    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
}

async function listProductsByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) throw new Error("Categoria não informada!");

    const data = await Product.find().where('category').equals(categoryId);

    if(!data.length) throw new ResourceNotFound("Sem produtos cadastrados para esta categoria!");

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

export default {
  listCategories,
  createCategory,
  listProductsByCategory
};
