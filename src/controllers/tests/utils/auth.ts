import app from "../../../server";
import supertest from "supertest";
import { User } from "../../../models/user";

const request = supertest(app);

export const registerUser = async (userInfo: User) => {
  return await request
    .post("/api/users")
    .send(userInfo)
    .then((res) => res.body);
};
