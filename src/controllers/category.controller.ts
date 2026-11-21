import type { CategoryPayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { LEGACY_CATEGORIES, NAV_CATEGORIES, PAGE_SIZE } from "@/utils/constants";

const titleFor = (slug: string) =>
  [...NAV_CATEGORIES, ...LEGACY_CATEGORIES].find((c) => c.slug === slug)?.label ??
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export const CategoryController = {
  async getPage(slug: string): Promise<CategoryPayload> {
    const featured = await PostService.lead(slug);
    const leadIds = featured ? [featured.id] : [];
    const latest = await PostService.latest(slug, 7, leadIds);
    const [trending, videos, posts] = await Promise.all([
      PostService.trending(slug, 6, leadIds, latest.map((post) => post.id)),
      PostService.videos(slug, 12, 300),
      PostService.byCategory(slug, PAGE_SIZE.category, 200),
    ]);

    return {
      slug,
      title: titleFor(slug),
      latest,
      featured,
      trending,
      videos,
      posts,
      isEmpty: posts.length === 0,
    };
  },

  titleFor,
};
