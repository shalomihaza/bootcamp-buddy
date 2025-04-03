import { User } from "./User";

export type Post = {
  id: string;
  title: string;
  content: string;
  link: string;
  tags: string[];
  user: User,
  coverImage: string;
  commentCount: number;
  voteCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePostType = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  userId: string;
};
