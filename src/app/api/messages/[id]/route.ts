import { DashboardController } from "@/controllers/dashboard.controller";
import { handle, ok } from "@/utils/http";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export function PATCH(_request: Request, { params }: Context) {
  return handle(async () => {
    await DashboardController.markMessageSeen((await params).id);
    return ok({ seen: true });
  });
}

export function DELETE(_request: Request, { params }: Context) {
  return handle(async () => {
    await DashboardController.deleteMessage((await params).id);
    return ok({ deleted: true });
  });
}
