import { Product, ProductService } from "../Product";

const productService = new ProductService();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productService.index).toBeDefined();
  });
});
