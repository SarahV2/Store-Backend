import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import { registerUser } from "./utils/auth";

const request = supertest(app);

let token: any | string = null;
const newUser: User = {
  username: "mr.test",
  password: "myPassword123",
  first_name: "Test",
  last_name: "Chip",
};
beforeAll(async () => {
  await registerUser(newUser).then((token_info) => {
    token = token_info["token"];
  });
});

describe("Users controller tests", () => {
  it("POST /api/users/login should return an token", async () => {
    const loginCredentials = {
      username: newUser.username,
      password: newUser.password,
    };
    await request
      .post("/api/users/login")
      .send(loginCredentials)
      .expect(200)
      .then((res) => expect("token" in res.body).toBeTrue());
  });

  it("GET /api/users should return a list of users", async () => {
    await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => expect(res.body).toBeInstanceOf(Array));
  });
  it("GET /api/users/:user_id should return a user object", async () => {
    await request
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect("user_id" in res.body).toBeTrue();
        expect("username" in res.body).toBeTrue();
      });
  });

  it("POST /api/users should return a new user token", async () => {
    const newUserToAdd: User = {
      username: "Sarah",
      password: "myPassword123",
      first_name: "Sarah",
      last_name: "Test",
    };
    await request
      .post("/api/users")
      .send(newUserToAdd)
      .expect(201)
      .then((res) => {
        expect("token" in res.body).toBeTrue();
      });
  });
});
