import express, { Request } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  signup,
  updateUser,
} from "../../modules";
import { User, UserUpdate } from "../../types";
import { sendExpressError } from "../../utils/errors";
import { authorizeToken, authorizeUserFromReqParams } from "./auth";

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

app.listen(port, () => {
  console.log(`EXPRESS SERVER RUNNING ON http://127.0.0.1:${port}`);
});
