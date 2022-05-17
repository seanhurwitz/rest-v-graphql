import { getPostData } from "../../../data";

const getPosts = async (userId?: string) =>
  (await getPostData()).filter((post) =>
    userId ? post.userId === userId : true
  );

export default getPosts;
