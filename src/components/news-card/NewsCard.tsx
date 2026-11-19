import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { getTimeAgo } from "@/utils/time";

export function NewsCard({ post }: { post: PostView }) {
  return (
    <Link href={`/posts/${post.id}`} className="overflow-hidden rounded-[10px] bg-[#f9f9f9] text-black shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <img src={post.imageUrl} alt="" className="h-[200px] w-full object-cover" />
      <div className="p-5">
        <h3 className="mb-2 text-lg">{post.title}</h3>
        <p className="mb-1 text-sm text-[#666]">{post.PublishBy}</p>
        <p className="text-sm text-[#666]">{getTimeAgo(post.createdAt)}</p>
      </div>
    </Link>
  );
}
