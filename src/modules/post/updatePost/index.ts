import { getPostData, updatePostData } from "../../../data";
import { Post, PostUpdate } from "../../../types";
import getPost from "../getPost";

const updatePost = async (input: PostUpdate): Promise<Post> => {
  const posts = await getPostData();
  await getPost(input.id);
  const newPosts: Post[] = posts.map((p) =>
    p.id === input.id
      ? {
          ...p,
          ...input,
          userId: p.userId,
        }
      : p
  );
  await updatePostData(newPosts);
  return getPost(input.id);
};

export default updatePost;
