import { Product, ProductService } from "../product";

const productService = new ProductService();

const testProduct: Product = {
  name: "Coffee",
  price: 15,
};

describe("Product Model Tests", () => {
  it("should have an index method", () => {
    expect(productService.index).toBeDefined();
  });

  it("should create a new product", async () => {
    const newProduct = await productService.create(testProduct);
    expect(newProduct.name).toBe(testProduct.name);
    expect(newProduct.product_id).toBeDefined();
  });

  it("return a product given its ID", async () => {
    const existingProduct = await productService.show(1);
    expect(existingProduct.name).toBeDefined();
    expect(existingProduct.product_id).toBeDefined();
  });
});
