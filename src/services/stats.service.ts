import { format, startOfMonth, subMonths } from "date-fns";
import { PostModel } from "@/models/post.model";
import { MessageService } from "@/services/message.service";
import { UserService } from "@/services/user.service";
import { NAV_CATEGORIES, POST_CATEGORIES } from "@/utils/constants";
import type { DashboardPayload } from "@/models/page.dto";

const labelFor = (slug: string) =>
  [...NAV_CATEGORIES, ...POST_CATEGORIES].find((c) => c.slug === slug)?.label ?? slug;

export const StatsService = {
  async dashboard(): Promise<DashboardPayload> {
    const since = startOfMonth(subMonths(new Date(), 11));
    const [posts, users, messages, unread, byCategory, byMonth] = await Promise.all([
      PostModel.count({ includeInactive: true }),
      UserService.count(),
      MessageService.count(),
      MessageService.countUnread(),
      PostModel.countByCategory(),
      PostModel.countByMonth(since),
    ]);

    // Always show the last 12 months, including months without posts.
    const monthCounts = new Map(byMonth.map((row) => [format(row.month, "yyyy-MM"), row.count]));
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(startOfMonth(new Date()), 11 - i);
      return { name: format(date, "MMM yy"), posts: monthCounts.get(format(date, "yyyy-MM")) ?? 0 };
    });

    return {
      stats: { posts, categories: byCategory.length, users, messages, unread },
      byCategory: byCategory.map((row) => ({ name: labelFor(row.category), posts: row.count })),
      byMonth: months,
    };
  },
};
