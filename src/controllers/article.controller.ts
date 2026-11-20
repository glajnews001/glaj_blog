import type { ArticlePayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { PAGE_SIZE, SITE } from "@/utils/constants";

export const ArticleController = {
  /** Returns null when the post does not exist (the page then renders a 404). */
  async getPage(id: string): Promise<ArticlePayload | null> {
    const post = await PostService.detail(id);
    if (!post) return null;

    const [latest, trending, related] = await Promise.all([
      PostService.latest(undefined, 7),
      PostService.recent(undefined, 6, 0),
      PostService.byCategory(post.category, PAGE_SIZE.category, 200),
    ]);

    return { post, latest, trending, related, shareUrl: `${SITE.url}/posts/${post.id}` };
  },
};
