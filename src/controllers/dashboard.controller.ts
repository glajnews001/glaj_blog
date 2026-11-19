import { CATEGORIES } from "@/utils/constants";
import { MessageService } from "@/services/message.service";
import { PostService } from "@/services/post.service";
import { UserService } from "@/services/user.service";
import type { DashboardPayload } from "@/models/page.model";
import { format } from "date-fns";

export class DashboardController {
  static async stats(): Promise<DashboardPayload> {
    const [posts, users, alerts, recent] = await Promise.all([
      PostService.count(),
      UserService.count(),
      MessageService.unreadCount(),
      PostService.countsByDay(7),
    ]);

    const chart = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      day.setHours(0, 0, 0, 0);
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      const count = recent.filter((row) => row.createdAt >= day && row.createdAt < next).length;
      return { name: format(day, "EEE"), posts: count, readers: count * 3 };
    });

    return {
      posts,
      categories: CATEGORIES.length,
      users,
      alerts,
      chart,
    };
  }
}
