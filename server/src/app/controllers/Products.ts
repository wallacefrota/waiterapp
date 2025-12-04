import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { ResourceNotFound } from "../functions/errors/resource-not-found";
import fs from "fs/promises";
import path from "node:path";
import { parseNumber } from "../utils/functions";

async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await Product.find();

    if (!products.length)
      throw new ResourceNotFound("Sem produtos cadastrados!");

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    if(!req.file) throw new Error("Imagem do produto não enviada!");

    const imagePath = req.file.filename;

    const { name, description, price, ingredients, category } =
      req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: parseNumber(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      category,
    });

    return res.status(201).json(product);
  } catch (error) {
    if(req.file) await fs.unlink(path.resolve(req.file.destination, req.file.filename))
    return next(error);
  }
}

export default {
  listProducts,
  createProduct
};
