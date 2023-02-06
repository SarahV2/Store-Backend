import { Router } from "express";
import {
  index,
  create,
  authenticate,
  show,
} from "../controllers/usersController";
import verifyToken from "../utils/middleware";

const route = Router();

route.get("/", verifyToken, index);
route.get("/:user_id", verifyToken, show);
route.post("/", create);
route.post("/login", authenticate);

export default route;
