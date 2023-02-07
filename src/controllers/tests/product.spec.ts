import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import { registerUser } from "./utils/auth";
const request = supertest(app);

let token: any | string = null;
beforeAll(async () => {
  const newUser: User = {
    username: "mr.potato",
    password: "myPassword123",
    first_name: "Potato",
    last_name: "Chip",
  };

  await registerUser(newUser).then((token_info) => {
    token = token_info["token"];
  });
});

describe("Products controller tests", () => {
  it("GET /api/products should return an array", async () => {
    await request
      .get("/api/products")
      .expect(200)
      .then((res) => expect(res.body).toBeInstanceOf(Array));
  });

  it("GET /api/products/{product_id} should return a 404 response", async () => {
    const nonExistentProductID = 9999;
    await request.get(`/api/products/${nonExistentProductID}`).expect(404);
  });

  it("POST /api/products should return a 201 response", async () => {
    const newProduct: Product = { name: "Book", price: 30 };
    await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct)
      .expect(201);
  });
});
