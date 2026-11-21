import { revalidatePath } from "next/cache";
import { DashboardController } from "@/controllers/dashboard.controller";
import { handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export function GET(_request: Request, { params }: Context) {
  return handle(async () => ok(await DashboardController.getPost((await params).id)));
}

export function PATCH(request: Request, { params }: Context) {
  return handle(async () => {
    const post = await DashboardController.updatePost((await params).id, await readJson(request));
    revalidatePath("/", "layout");
    return ok({ id: post.id });
  });
}

export function DELETE(_request: Request, { params }: Context) {
  return handle(async () => {
    await DashboardController.deletePost((await params).id);
    revalidatePath("/", "layout");
    return ok({ deleted: true });
  });
}
