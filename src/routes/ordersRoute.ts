import { Router } from "express";
import {
  addProductsToOrder,
  createOrder,
  getOrdersByUserID,
  index,
} from "../controllers/ordersController";
import verifyToken from "../utils/middleware";

const route = Router();

route.post("/", verifyToken, createOrder);
route.post("/:order_id", verifyToken, addProductsToOrder);
route.get("/", verifyToken, index);
route.get("/users/:user_id", verifyToken, getOrdersByUserID);

export default route;
