interface User {
  id: string;
  name: string;
  password: string;
}

interface UserUpdate {
  id: string;
  name: string;
}

interface PostCreate {
  userId: string;
  title: string;
  subtitle?: string;
  body?: string;
}

interface Post extends PostCreate {
  id: string;
}

interface PostUpdate {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
}

export { User, UserUpdate, Post, PostUpdate, PostCreate };
