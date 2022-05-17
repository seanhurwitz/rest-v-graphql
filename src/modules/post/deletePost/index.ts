import { getPostData, updatePostData } from "../../../data";
import getPost from "../getPost";

const deletePost = async (id: string): Promise<boolean> => {
  await getPost(id); //leverage the error handling
  const posts = await getPostData();
  const newPosts = posts.filter((u) => u.id !== id);
  await updatePostData(newPosts);
  return true;
};

export default deletePost;
