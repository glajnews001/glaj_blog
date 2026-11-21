import { Prisma, type Post } from "@prisma/client";
import { db } from "@/models/db";

export type PostRecord = Post;

export type PostFilter = {
  category?: string;
  fileType?: string;
  excludeFileType?: string;
  excludeIds?: string[];
  blogTypes?: string[];
  search?: string;
  /** Admin views include inactive posts. */
  includeInactive?: boolean;
};

function buildWhere(filter: PostFilter): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {};
  if (!filter.includeInactive) {
    where.isActive = true;
    where.isApproved = true;
  }
  if (filter.category) where.category = filter.category;
  if (filter.fileType) where.fileType = filter.fileType;
  if (filter.excludeFileType) where.fileType = { not: filter.excludeFileType };
  if (filter.excludeIds?.length) where.id = { notIn: filter.excludeIds };
  if (filter.blogTypes?.length) where.blogType = { in: filter.blogTypes };
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { blogId: { contains: filter.search, mode: "insensitive" } },
      { category: { contains: filter.search, mode: "insensitive" } },
    ];
  }
  return where;
}

export const PostModel = {
  findMany(filter: PostFilter = {}, options: { take?: number; skip?: number } = {}) {
    return db.post.findMany({
      where: buildWhere(filter),
      orderBy: { createdAt: "desc" },
      take: options.take,
      skip: options.skip,
    });
  },

  findFirst(filter: PostFilter = {}) {
    return db.post.findFirst({ where: buildWhere(filter), orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return db.post.findUnique({ where: { id } });
  },

  count(filter: PostFilter = {}) {
    return db.post.count({ where: buildWhere(filter) });
  },

  update(id: string, data: Prisma.PostUpdateInput) {
    return db.post.update({ where: { id }, data });
  },

  create(data: Prisma.PostCreateInput) {
    return db.post.create({ data });
  },

  async remove(id: string) {
    const result = await db.post.deleteMany({ where: { id } });
    return result.count > 0;
  },

  async countByCategory() {
    const rows = await db.post.groupBy({
      by: ["category"],
      where: { isActive: true },
      _count: { _all: true },
      orderBy: { _count: { category: "desc" } },
    });
    return rows.map((row) => ({ category: row.category, count: row._count._all }));
  },

  async countByMonth(since: Date) {
    const rows = await db.$queryRaw<{ month: Date; count: bigint }[]>`
      SELECT date_trunc('month', "createdAt") AS month, COUNT(*)::bigint AS count
      FROM "Post"
      WHERE "createdAt" >= ${since}
      GROUP BY 1
      ORDER BY 1
    `;
    return rows.map((row) => ({ month: row.month, count: Number(row.count) }));
  },
};
