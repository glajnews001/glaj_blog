import { AdminSection } from "@/components/admin-section/AdminSection";
import { EditPostForm } from "@/components/edit-post-form/EditPostForm";
import type { PostDetail } from "@/models/post.dto";

type EditPostViewProps = { post: PostDetail };

export function EditPostView({ post }: EditPostViewProps) {
  return (
    <AdminSection title="Edit Post">
      <div className="max-w-4xl">
        <EditPostForm post={post} />
      </div>
    </AdminSection>
  );
}
