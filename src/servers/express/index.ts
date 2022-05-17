import express, { Request } from "express";
import {
  createPost,
  deletePost,
  deleteUser,
  getPosts,
  getUser,
  getUsers,
  login,
  signup,
  updatePost,
  updateUser,
} from "../../modules";
import { Post, PostUpdate, User, UserUpdate } from "../../types";
import { sendExpressError } from "../../utils/errors";
import {
  authorizePostFromReqParams,
  authorizeToken,
  authorizeUserFromReqParams,
} from "./auth";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/users", async (_, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (e: any) {
    sendExpressError(res, e);
  }
});

app.get("/users/current", authorizeToken, async (_, res) => {
  try {
    const user = await getUser(res.locals.userId);
    res.send(user);
  } catch (e: any) {
    sendExpressError(res, e);
  }
});

app.get(
  "/users/:id",
  authorizeToken,
  authorizeUserFromReqParams,
  async (req: Request<{ id: string }>, res) => {
    try {
      const user = await getUser(req.params.id);
      res.send(user);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.put(
  "/users/:id",
  authorizeToken,
  authorizeUserFromReqParams,
  async (req: Request<{ id: string }, any, UserUpdate>, res) => {
    try {
      const response = await updateUser(req.body);
      res.send(response);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.delete(
  "/users/:id",
  authorizeToken,
  authorizeUserFromReqParams,
  async (req: Request<{ id: string }>, res) => {
    try {
      const user = await deleteUser(req.params.id);
      res.send(user);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.post("/signup", async (req: Request<any, any, User>, res) => {
  try {
    const token = await signup(req.body);
    res.send(token);
  } catch (e) {
    sendExpressError(res, e);
  }
});

app.get("/login", async (req: Request<any, any, any, Partial<User>>, res) => {
  try {
    const token = await login(req.query);
    res.send(token);
  } catch (e) {
    sendExpressError(res, e);
  }
});

app.get("/posts", async (_, res) => {
  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (e: any) {
    sendExpressError(res, e);
  }
});

app.post(
  "/posts",
  authorizeToken,
  async (req: Request<any, any, Post>, res) => {
    try {
      const posts = await createPost({
        ...req.body,
        userId: res.locals.userId,
      });
      res.send(posts);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.get("/users/current/posts", authorizeToken, async (_, res) => {
  try {
    const posts = await getPosts(res.locals.userId);
    res.send(posts);
  } catch (e: any) {
    sendExpressError(res, e);
  }
});

app.put(
  "/posts/:id",
  authorizeToken,
  authorizePostFromReqParams,
  async (req: Request<{ id: string }, any, PostUpdate>, res) => {
    try {
      const post = await updatePost({ ...req.body, id: res.locals.postId });
      res.send(post);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.delete(
  "/posts/:id",
  authorizeToken,
  authorizePostFromReqParams,
  async (_, res) => {
    try {
      const result = await deletePost(res.locals.postId);
      res.send(result);
    } catch (e: any) {
      sendExpressError(res, e);
    }
  }
);

app.listen(port, () => {
  console.log(`EXPRESS SERVER RUNNING ON http://127.0.0.1:${port}`);
});
