import bcrypt from "bcrypt";
import Client from "../database";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export type User = {
  user_id?: Number;
  first_name: string;
  last_name?: string;
  username: string;
  password?: string;
};

export class UsersService {
  async index(): Promise<User[]> {
    try {
      const connection = await Client?.connect();
      const sqlQuery = "SELECT * FROM users";
      const result = await connection.query(sqlQuery);

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sqlQuery =
        "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *";

      const hashedPassword = bcrypt.hashSync(
        u.password + (pepper as string),
        parseInt(saltRounds as string)
      );

      const connection = await Client.connect();

      const result = await connection.query(sqlQuery, [
        u.first_name,
        u.last_name,
        u.username,
        hashedPassword,
      ]);

      const user = result.rows[0];

      connection.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const connection = await Client.connect();
    const sqlQuery = "SELECT * FROM users WHERE username=($1)";

    const result = await connection.query(sqlQuery, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }

  async show(user_id: Number): Promise<User> {
    try {
      const connection = await Client?.connect();
      const sqlQuery =
        "SELECT user_id, username, first_name FROM users where user_id=($1)";

      const result = await connection.query(sqlQuery, [user_id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user ${error}`);
    }
  }
}
