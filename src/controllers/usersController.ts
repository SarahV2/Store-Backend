import { Request, Response } from "express";
import { User, UsersService } from "../models/user";
import jwt from "jsonwebtoken";

const UserService = new UsersService();

export const index = async (req: Request, res: Response) => {
  const results = await UserService.index();
  res.send(results);
};

export const create = async (req: Request, res: Response) => {
  const { first_name, last_name, username, password } = req.body;

  if (!username || !first_name || !last_name || !password) {
    return res.status(400).json("please provide all information");
  }

  const user: User = {
    first_name,
    last_name,
    username,
    password,
  };

  try {
    const newUser = await UserService.create(user);
    let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    return res.json({ token });
  } catch (error) {
    return res.status(400).json("Error" + error);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json("missing username/ password");
  }

  try {
    const currentUser = await UserService.authenticate(username, password);
    if (currentUser) {
      let token = jwt.sign({ user: currentUser }, process.env.TOKEN_SECRET);
      return res.json({ token });
    } else {
      res.status(401).json("Invalid username/password");
    }
  } catch (error) {
    return res.status(400).json("Error" + error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);
    if (!user_id) {
      return res.status(400).send("User ID is missing");
    }
    const user = await UserService.show(user_id);

    if (!user) {
      res.status(404).send(`Could not find user with ID ${user_id}`);
    }
    return res.send(user);
  } catch (error) {
    return res.status(401).json(error);
  }
};
