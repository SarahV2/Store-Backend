import { Router } from "express";
import { index, show, create } from "../controllers/productsController";
import verifyToken from "../utils/middleware";

const route = Router();

route.get("/", index);

route.get("/:product_id", show);

route.post("/", verifyToken, create);

export default route;
