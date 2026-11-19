import { AdminShell } from "@/components/admin-shell/AdminShell";
import { ViewPostsView } from "@/components/view-posts-view/ViewPostsView";
import { PostController } from "@/controllers/post.controller";

export const dynamic = "force-dynamic";

export default async function ViewPostPage() {
  const posts = await PostController.list();
  return (
    <AdminShell>
      <ViewPostsView posts={posts} />
    </AdminShell>
  );
}
