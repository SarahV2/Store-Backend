import { Request, Response } from "express";
import { Product, ProductService } from "../models/Product";

const Product = new ProductService();

export const index = async (req: Request, res: Response) => {
  const results = await Product.index();
  res.send(results);
};

export const show = async (req: Request, res: Response) => {
  try {
    const product_id = Number(req.params.product_id);
    if (!product_id) {
      return res.status(400).send("Product ID is missing");
    }
    const product = await Product.show(product_id);
    res.send(product);
  } catch (error) {
    res.status(401).json(error);
  }
};
