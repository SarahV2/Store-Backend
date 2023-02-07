import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    return res.status(401).json("Access denied, invalid token");
  }
};

export const extractUserID = (req: Request): string | null => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const userPayload = jwt.decode(token as string) as JwtPayload;
    if (userPayload) {
      return userPayload["user"]["user_id"];
    }
    return null;
  } catch (err) {
    // throw new Error("Could not get current user's ID");
    return null;
  }
};
export default verifyToken;
