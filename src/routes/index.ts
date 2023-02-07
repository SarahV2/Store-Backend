import { Router } from "express";
import productsRoute from "./productsRoute";
import usersRoute from "./usersRoute";
import ordersRoute from "./ordersRoute";
import ApiAccessLogger from "../utils/logging";

const routes = Router();

routes.use("/products", ApiAccessLogger, productsRoute);
routes.use("/users", ApiAccessLogger, usersRoute);
routes.use("/orders", ApiAccessLogger, ordersRoute);

export default routes;
