import { getPrisma, hasDatabase } from "@/models/db";
import { toMessageView, type MessageView } from "@/models/message.model";

export class MessageService {
  static async list(): Promise<MessageView[]> {
    if (!hasDatabase()) return [];
    const rows = await getPrisma().message.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(toMessageView);
  }

  static async create(input: {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  }) {
    const row = await getPrisma().message.create({
      data: {
        id: input.id,
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        blogId: input.id,
        isSeen: false,
      },
    });
    return toMessageView(row);
  }

  static async remove(id: string) {
    await getPrisma().message.delete({ where: { id } });
  }

  static async unreadCount() {
    if (!hasDatabase()) return 0;
    return getPrisma().message.count({ where: { isSeen: false } });
  }
}
