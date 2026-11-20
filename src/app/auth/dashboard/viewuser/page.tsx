import type { Metadata } from "next";
import { DashboardController, type ListQuery } from "@/controllers/dashboard.controller";
import { ViewUsersView } from "@/components/view-users-view/ViewUsersView";

export const metadata: Metadata = { title: "User Register" };

export default async function ViewUserPage({ searchParams }: { searchParams: Promise<ListQuery> }) {
  const data = await DashboardController.getUsers(await searchParams);
  return <ViewUsersView data={data} />;
}
