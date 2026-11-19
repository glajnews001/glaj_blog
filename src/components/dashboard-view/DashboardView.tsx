import type { DashboardPayload } from "@/models/page.model";
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import { DashboardCharts } from "@/components/dashboard-charts/DashboardCharts";
import { StatCard } from "@/components/stat-card/StatCard";

export function DashboardView({ stats }: { stats: DashboardPayload }) {
  return (
    <main className="p-5 text-white">
      <h1 className="text-2xl font-semibold">DASHBOARD</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="PRODUCTS" value={stats.posts} icon={BsFillArchiveFill} tone="bg-[#2962ff]" />
        <StatCard label="CATEGORIES" value={stats.categories} icon={BsFillGrid3X3GapFill} tone="bg-[#ff6d00]" />
        <StatCard label="CUSTOMERS" value={stats.users} icon={BsPeopleFill} tone="bg-[#2e7d32]" />
        <StatCard label="ALERTS" value={stats.alerts} icon={BsFillBellFill} tone="bg-[#d50000]" />
      </div>
      <DashboardCharts data={stats.chart} />
    </main>
  );
}
