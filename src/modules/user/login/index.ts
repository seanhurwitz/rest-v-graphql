import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../types";
import getUser from "../getUser";

const login = async ({ id, password }: Partial<User>): Promise<string> => {
  const user = await getUser(id!);
  if (!compareSync(password!, user.password)) {
    throw new Error("Username / Password Incorrect");
  }
  return jwt.sign(id!, "JWTSECRET!");
};

export default login;
