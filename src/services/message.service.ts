import { MessageModel, type MessageRecord } from "@/models/message.model";
import type { ContactInput, MessageSummary } from "@/models/message.dto";
import { HttpError } from "@/utils/http";
import { randomId } from "@/utils/random";
import { clean, isEmail } from "@/utils/validation";

function toSummary(message: MessageRecord): MessageSummary {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
    isSeen: message.isSeen,
    createdAt: message.createdAt.toISOString(),
  };
}

export const MessageService = {
  async submit(input: Partial<ContactInput>) {
    const name = clean(input.name, 100);
    const email = clean(input.email, 120);
    const phone = clean(input.phone, 30);
    const message = clean(input.message, 3000);

    if (!name || !email || !phone || !message) throw new HttpError(400, "Value missing.");
    if (!isEmail(email)) throw new HttpError(400, "Enter a valid email address.");

    const id = randomId(30);
    await MessageModel.create({ id, name, email, phone, message, blogId: id, isSeen: false });
  },

  async page(search: string, page: number, pageSize: number) {
    const total = await MessageModel.count(search || undefined);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pageCount);
    const rows = await MessageModel.findMany(search || undefined, pageSize, (safePage - 1) * pageSize);
    return { items: rows.map(toSummary), total, page: safePage, pageCount, pageSize, query: search };
  },

  count() {
    return MessageModel.count();
  },

  countUnread() {
    return MessageModel.countUnread();
  },

  async markSeen(id: string) {
    if (!(await MessageModel.markSeen(id))) throw new HttpError(404, "Message not found.");
  },

  async remove(id: string) {
    if (!(await MessageModel.remove(id))) throw new HttpError(404, "Message not found.");
  },
};
