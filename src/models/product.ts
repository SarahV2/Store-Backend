import Client from "../database";

export type Product = {
  product_id?: Number;
  name: string;
  price: Number;
};

export class ProductService {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client?.connect();
      const sqlQuery = "SELECT * FROM products";
      const result = await connection.query(sqlQuery);

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }

  async show(product_id: Number): Promise<Product> {
    try {
      const connection = await Client?.connect();
      const sqlQuery = "SELECT * FROM products where product_id=($1)";

      const result = await connection.query(sqlQuery, [product_id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sqlQuery =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";

      const connection = await Client.connect();

      const result = await connection.query(sqlQuery, [p.name, p.price]);

      const product = result.rows[0];

      connection.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
