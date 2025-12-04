import { NextFunction, Request, Response } from "express";
import { Order } from "../models/Order";

async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: 1,
      })
      .populate("products.product");

    if (!orders.length) throw new Error("Sem pedidos feitos!");

    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
}

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });

    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
}

async function changeOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status))
      throw new Error("Status do pedido inválido!");

    await Order.findByIdAndUpdate(orderId, { status });

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

export default {
  listOrders,
  createOrder,
  changeOrderStatus,
  deleteOrder,
};
