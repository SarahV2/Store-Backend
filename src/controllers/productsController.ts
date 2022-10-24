import { Request, Response } from "express";
import { Product, ProductService } from "../models/Product";

const Product = new ProductService();

export const index = async (req: Request, res: Response) => {
  const results = await Product.index();
  res.send(results);
};
