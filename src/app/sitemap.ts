import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/utils/constants";
import { PostService } from "@/services/post.service";
import { absoluteUrl } from "@/utils/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await PostService.list();
  const now = new Date();
  const staticRoutes = ["/", "/videos", "/contact", ...CATEGORIES.map((item) => item.href)].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? ("hourly" as const) : ("daily" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const stories = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.id}`),
    lastModified: new Date(post.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...stories];
}
