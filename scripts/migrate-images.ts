/**
 * Copies post media that still lives on Firebase Storage into Cloudinary and
 * rewrites the post's imageUrl.
 *
 *   npm run images:migrate            migrate everything
 *   npm run images:migrate -- --limit 20
 *
 * The old Firebase bucket currently answers HTTP 402 (Google disabled Cloud
 * Storage on the free Spark plan). Upgrade that Firebase project to Blaze, run
 * this once, and every legacy post gets a working Cloudinary image.
 */
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const limitArg = process.argv.indexOf("--limit");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : undefined;

async function main() {
  const posts = await prisma.post.findMany({
    where: { imageUrl: { contains: "firebasestorage.googleapis.com" } },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, imageUrl: true, fileType: true },
  });
  console.log(`${posts.length} post(s) still point at Firebase Storage.`);

  let migrated = 0;
  let failed = 0;
  let consecutive402 = 0;

  for (const post of posts) {
    try {
      const probe = await fetch(post.imageUrl, { method: "GET" });
      if (probe.status === 402) {
        consecutive402 += 1;
        failed += 1;
        if (consecutive402 >= 5) {
          console.error(
            "\nFirebase Storage is still disabled (HTTP 402). Upgrade the Firebase project to the Blaze plan, then run this again.",
          );
          break;
        }
        continue;
      }
      consecutive402 = 0;
      if (!probe.ok) throw new Error(`HTTP ${probe.status}`);

      const upload = await cloudinary.uploader.upload(post.imageUrl, {
        folder: "glaj-news/legacy",
        resource_type: post.fileType === "video" ? "video" : "image",
        public_id: post.id,
        overwrite: false,
      });
      await prisma.post.update({ where: { id: post.id }, data: { imageUrl: upload.secure_url } });
      migrated += 1;
      if (migrated % 25 === 0) console.log(`  ...${migrated} migrated`);
    } catch (error) {
      failed += 1;
      console.warn(`  failed ${post.id}: ${(error as Error).message}`);
    }
  }

  console.log(`\nDone. Migrated: ${migrated}. Failed/skipped: ${failed}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
