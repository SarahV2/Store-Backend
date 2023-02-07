import { Request, Response } from "express";
import { OrdersService, orderProduct } from "../models/order";
import { extractUserID } from "../utils/middleware";

const orderService = new OrdersService();

export const createOrder = async (_req: Request, res: Response) => {
  const userID = extractUserID(_req);

  try {
    if (userID) {
      const newOrder = await orderService.createOrder(userID);
      return res.status(201).json(newOrder);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const addProductsToOrder = async (_req: Request, res: Response) => {
  const orderID: string = _req.params.order_id;
  const productsList: orderProduct[] = _req.body.products;

  if (!orderID || !productsList) {
    return res
      .status(400)
      .json({ error: "missing order ID or products information" });
  }

  try {
    const addedProduct = await orderService.addProduct(orderID, productsList);
    return res.send(addedProduct);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const index = async (_req: Request, res: Response) => {
  const userID = extractUserID(_req);
  const { status } = _req.query;

  const filterByCompleteOrderStatus =
    status?.toString().toLowerCase() === "complete" ? true : false;

  if (userID) {
    try {
      const results = await orderService.index(
        userID,
        filterByCompleteOrderStatus
      );
      return res.send(results);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "invalid user_id" });
};

export const getOrdersByUserID = async (_req: Request, res: Response) => {
  const { status } = _req.query;
  const userID = _req.params.user_id;

  const filterByCompleteOrderStatus =
    status?.toString().toLowerCase() === "complete" ? true : false;

  if (userID) {
    try {
      const results = await orderService.index(
        userID,
        filterByCompleteOrderStatus
      );
      return res.send(results);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "invalid user_id" });
};
