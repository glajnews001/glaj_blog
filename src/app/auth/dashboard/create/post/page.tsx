import { AdminShell } from "@/components/admin-shell/AdminShell";
import { CreatePostView } from "@/components/create-post-view/CreatePostView";

export default function CreatePostPage() {
  return (
    <AdminShell>
      <CreatePostView />
    </AdminShell>
  );
}
