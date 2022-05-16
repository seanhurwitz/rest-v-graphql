import {
  getPostData,
  getUserData,
  updatePostData,
  updateUserData,
} from "../../../data";
import getUser from "../getUser";

const deleteUser = async (id: string): Promise<boolean> => {
  const users = await getUserData();
  const posts = await getPostData();
  await getUser(id); //leverage the error handling
  const newUsers = users.filter((u) => u.id !== id);
  const newPosts = posts.filter((p) => p.userId !== id);
  await updateUserData(newUsers);
  await updatePostData(newPosts);
  return true;
};

export default deleteUser;
