import { Prisma, type User } from "@prisma/client";
import { db } from "@/models/db";

export type UserRecord = User;

function buildWhere(search?: string): Prisma.UserWhereInput {
  if (!search) return {};
  return {
    OR: [
      { firstname: { contains: search, mode: "insensitive" } },
      { lastname: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ],
  };
}

export const UserModel = {
  findByEmail(email: string) {
    return db.user.findUnique({ where: { email: email.toLowerCase() } });
  },

  findById(id: string) {
    return db.user.findUnique({ where: { id } });
  },

  findMany(search: string | undefined, take: number, skip: number) {
    return db.user.findMany({
      where: buildWhere(search),
      orderBy: { created: "desc" },
      take,
      skip,
    });
  },

  count(search?: string) {
    return db.user.count({ where: buildWhere(search) });
  },

  create(data: Prisma.UserCreateInput) {
    return db.user.create({ data });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return db.user.update({ where: { id }, data });
  },
};
