import { Router } from "express";
import productsRoute from "./productsRoute";

const routes = Router();

routes.use("/products", productsRoute);

export default routes;
