/** Light post shape used by lists, cards and rows (no full article body). */
export type PostSummary = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishBy: string;
  category: string;
  blogType: string;
  fileType: string;
  createdAt: string;
};

/** Full post used by the article page and the admin detail modal. */
export type PostDetail = PostSummary & {
  content: string;
  blogId: string;
  isEyeWitness: boolean;
  isActive: boolean;
  isApproved: boolean;
};

/** A row in the admin post register. */
export type AdminPostRow = PostSummary & { blogId: string; isActive: boolean };

export type CreatePostInput = {
  title: string;
  content: string;
  imageUrl: string;
  publishBy: string;
  category: string;
  blogType: string;
  fileType: string;
};
