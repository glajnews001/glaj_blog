import type { MessageView } from "./message.model";
import type { PostView } from "./post.model";
import type { UserView } from "./user.model";

export type CategorySection = {
  key: string;
  title: string;
  href: string;
  posts: PostView[];
};

export type HomePayload = {
  latest: PostView[];
  featured: PostView | null;
  trending: PostView[];
  videos: PostView[];
  sections: CategorySection[];
};

export type CategoryPayload = {
  category: string;
  posts: PostView[];
  latest: PostView[];
  featured: PostView | null;
  videos: PostView[];
};

export type ArticlePayload = {
  post: PostView | null;
  latest: PostView[];
  trending: PostView[];
  related: PostView[];
};

export type VideoPayload = {
  trending: PostView[];
  politics: PostView[];
  sport: PostView[];
  entertainment: PostView[];
  business: PostView[];
};

export type ChartPoint = {
  name: string;
  posts: number;
  readers: number;
};

export type DashboardPayload = {
  posts: number;
  categories: number;
  users: number;
  alerts: number;
  chart: ChartPoint[];
};

export type AdminLists = {
  posts: PostView[];
  users: UserView[];
  messages: MessageView[];
};
