import type { MetadataRoute } from "next";
import { PostModel } from "@/models/post.model";
import { NAV_CATEGORIES, SITE } from "@/utils/constants";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE.url}/videos`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
    ...NAV_CATEGORIES.map((category) => ({
      url: `${SITE.url}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
  ];

  try {
    const posts = await PostModel.findMany({}, { take: 2000 });
    return [
      ...pages,
      ...posts.map((post) => ({
        url: `${SITE.url}/posts/${post.id}`,
        lastModified: post.createdAt,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    return pages;
  }
}
