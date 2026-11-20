import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import { AdminSection } from "@/components/admin-section/AdminSection";
import { ChartCard } from "@/components/chart-card/ChartCard";
import { PostsByCategoryChart } from "@/components/posts-by-category-chart/PostsByCategoryChart";
import { PostsOverTimeChart } from "@/components/posts-over-time-chart/PostsOverTimeChart";
import { StatCard } from "@/components/stat-card/StatCard";
import type { DashboardPayload } from "@/models/page.dto";

type DashboardViewProps = { data: DashboardPayload };

export function DashboardView({ data }: DashboardViewProps) {
  const { stats } = data;
  return (
    <AdminSection title="DASHBOARD">
      <div className="grid grid-cols-1 gap-2.5 min-[769px]:grid-cols-2 min-[769px]:gap-5 desktop:grid-cols-4">
        <StatCard label="Posts" value={stats.posts} icon={BsFillArchiveFill} color="#2962ff" />
        <StatCard label="Categories" value={stats.categories} icon={BsFillGrid3X3GapFill} color="#ff6d00" />
        <StatCard label="Users" value={stats.users} icon={BsPeopleFill} color="#2e7d32" />
        <StatCard label="Unread Messages" value={stats.unread} icon={BsFillBellFill} color="#d50000" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 min-[769px]:mt-12 desktop:grid-cols-2">
        <ChartCard title="Posts by category">
          <PostsByCategoryChart data={data.byCategory} />
        </ChartCard>
        <ChartCard title="Posts per month (last 12 months)">
          <PostsOverTimeChart data={data.byMonth} />
        </ChartCard>
      </div>
    </AdminSection>
  );
}
