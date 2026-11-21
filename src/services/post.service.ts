import { PostModel, type PostFilter, type PostRecord } from "@/models/post.model";
import type { AdminPostRow, CreatePostInput, PostDetail, PostSummary } from "@/models/post.dto";
import {
  BLOG_TYPE,
  BLOG_TYPE_OPTIONS,
  FILE_TYPE,
  POST_CATEGORIES,
} from "@/utils/constants";
import { excerptFromHtml, stripHtml } from "@/utils/html";
import { HttpError } from "@/utils/http";
import { isCloudinaryUrl } from "@/utils/media";
import { randomId } from "@/utils/random";
import { sanitizeArticle } from "@/utils/sanitize";
import { clean } from "@/utils/validation";

const LATEST_TYPES = [BLOG_TYPE.LATEST, BLOG_TYPE.LATEST.trim()];

export function toSummary(post: PostRecord, excerptLength = 220): PostSummary {
  return {
    id: post.id,
    title: post.title,
    excerpt: excerptFromHtml(post.content, excerptLength),
    imageUrl: post.imageUrl,
    publishBy: post.publishBy,
    category: post.category,
    blogType: post.blogType,
    fileType: post.fileType,
    createdAt: post.createdAt.toISOString(),
  };
}

export function toDetail(post: PostRecord): PostDetail {
  return {
    ...toSummary(post, 0),
    content: post.content,
    blogId: post.blogId,
    isEyeWitness: post.isEyeWitness,
    isActive: post.isActive,
    isApproved: post.isApproved,
  };
}

async function summaries(filter: PostFilter, take: number, excerptLength = 220) {
  const rows = await PostModel.findMany(filter, { take });
  return rows.map((row) => toSummary(row, excerptLength));
}

export const PostService = {
  /** The lead story for the centre column: the newest post of any type, except videos. */
  async lead(category?: string): Promise<PostSummary | null> {
    const row = await PostModel.findFirst({ category, excludeFileType: FILE_TYPE.VIDEO });
    return row ? toSummary(row, 900) : null;
  },

  /** "Latest News" headlines (blog type Latest, no videos), without the lead story. */
  latest(category: string | undefined, take = 7, excludeId?: string) {
    return summaries(
      { category, blogTypes: LATEST_TYPES, excludeFileType: FILE_TYPE.VIDEO, excludeId },
      take,
      0,
    );
  },

  /** "Trending News" (blog type Trending), without the lead story. */
  trending(category: string | undefined, take = 6, excludeId?: string) {
    return summaries({ category, blogTypes: [BLOG_TYPE.TRENDING], excludeId }, take, 0);
  },

  /** Newest posts of any type. */
  recent(category: string | undefined, take: number, excerptLength = 220) {
    return summaries({ category }, take, excerptLength);
  },

  videos(category: string | undefined, take: number, excerptLength = 300) {
    return summaries({ category, fileType: FILE_TYPE.VIDEO }, take, excerptLength);
  },

  byCategory(category: string, take: number, excerptLength = 200) {
    return summaries({ category }, take, excerptLength);
  },

  async search(term: string, take = 100) {
    const rows = await PostModel.findMany({ search: term }, { take });
    return rows.map((row) => toSummary(row, 0));
  },

  async detail(id: string): Promise<PostDetail | null> {
    const row = await PostModel.findById(id);
    return row && row.isActive ? toDetail(row) : null;
  },

  async detailForAdmin(id: string): Promise<PostDetail | null> {
    const row = await PostModel.findById(id);
    return row ? toDetail(row) : null;
  },

  async adminPage(search: string, page: number, pageSize: number) {
    const filter: PostFilter = { search: search || undefined, includeInactive: true };
    const total = await PostModel.count(filter);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pageCount);
    const rows = await PostModel.findMany(filter, {
      take: pageSize,
      skip: (safePage - 1) * pageSize,
    });
    return {
      items: rows.map(
        (row): AdminPostRow => ({
          ...toSummary(row, 0),
          blogId: row.blogId,
          isActive: row.isActive,
        }),
      ),
      total,
      page: safePage,
      pageCount,
      pageSize,
      query: search,
    };
  },

  async create(input: Partial<CreatePostInput>, cloudName: string | undefined): Promise<PostDetail> {
    const title = clean(input.title, 100);
    const category = clean(input.category, 40);
    const blogType = typeof input.blogType === "string" ? input.blogType : "";
    const fileType = clean(input.fileType, 10);
    const imageUrl = clean(input.imageUrl, 1000);
    const content = typeof input.content === "string" ? input.content : "";

    if (!title || !category || !blogType || !fileType || !imageUrl || !stripHtml(content)) {
      throw new HttpError(400, "Required field missing.");
    }
    if (!POST_CATEGORIES.some((c) => c.slug === category)) throw new HttpError(400, "Unknown category.");
    if (!BLOG_TYPE_OPTIONS.some((o) => o.value === blogType)) throw new HttpError(400, "Unknown blog type.");
    if (fileType !== FILE_TYPE.IMAGE && fileType !== FILE_TYPE.VIDEO) throw new HttpError(400, "Unknown file type.");
    if (!isCloudinaryUrl(imageUrl, cloudName)) throw new HttpError(400, "The uploaded file URL is not valid.");

    const row = await PostModel.create({
      id: randomId(35),
      title,
      content: sanitizeArticle(content),
      imageUrl,
      publishBy: clean(input.publishBy, 50),
      category,
      blogType,
      fileType,
      blogId: randomId(30),
      isEyeWitness: category === "eye-witness",
      isActive: true,
      isApproved: true,
    });
    return toDetail(row);
  },

  async update(
    id: string,
    input: Partial<CreatePostInput>,
    cloudName: string | undefined,
  ): Promise<PostDetail> {
    const existing = await PostModel.findById(id);
    if (!existing) throw new HttpError(404, "Post not found.");

    const title = clean(input.title, 100);
    const category = clean(input.category, 40);
    const blogType = typeof input.blogType === "string" ? input.blogType : "";
    const content = typeof input.content === "string" ? input.content : "";
    if (!title || !category || !blogType || !stripHtml(content)) throw new HttpError(400, "Required field missing.");

    // Posts filed under a retired category may keep it; new choices must be current ones.
    const categoryAllowed = category === existing.category || POST_CATEGORIES.some((c) => c.slug === category);
    if (!categoryAllowed) throw new HttpError(400, "Unknown category.");
    if (!BLOG_TYPE_OPTIONS.some((o) => o.value === blogType)) throw new HttpError(400, "Unknown blog type.");

    const data: Parameters<typeof PostModel.update>[1] = {
      title,
      content: sanitizeArticle(content),
      publishBy: clean(input.publishBy, 50),
      category,
      blogType,
      isEyeWitness: category === "eye-witness",
    };

    // A new file is optional; when given it replaces the current one.
    const imageUrl = clean(input.imageUrl, 1000);
    if (imageUrl) {
      const fileType = clean(input.fileType, 10);
      if (fileType !== FILE_TYPE.IMAGE && fileType !== FILE_TYPE.VIDEO) throw new HttpError(400, "Unknown file type.");
      if (!isCloudinaryUrl(imageUrl, cloudName)) throw new HttpError(400, "The uploaded file URL is not valid.");
      data.imageUrl = imageUrl;
      data.fileType = fileType;
    }

    return toDetail(await PostModel.update(id, data));
  },

  async remove(id: string) {
    const removed = await PostModel.remove(id);
    if (!removed) throw new HttpError(404, "Post not found.");
  },
};
