import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { Post, User } from "../types";

const getFile = async (filename: string) =>
  (await readFile(join(__dirname, filename))).toString();

const updateFile = async (filename: string, data: object) => {
  writeFile(join(__dirname, filename), JSON.stringify(data));
};

const getPostData = async () =>
  JSON.parse(await getFile("posts.json")) as Post[];
const getUserData = async () =>
  JSON.parse(await getFile("users.json")) as User[];

const updatePostData = async (data: Post[]) => updateFile("posts.json", data);
const updateUserData = async (data: User[]) => updateFile("users.json", data);

export { getPostData, getUserData, updatePostData, updateUserData };
