import { Router } from "express";
import { index } from "../controllers/productsController";

const route = Router();

route.get("/", index);

export default route;
