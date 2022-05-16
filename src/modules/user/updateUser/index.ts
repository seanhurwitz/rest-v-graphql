import { getUserData, updateUserData } from "../../../data";
import { User, UserUpdate } from "../../../types";
import { handleError } from "../../../utils/errors";

const updateUser = async (input: UserUpdate): Promise<User> => {
  const users = await getUserData();
  const doesUserExist = users.find((user) => user.id === input.id);
  handleError(!doesUserExist, "User does not Exist!");
  const newUsers: User[] = users.map((u) =>
    u.id === input.id
      ? {
          ...u,
          name: input.name,
        }
      : u
  );
  await updateUserData(newUsers);
  return { ...doesUserExist!, name: input.name };
};

export default updateUser;
