import type { VideoGalleryPayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { VIDEO_SECTIONS } from "@/utils/constants";

export const VideoController = {
  async getPage(): Promise<VideoGalleryPayload> {
    const [all, ...byCategory] = await Promise.all([
      PostService.videos(undefined, 12, 0),
      ...VIDEO_SECTIONS.map((section) => PostService.videos(section.slug, 12, 0)),
    ]);

    const sections = [
      { key: "trending", title: "Trending News", videos: all },
      ...VIDEO_SECTIONS.map((section, index) => ({
        key: section.slug,
        title: section.label,
        videos: byCategory[index],
      })),
    ].filter((section) => section.videos.length > 0);

    return { sections, isEmpty: all.length === 0 };
  },
};
