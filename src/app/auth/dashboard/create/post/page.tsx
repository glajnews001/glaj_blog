import type { Metadata } from "next";
import { CreatePostView } from "@/components/create-post-view/CreatePostView";

export const metadata: Metadata = { title: "Create Post" };

export default function CreatePostPage() {
  return <CreatePostView />;
}
