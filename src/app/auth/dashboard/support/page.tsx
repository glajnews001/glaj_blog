import type { Metadata } from "next";
import { DashboardController, type ListQuery } from "@/controllers/dashboard.controller";
import { SupportView } from "@/components/support-view/SupportView";

export const metadata: Metadata = { title: "Support" };

export default async function SupportPage({ searchParams }: { searchParams: Promise<ListQuery> }) {
  const data = await DashboardController.getMessages(await searchParams);
  return <SupportView data={data} />;
}
