import { Router } from "express";
import productsRoute from "./productsRoute";
import usersRoute from "./usersRoute";
import ordersRoute from "./ordersRoute";

const routes = Router();

routes.use("/products", productsRoute);
routes.use("/users", usersRoute);
routes.use("/orders", ordersRoute);

export default routes;
