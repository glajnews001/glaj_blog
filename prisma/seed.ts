import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  await seedSuperAdmin();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
