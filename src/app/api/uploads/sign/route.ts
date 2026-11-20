import { DashboardController } from "@/controllers/dashboard.controller";
import { handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handle(async () => {
    const body = await readJson(request);
    const fileType = typeof body.fileType === "string" ? body.fileType : "";
    return ok(await DashboardController.signUpload(fileType));
  });
}
