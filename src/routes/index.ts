import { Router } from "express";
import productsRoute from "./productsRoute";
import usersRoute from "./usersRoute";

const routes = Router();

routes.use("/products", productsRoute);
routes.use("/users", usersRoute);

export default routes;
