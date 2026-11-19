import { readFileSync } from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EMAIL = "superadmin@glajnews.com";
const PASSWORD = "GlajSuper#2025";

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

function loadPosts(): LegacyPost[] {
  const file = path.join(process.cwd(), "prisma", "data", "legacy-posts.json");
  return JSON.parse(readFileSync(file, "utf8")) as LegacyPost[];
}

async function seedAdmin() {
  const password = await bcrypt.hash(PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: EMAIL },
    update: {
      password,
      active: true,
      permission: "super_admin",
      firstname: "Super",
      lastname: "Admin",
    },
    create: {
      id: "superadmin-glaj-news",
      firstname: "Super",
      lastname: "Admin",
      email: EMAIL,
      phone: "+2340000000000",
      password,
      active: true,
      permission: "super_admin",
      wallet: 0,
      noBplog: 0,
    },
  });
}

async function seedPosts() {
  const posts = loadPosts();
  const size = 50;
  for (let index = 0; index < posts.length; index += size) {
    const batch = posts.slice(index, index + size);
    await prisma.$transaction(
      batch.map((post) =>
        prisma.post.upsert({
          where: { id: post.id },
          update: {
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            publishBy: post.publishBy,
            category: post.category,
            blogType: post.blogType,
            fileType: post.fileType,
            blogId: post.blogId,
            isEyeWitness: post.isEyeWitness,
            isActive: post.isActive,
            isApproved: post.isApproved,
            createdAt: new Date(post.createdAt),
          },
          create: {
            id: post.id,
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            publishBy: post.publishBy,
            category: post.category,
            blogType: post.blogType,
            fileType: post.fileType,
            blogId: post.blogId,
            isEyeWitness: post.isEyeWitness,
            isActive: post.isActive,
            isApproved: post.isApproved,
            createdAt: new Date(post.createdAt),
          },
        }),
      ),
    );
    console.log(`Saved ${Math.min(index + size, posts.length)} of ${posts.length} posts`);
  }
}

async function main() {
  await seedAdmin();
  console.log(`Super admin ready: ${EMAIL}`);
  await seedPosts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
