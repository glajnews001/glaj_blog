import type { HomePayload, CategoryPayload, ArticlePayload, VideoPayload } from "@/models/page.model";
import type { PostView } from "@/models/post.model";
import { PostService } from "@/services/post.service";
import { MediaService } from "@/services/media.service";
import { HOME_SECTIONS } from "@/utils/constants";
import { httpError } from "@/utils/http";
import { ID_CHARS, getRandomString } from "@/utils/random";
import { readSession } from "@/utils/session";

const LATEST_TYPE = "Normal ";

function featuredOf(posts: PostView[]) {
  return posts.find((post) => post.Blogtype === "Trending" && post.fileType !== "video") || null;
}

function latestOf(posts: PostView[]) {
  return posts.filter((post) => post.Blogtype === LATEST_TYPE && post.fileType !== "video");
}

export class PostController {
  static async home(): Promise<HomePayload> {
    const posts = await PostService.list();
    return {
      latest: latestOf(posts).slice(0, 7),
      featured: featuredOf(posts),
      trending: posts.slice(0, 6),
      videos: posts.filter((post) => post.fileType === "video").slice(0, 12),
      sections: HOME_SECTIONS.map((section) => ({
        key: section.key,
        title: section.title,
        href: section.href,
        posts: posts.filter((post) => post.category === section.key).slice(0, 12),
      })),
    };
  }

  static async category(category: string): Promise<CategoryPayload> {
    const posts = await PostService.listByCategory(category);
    return {
      category,
      posts,
      latest: latestOf(posts).slice(0, 7),
      featured: featuredOf(posts),
      videos: posts.filter((post) => post.fileType === "video").slice(0, 12),
    };
  }

  static async article(id: string): Promise<ArticlePayload> {
    const [post, posts] = await Promise.all([PostService.getById(id), PostService.list()]);
    const related = post ? await PostService.listByCategory(post.category) : [];
    return {
      post,
      latest: latestOf(posts).slice(0, 7),
      trending: posts.slice(0, 6),
      related: related.slice(0, 100),
    };
  }

  static async videos(): Promise<VideoPayload> {
    const videos = await PostService.listVideos();
    const take = (category: string) => videos.filter((post) => post.category === category).slice(0, 12);
    return {
      trending: videos.slice(0, 12),
      politics: take("politics"),
      sport: take("sport"),
      entertainment: take("entertainment"),
      business: take("business"),
    };
  }

  static async search(term: string) {
    return PostService.search(term);
  }

  static async list() {
    return PostService.list();
  }

  static async create(input: {
    title: string;
    content: string;
    category: string;
    blogType: string;
    fileType: string;
    publishBy: string;
    file: File;
  }) {
    const session = await readSession();
    if (!session) throw httpError("Sign in to publish a story.", 401);

    const title = input.title.trim();
    const content = input.content.trim();
    if (!title || !content || !input.category || !input.blogType || !input.fileType) {
      throw httpError("Required field missing.");
    }
    if (title.length > 100) throw httpError("Title must be 100 characters or fewer.");

    const imageUrl = await MediaService.upload(input.file, input.fileType);
    return PostService.create({
      id: getRandomString(35, ID_CHARS),
      blogId: getRandomString(30, ID_CHARS),
      title,
      content,
      imageUrl,
      publishBy: input.publishBy.trim().slice(0, 50),
      category: input.category,
      blogType: input.blogType,
      fileType: input.fileType,
    });
  }

  static async remove(id: string) {
    const session = await readSession();
    if (!session) throw httpError("Sign in to delete a story.", 401);
    const post = await PostService.getById(id);
    if (!post) throw httpError("Story not found.", 404);
    await PostService.remove(id);
    return { id };
  }
}
