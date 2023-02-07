import { Request, Response } from "express";
import { Product, ProductService } from "../models/product";

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

    if (!product) {
      res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const product: Product = {
      name,
      price,
    };
    if (!name || !price) {
      return res.status(400).send("Missing product information");
    }

    const newProduct = await Product.create(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(401).json(error);
  }
};
