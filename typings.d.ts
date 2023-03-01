type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  posts: Post[];
  likes?: Like[];
};

type Post = {
  id: string;
  title: string;
  category: string;
  description: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
  likes?: Like[];
  comments?: UserComment[];
};

type UserComment = {
  id: string;
  createdAt: string;
  post: Post;
  postId: string;
  user: User;
  userId: string;
  comment: string;
};

type Like = {
  id: string;
  createdAt: string;
  post: Post;
  postId: string;
  user: User;
  userId: string;
};
