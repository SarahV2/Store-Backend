import { Request, Response } from "express";
import { OrdersService, Order, orderProduct } from "../models/order";
import { extractUserID } from "../utils/middleware";

const OrderService = new OrdersService();

export const createOrder = async (_req: Request, res: Response) => {
  const userID = extractUserID(_req);

  try {
    if (userID) {
      const newOrder = await OrderService.createOrder(userID);
      return res.json(newOrder);
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
    const addedProduct = await OrderService.addProduct(orderID, productsList);
    return res.send(addedProduct);
  } catch (error: any) {
    return res.status(503).json({ error: error.message });
  }
};
