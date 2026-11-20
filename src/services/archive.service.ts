import { readFileSync } from "node:fs";
import path from "node:path";
import type { PostView } from "@/models/post.model";

type ArchivePost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishBy: string;
  category: string;
  blogType: string;
  fileType: string;
  blogId: string;
  isEyeWitness: boolean;
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
};

let cache: PostView[] | null = null;

function load(): PostView[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "prisma", "data", "legacy-posts.json");
  let rows: ArchivePost[];
  try {
    rows = JSON.parse(readFileSync(file, "utf8")) as ArchivePost[];
  } catch (error) {
    console.error("[ArchiveService] failed to read legacy posts", error);
    cache = [];
    return cache;
  }
  cache = rows
    .map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      PublishBy: post.publishBy,
      category: post.category,
      Blogtype: post.blogType,
      fileType: post.fileType,
      blogid: post.blogId,
      is_eye_witness: post.isEyeWitness,
      is_active: post.isActive,
      is_Approved: post.isApproved,
      createdAt: post.createdAt,
    }))
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  return cache;
}

export class ArchiveService {
  static list() {
    return load();
  }

  static getById(id: string) {
    return load().find((post) => post.id === id) || null;
  }

  static listByCategory(category: string) {
    return load().filter((post) => post.category === category);
  }

  static listVideos() {
    return load().filter((post) => post.fileType === "video");
  }

  static countsByDay(days: number) {
    const since = new Date();
    since.setDate(since.getDate() - (days - 1));
    since.setHours(0, 0, 0, 0);
    return load()
      .filter((post) => new Date(post.createdAt) >= since)
      .map((post) => ({ createdAt: new Date(post.createdAt) }));
  }
}
