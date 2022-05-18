/* Resolvers are how GraphQL understands what to do when you call an endpoint */

import {
  createPost,
  deletePost,
  deleteUser,
  getPost,
  getPosts,
  getUser,
  getUsers,
  login,
  signup,
  updatePost,
  updateUser,
} from "../../modules";
import {
  GQLUserContext,
  Post,
  PostCreate,
  PostUpdate,
  User,
  UserUpdate,
} from "../../types";
import { authorizePost, authorizeToken, authorizeUser } from "./auth";

const resolvers = {
  Mutation: {
    createPost(
      _: any,
      { input }: { input: PostCreate },
      context?: GQLUserContext
    ) {
      authorizeToken(context);
      return createPost({ ...input, userId: context!.id });
    },
    signup(_: any, { input }: { input: User }) {
      return signup(input);
    },
    async deletePost(_: any, { id }: { id: string }, context?: GQLUserContext) {
      await authorizePost({ id, context });
      return deletePost(id);
    },
    deleteUser(_: any, __: any, context?: GQLUserContext) {
      console.log("context", context);
      authorizeToken(context);
      console.log("context", context);
      return deleteUser(context!.id);
    },
    async updatePost(
      _: any,
      { input }: { input: PostUpdate },
      context?: GQLUserContext
    ) {
      await authorizePost({ id: input.id, context });
      return updatePost(input);
    },
    updateUser(
      _: any,
      { input }: { input: UserUpdate },
      context?: GQLUserContext
    ) {
      authorizeUser({ id: input.id, context });
      return updateUser(input);
    },
  },
  Query: {
    getPost(_: any, { id }: { id: string }) {
      return getPost(id);
    },
    getPosts() {
      return getPosts();
    },
    getUser(_: any, { id }: { id?: string }, context?: GQLUserContext) {
      return getUser(id || context?.id || "");
    },
    getUsers() {
      return getUsers();
    },
    login(_: any, input: Partial<User>) {
      return login(input);
    },
  },
  Post: {
    user: (post: Post) => getUser(post.userId),
  },
  User: {
    posts: (user: User) => getPosts(user.id),
  },
};

export default resolvers;
