import { Router } from "express";
import {
  addProductsToOrder,
  createOrder,
} from "../controllers/ordersController";
import verifyToken from "../utils/middleware";

const route = Router();

route.post("/", verifyToken, createOrder);
route.post("/:order_id", addProductsToOrder);

export default route;
