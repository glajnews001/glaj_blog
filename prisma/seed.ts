import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LegacyPost = {
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

async function seedSuperAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "superadmin@glajnews.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error("Set SEED_ADMIN_PASSWORD (at least 8 characters) in .env before seeding.");
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hash, active: true, permission: "super_admin" },
    create: {
      id: randomBytes(18).toString("base64url"),
      firstname: "Super",
      lastname: "Admin",
      email,
      phone: "+2340000000000",
      password: hash,
      active: true,
      permission: "super_admin",
      wallet: 0,
      noBplog: 0,
    },
  });
  console.log(`Super admin ready: ${email}`);
}

async function seedPosts() {
  const file = path.join(process.cwd(), "prisma", "data", "legacy-posts.json");
  const posts = JSON.parse(readFileSync(file, "utf8")) as LegacyPost[];

  let created = 0;
  const size = 50;
  for (let i = 0; i < posts.length; i += size) {
    const batch = posts.slice(i, i + size).map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
    }));
    const result = await prisma.post.createMany({ data: batch, skipDuplicates: true });
    created += result.count;
  }
  console.log(`Posts: ${created} added, ${posts.length - created} already existed.`);
}

async function main() {
  await seedSuperAdmin();
  await seedPosts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
