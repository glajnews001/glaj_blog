import { AdminSection } from "@/components/admin-section/AdminSection";
import { CreatePostForm } from "@/components/create-post-form/CreatePostForm";

export function CreatePostView() {
  return (
    <AdminSection title="Create a Post">
      <div className="max-w-4xl">
        <CreatePostForm />
      </div>
    </AdminSection>
  );
}
