import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserData, updateUserData } from "../../../data";
import { User } from "../../../types";
import { handleError } from "../../../utils/errors";

const signup = async (input: User): Promise<string> => {
  const users = await getUserData();
  const doesUserExist = users.some((user) => user.id === input.id);
  handleError(doesUserExist, "User Already Exists!");
  const newUsers: User[] = [
    ...users,
    {
      ...input,
      password: hashSync(input.password, 10),
    },
  ];
  await updateUserData(newUsers);
  return jwt.sign(input.id, "JWTSECRET!");
};

export default signup;
