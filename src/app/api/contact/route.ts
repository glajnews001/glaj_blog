import { ContactController } from "@/controllers/contact.controller";
import { handle, ok, readJson } from "@/utils/http";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handle(async () => {
    await ContactController.submit(await readJson(request));
    return ok({ message: "Message sent successfully." }, 201);
  });
}
