import { getPostData } from "../../../data";
import { handleError } from "../../../utils/errors";

const getPost = async (id: string) => {
  const user = (await getPostData()).find((post) => post.id === id);
  handleError(!user, `Post ${id} does not exist!`);
  return user!;
};

export default getPost;
