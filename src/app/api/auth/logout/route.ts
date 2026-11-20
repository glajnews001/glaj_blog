import { AuthController } from "@/controllers/auth.controller";
import { handle, ok } from "@/utils/http";

export const dynamic = "force-dynamic";

export function POST() {
  return handle(async () => {
    await AuthController.logout();
    return ok({ redirectTo: "/auth/login" });
  });
}
