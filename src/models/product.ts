import Client from "../database";

export type Product = {
  productID?: Number;
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

      return result.rows[0]; // TODO: Limit the query to return the first/ only match instead
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }
}

//   async create(p: Product): Promise<Product> {
//     try {
//       const sqlQuery =
//         "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";

//       const connection = await Client.connect();

//       const result = await connection.query(sqlQuery, [p.name, p.price]);

//       const product = result.rows[0];

//       connection.release();

//       return product;
//     } catch (err) {
//       throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
//     }
//   }

//   async delete(productID: string): Promise<Product> {
//     try {
//       const sql = "DELETE FROM products WHERE productID=($1)";

//       const connection = await Client.connect();

//       const result = await connection.query(sql, [productID]);

//       const product = result.rows[0];

//       connection.release();

//       return product;
//     } catch (error) {
//       throw new Error(`Could not delete product ${productID}. Error: ${error}`);
//     }
//   }
// }
