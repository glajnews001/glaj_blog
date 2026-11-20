import type { AdminPostRow, PostDetail, PostSummary } from "@/models/post.dto";
import type { MessageSummary } from "@/models/message.dto";
import type { UserSummary } from "@/models/user.dto";

export type PostSection = { key: string; title: string; href: string; posts: PostSummary[] };

export type HomePayload = {
  latest: PostSummary[];
  featured: PostSummary | null;
  trending: PostSummary[];
  videos: PostSummary[];
  sections: PostSection[];
};

export type CategoryPayload = {
  slug: string;
  title: string;
  latest: PostSummary[];
  featured: PostSummary | null;
  trending: PostSummary[];
  videos: PostSummary[];
  posts: PostSummary[];
  isEmpty: boolean;
};

export type ArticlePayload = {
  post: PostDetail;
  latest: PostSummary[];
  trending: PostSummary[];
  related: PostSummary[];
  shareUrl: string;
};

export type SearchPayload = { term: string; posts: PostSummary[] };

export type VideoSectionPayload = { key: string; title: string; videos: PostSummary[] };
export type VideoGalleryPayload = { sections: VideoSectionPayload[]; isEmpty: boolean };

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  query: string;
};

export type DashboardPayload = {
  stats: { posts: number; categories: number; users: number; messages: number; unread: number };
  byCategory: { name: string; posts: number }[];
  byMonth: { name: string; posts: number }[];
};

export type PostsPagePayload = Paged<AdminPostRow>;
export type UsersPagePayload = Paged<UserSummary> & { canManage: boolean };
export type MessagesPagePayload = Paged<MessageSummary>;
