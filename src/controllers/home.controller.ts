import type { HomePayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { HOME_SECTIONS } from "@/utils/constants";

export const HomeController = {
  /** Everything the home page needs, fetched in parallel. */
  async getPage(): Promise<HomePayload> {
    const featured = await PostService.lead();
    const leadIds = featured ? [featured.id] : [];
    const latest = await PostService.latest(undefined, 7, leadIds);
    const [trending, videos, ...sections] = await Promise.all([
      PostService.trending(undefined, 6, leadIds, latest.map((post) => post.id)),
      PostService.videos(undefined, 12, 300),
      ...HOME_SECTIONS.map((section) => PostService.byCategory(section.slug, 12, 200)),
    ]);

    return {
      latest,
      featured,
      trending,
      videos,
      sections: HOME_SECTIONS.map((section, index) => ({
        key: section.slug,
        title: section.label,
        href: `/category/${section.slug}`,
        posts: sections[index],
      })).filter((section) => section.posts.length > 0),
    };
  },
};
