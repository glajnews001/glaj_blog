import { DashboardController } from "@/controllers/dashboard.controller";
import { HttpError, handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export function PATCH(request: Request, { params }: Context) {
  return handle(async () => {
    const body = await readJson(request);
    if (typeof body.active !== "boolean") throw new HttpError(400, "active must be true or false.");
    await DashboardController.setUserActive((await params).id, body.active);
    return ok({ active: body.active });
  });
}
