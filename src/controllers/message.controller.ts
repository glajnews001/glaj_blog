import { MessageService } from "@/services/message.service";
import { httpError } from "@/utils/http";
import { ID_CHARS, getRandomString } from "@/utils/random";
import { readSession } from "@/utils/session";

export class MessageController {
  static async list() {
    const session = await readSession();
    if (!session) throw httpError("Sign in to view messages.", 401);
    return MessageService.list();
  }

  static async create(input: { name?: string; email?: string; phone?: string; message?: string }) {
    const name = input.name?.trim() || "";
    const email = input.email?.trim() || "";
    const phone = input.phone?.trim() || "";
    const message = input.message?.trim() || "";
    if (!name || !email || !phone || !message) throw httpError("Value missing.");

    return MessageService.create({
      id: getRandomString(30, ID_CHARS),
      name,
      email,
      phone,
      message,
    });
  }

  static async remove(id: string) {
    const session = await readSession();
    if (!session) throw httpError("Sign in to delete a message.", 401);
    await MessageService.remove(id);
    return { id };
  }
}
