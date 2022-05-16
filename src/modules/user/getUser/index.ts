import { getUserData } from "../../../data";
import { handleError } from "../../../utils/errors";

const getUser = async (id: string) => {
  const user = (await getUserData()).find((u) => u.id === id);
  handleError(!user, `User ${id} does not exist!`);
  return user!;
};

export default getUser;
