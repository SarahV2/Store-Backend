import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import { registerUser } from "./utils/auth";

const request = supertest(app);

let token: any | string = null;
beforeAll(async () => {
  const newUser: User = {
    username: "ms.potato",
    password: "myPassword123",
    first_name: "Potato",
    last_name: "Chip",
  };

  await registerUser(newUser).then((token_info) => {
    token = token_info["token"];
  });
});

describe("Orders controller tests", () => {
  it("GET /api/orders should return an array", async () => {
    await request
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => expect(res.body).toBeInstanceOf(Array));
  });
  it("GET /api/orders/users/:user_id should return an array", async () => {
    await request
      .get("/api/orders/users/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => expect(res.body).toBeInstanceOf(Array));
  });
  it("POST /api/orders should return a new order object", async () => {
    await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then((res) => {
        expect("order_id" in res.body).toBeTrue();
      });
  });
  it("POST /api/orders/:order_id should return an error message if product info weren't supplied", async () => {
    const nonExistentOrderID = 9999;
    await request
      .post(`/api/orders/${nonExistentOrderID}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect("error" in res.body).toBeTrue();
        expect(res.body["error"]).toEqual(
          "missing order ID or products information"
        );
      });
  });
});
