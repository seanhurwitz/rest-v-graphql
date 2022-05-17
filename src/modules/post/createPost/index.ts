import uniqid from "uniqid";
import { getPostData, updatePostData } from "../../../data";
import { Post, PostCreate } from "../../../types";

const createPost = async (input: PostCreate): Promise<Post> => {
  const posts = await getPostData();
  const newPost = { id: uniqid("post_"), ...input };
  const newPosts = [...posts, newPost];
  await updatePostData(newPosts);
  return newPost;
};

export default createPost;
