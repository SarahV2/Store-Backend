import { Product, ProductService } from "../product";

const productService = new ProductService();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productService.index).toBeDefined();
  });
});
