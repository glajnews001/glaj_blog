import type { Metadata } from "next";
import { DashboardController, type ListQuery } from "@/controllers/dashboard.controller";
import { ViewPostsView } from "@/components/view-posts-view/ViewPostsView";

export const metadata: Metadata = { title: "Post Register" };

export default async function ViewPostPage({ searchParams }: { searchParams: Promise<ListQuery> }) {
  const data = await DashboardController.getPosts(await searchParams);
  return <ViewPostsView data={data} />;
}
