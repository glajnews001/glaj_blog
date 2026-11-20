import { hasDatabase, getPrisma } from "@/models/db";
import { toPostView, type PostView } from "@/models/post.model";
import { ArchiveService } from "@/services/archive.service";

const order = { createdAt: "desc" as const };

async function fromDbOrArchive<T>(load: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!hasDatabase()) return fallback();
  try {
    return await load();
  } catch (error) {
    console.error("[PostService] database read failed, using archive", error);
    return fallback();
  }
}

export class PostService {
  static async list(): Promise<PostView[]> {
    return fromDbOrArchive(async () => {
      const rows = await getPrisma().post.findMany({ orderBy: order });
      if (rows.length === 0) return ArchiveService.list();
      return rows.map(toPostView);
    }, ArchiveService.list);
  }

  static async listByCategory(category: string): Promise<PostView[]> {
    return fromDbOrArchive(async () => {
      const rows = await getPrisma().post.findMany({
        where: { category },
        orderBy: order,
      });
      if (rows.length === 0) return ArchiveService.listByCategory(category);
      return rows.map(toPostView);
    }, () => ArchiveService.listByCategory(category));
  }

  static async listVideos(): Promise<PostView[]> {
    return fromDbOrArchive(async () => {
      const rows = await getPrisma().post.findMany({
        where: { fileType: "video" },
        orderBy: order,
      });
      if (rows.length === 0) return ArchiveService.listVideos();
      return rows.map(toPostView);
    }, ArchiveService.listVideos);
  }

  static async getById(id: string): Promise<PostView | null> {
    return fromDbOrArchive(async () => {
      const row = await getPrisma().post.findUnique({ where: { id } });
      if (row) return toPostView(row);
      return ArchiveService.getById(id);
    }, () => ArchiveService.getById(id));
  }

  static async search(term: string): Promise<PostView[]> {
    const posts = await this.list();
    const needle = term.trim().toLowerCase();
    if (!needle) return [];
    return posts.filter((post) => post.title.toLowerCase().includes(needle));
  }

  static async create(input: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    publishBy: string;
    category: string;
    blogType: string;
    fileType: string;
    blogId: string;
  }) {
    const row = await getPrisma().post.create({
      data: {
        id: input.id,
        title: input.title,
        content: input.content,
        imageUrl: input.imageUrl,
        publishBy: input.publishBy,
        category: input.category,
        blogType: input.blogType,
        fileType: input.fileType,
        blogId: input.blogId,
        isEyeWitness: input.category === "eye-witness",
        isActive: true,
        isApproved: true,
      },
    });
    return toPostView(row);
  }

  static async remove(id: string) {
    await getPrisma().post.delete({ where: { id } });
  }

  static async count() {
    return fromDbOrArchive(
      () => getPrisma().post.count(),
      () => ArchiveService.list().length,
    );
  }

  static async countsByDay(days: number) {
    return fromDbOrArchive(async () => {
      const since = new Date();
      since.setDate(since.getDate() - (days - 1));
      since.setHours(0, 0, 0, 0);
      return getPrisma().post.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true },
      });
    }, () => ArchiveService.countsByDay(days));
  }
}
