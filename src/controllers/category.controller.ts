import type { CategoryPayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { NAV_CATEGORIES, PAGE_SIZE } from "@/utils/constants";

const titleFor = (slug: string) =>
  NAV_CATEGORIES.find((c) => c.slug === slug)?.label ??
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export const CategoryController = {
  async getPage(slug: string): Promise<CategoryPayload> {
    const [latest, featured, trending, videos, posts] = await Promise.all([
      PostService.latest(slug, 7),
      PostService.featured(slug),
      PostService.recent(slug, 6, 0),
      PostService.videos(slug, 12, 300),
      PostService.byCategory(slug, PAGE_SIZE.category, 200),
    ]);

    return {
      slug,
      title: titleFor(slug),
      latest,
      // Fall back to the newest story when the category has no "Trending" post.
      featured: featured ?? (posts.find((p) => p.fileType !== "video") ?? null),
      trending,
      videos,
      posts,
      isEmpty: posts.length === 0,
    };
  },

  titleFor,
};
