import { DashboardController } from "@/controllers/dashboard.controller";
import { DashboardView } from "@/components/dashboard-view/DashboardView";

export default async function AdminDashboardPage() {
  const data = await DashboardController.getOverview();
  return <DashboardView data={data} />;
}
