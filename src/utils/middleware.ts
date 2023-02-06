import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    return res.status(401).json("Access denied, invalid token");
  }
};

export default verifyToken;
