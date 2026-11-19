import { hasDatabase, getPrisma } from "@/models/db";
import { toPostView, type PostView } from "@/models/post.model";
import { ArchiveService } from "@/services/archive.service";

const order = { createdAt: "desc" as const };

export class PostService {
  static async list(): Promise<PostView[]> {
    if (!hasDatabase()) return ArchiveService.list();
    const rows = await getPrisma().post.findMany({ orderBy: order });
    return rows.map(toPostView);
  }

  static async listByCategory(category: string): Promise<PostView[]> {
    if (!hasDatabase()) return ArchiveService.listByCategory(category);
    const rows = await getPrisma().post.findMany({
      where: { category },
      orderBy: order,
    });
    return rows.map(toPostView);
  }

  static async listVideos(): Promise<PostView[]> {
    if (!hasDatabase()) return ArchiveService.listVideos();
    const rows = await getPrisma().post.findMany({
      where: { fileType: "video" },
      orderBy: order,
    });
    return rows.map(toPostView);
  }

  static async getById(id: string): Promise<PostView | null> {
    if (!hasDatabase()) return ArchiveService.getById(id);
    const row = await getPrisma().post.findUnique({ where: { id } });
    return row ? toPostView(row) : null;
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
    if (!hasDatabase()) return ArchiveService.list().length;
    return getPrisma().post.count();
  }

  static async countsByDay(days: number) {
    if (!hasDatabase()) return ArchiveService.countsByDay(days);
    const since = new Date();
    since.setDate(since.getDate() - (days - 1));
    since.setHours(0, 0, 0, 0);
    return getPrisma().post.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
    });
  }
}
