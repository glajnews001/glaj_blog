import { Prisma, type Message } from "@prisma/client";
import { db } from "@/models/db";

export type MessageRecord = Message;

function buildWhere(search?: string): Prisma.MessageWhereInput {
  if (!search) return {};
  return {
    OR: [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ],
  };
}

export const MessageModel = {
  create(data: Prisma.MessageCreateInput) {
    return db.message.create({ data });
  },

  findMany(search: string | undefined, take: number, skip: number) {
    return db.message.findMany({
      where: buildWhere(search),
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  },

  count(search?: string) {
    return db.message.count({ where: buildWhere(search) });
  },

  countUnread() {
    return db.message.count({ where: { isSeen: false } });
  },

  async markSeen(id: string) {
    const result = await db.message.updateMany({ where: { id }, data: { isSeen: true } });
    return result.count > 0;
  },

  async remove(id: string) {
    const result = await db.message.deleteMany({ where: { id } });
    return result.count > 0;
  },
};
