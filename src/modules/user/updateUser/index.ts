import { getUserData, updateUserData } from "../../../data";
import { User, UserUpdate } from "../../../types";
import getUser from "../getUser";

const updateUser = async (input: UserUpdate): Promise<User> => {
  const users = await getUserData();
  await getUser(input.id);
  const newUsers: User[] = users.map((u) =>
    u.id === input.id
      ? {
          ...u,
          name: input.name,
        }
      : u
  );
  await updateUserData(newUsers);
  return getUser(input.id);
};

export default updateUser;
