import { revalidatePath } from "next/cache";
import { DashboardController } from "@/controllers/dashboard.controller";
import { handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handle(async () => {
    const post = await DashboardController.createPost(await readJson(request));
    revalidatePath("/", "layout");
    return ok({ id: post.id }, 201);
  });
}
