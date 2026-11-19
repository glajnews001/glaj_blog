import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function hasDatabase() {
  return databaseUrl().length > 0;
}

export function getPrisma() {
  if (!hasDatabase()) {
    throw Object.assign(new Error("DATABASE_URL is not set. Add your Neon connection string."), {
      status: 503,
    });
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}
