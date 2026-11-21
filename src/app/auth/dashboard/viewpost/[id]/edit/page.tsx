import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardController } from "@/controllers/dashboard.controller";
import { EditPostView } from "@/components/edit-post-view/EditPostView";

export const metadata: Metadata = { title: "Edit Post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await DashboardController.findPost((await params).id);
  if (!post) notFound();
  return <EditPostView post={post} />;
}
