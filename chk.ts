import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const p = new PrismaClient();
(async () => {
  const u = await p.user.findFirst({ where: { email: process.env.SEED_ADMIN_EMAIL } });
  console.log("user", !!u, u && Object.keys(u).filter(k=>k!=="password"), u && (u as any).status, u && (u as any).role);
  console.log("pw length", process.env.SEED_ADMIN_PASSWORD?.length);
  if (u) console.log("match", await bcrypt.compare(process.env.SEED_ADMIN_PASSWORD!, (u as any).password));
  console.log("db host", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0]);
  await p.$disconnect();
})();
