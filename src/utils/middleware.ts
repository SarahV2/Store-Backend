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

export const extractUserID = (req: Request): string | null => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const userID = jwt.decode(token)["user"]["user_id"];
    return userID;
  } catch (err) {
    // throw new Error("Could not get current user's ID");
    return null;
  }
};
export default verifyToken;
