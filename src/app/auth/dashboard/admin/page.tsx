import { AdminShell } from "@/components/admin-shell/AdminShell";
import { DashboardView } from "@/components/dashboard-view/DashboardView";
import { DashboardController } from "@/controllers/dashboard.controller";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await DashboardController.stats();
  return (
    <AdminShell>
      <DashboardView stats={stats} />
    </AdminShell>
  );
}
