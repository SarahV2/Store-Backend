import { User, UsersService } from "../user";

const userService = new UsersService();

const testUser: User = {
  username: "sarah",
  password: "password1234",
  first_name: "Sarah",
  last_name: "Alahmadi",
};

describe("User Model Tests", () => {
  it("should create a new user", async () => {
    const newUser = await userService.create(testUser);
    expect(newUser.user_id).toBeDefined();
    expect(newUser.username).toBe(testUser.username);
  });
  it("should have an index method", () => {
    expect(userService.index).toBeDefined();
  });
  it("return a user given the user ID", async () => {
    const otherUser: User = {
      username: "sarah123",
      password: "password1234",
      first_name: "Sarah",
      last_name: "Alahmadi",
    };
    await userService.create(otherUser);
    const existingUser = await userService.show(1);
    expect(existingUser.username).toBeDefined();
    expect(existingUser.first_name).toBeDefined();
  });

  it("should return a user object if the correct credentials were provided", async () => {
    const otherUser: User = {
      username: "sarah1234",
      password: "password1234",
      first_name: "Sarah",
      last_name: "Alahmadi",
    };

    await userService.create(otherUser);
    const user = await userService.authenticate(
      otherUser.username,
      otherUser.password as string
    );

    expect(user?.first_name).toBe(testUser.first_name);
  });
});
