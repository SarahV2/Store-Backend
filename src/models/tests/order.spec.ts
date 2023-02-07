import { orderProduct, OrdersService } from "../order";
import { Product, ProductService } from "../product";

const orderService = new OrdersService();
const productService = new ProductService();

const testProduct: Product = {
  name: "Coffee",
  price: 15,
};

describe("Product Model Tests", () => {
  it("should create a new order", async () => {
    const newOrder = await orderService.createOrder("1");
    expect(newOrder.order_id).toBeDefined();
  });

  it("should return a list of orders", async () => {
    const orders = await orderService.index("1");
    expect(orders).toBeInstanceOf(Array);
  });

  it("should add products to an existing order", async () => {
    const newOrder = await orderService.createOrder("1");
    const orderID = newOrder.order_id as Number;

    const productID = await (
      await productService.create(testProduct)
    ).product_id;
    const orderProduct: orderProduct = {
      product_id: productID as Number,
      quantity: 2,
    };

    const result = await orderService.addProduct(orderID.toString(), [
      orderProduct,
    ]);
    expect(result).toBe(
      `Products have been successfully added to order ${orderID}}`
    );
  });
});
