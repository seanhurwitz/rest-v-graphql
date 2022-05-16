interface User {
  id: string;
  name: string;
  password: string;
}

interface UserUpdate {
  id: string;
  name: string;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  body?: string;
}

export { User, UserUpdate, Post };
