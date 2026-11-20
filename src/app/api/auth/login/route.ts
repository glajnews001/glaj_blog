import { AuthController } from "@/controllers/auth.controller";
import { handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handle(async () => ok(await AuthController.login(await readJson(request))));
}
