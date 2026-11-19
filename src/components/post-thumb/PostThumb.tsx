import { FaVideo } from "react-icons/fa";
import type { PostView } from "@/models/post.model";

export function PostThumb({ post }: { post: PostView }) {
  if (post.fileType === "video") {
    return (
      <div className="flex h-20 items-center justify-center text-3xl text-[#01017a]">
        <FaVideo className="animate-pulse" />
      </div>
    );
  }
  return <img src={post.imageUrl} alt="" className="h-20 w-full object-cover" />;
}
