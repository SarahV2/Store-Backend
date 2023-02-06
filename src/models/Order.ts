import Client from "../database";

export type orderProduct = {
  product_id: Number;
  quantity: Number;
};

enum orderStatus {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  COMPLETE = "COMPLETE",
}
export type Order = {
  order_id?: Number;
  user_id?: Number;
  products: orderProduct[];
  orderStatus?: orderStatus;
};

export class OrdersService {
  async createOrder(userID: string): Promise<Order> {
    try {
      const sqlQuery =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";

      const connection = await Client.connect();

      const result = await connection.query(sqlQuery, [
        userID,
        orderStatus.NEW,
      ]);

      const order = result.rows[0];

      connection.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async addProduct(orderID: string, products: orderProduct[]): Promise<string> {
    try {
      const conn = await Client.connect();
      for (let product of products) {
        let currentRow = [
          parseInt(orderID),
          product.product_id,
          product.quantity,
        ];
        const sql =
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
        await conn.query(sql, currentRow);
      }
      conn.release();

      return `Products have been successfully added to order ${orderID}}`;
    } catch (error) {
      throw new Error(`Could not add products to order wih ID ${orderID}`);
    }
  }
}
