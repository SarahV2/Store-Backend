import Client from "../database";

export type Product = {
  productID: Number;
  name: string;
  price: Number;
};

export class ProductService {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sqlQuery = "SELECT * FROM products";
      const result = await connection.query(sqlQuery);

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }
}
