import { Request, Response, NextFunction } from "express";
import { Logger } from "tslog";

export const logger = new Logger({ name: "logger" });

const ApiAccessLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { originalUrl } = req;
  const baseUrl = `${req.protocol}://${req.headers.host}${originalUrl}`;
  logger.info(`[API Access] ${baseUrl}`);
  next();
};

export default ApiAccessLogger;
